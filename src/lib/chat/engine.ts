import type { InitProgressReport, MLCEngine } from '@mlc-ai/web-llm'

// Loaded only when a visitor enables the optional browser-local model.
const CHAT_MODEL_ID = 'SmolLM2-360M-Instruct-q4f32_1-MLC'
export const CHAT_MODEL_DOWNLOAD = '~0.2 GB'
const CHAT_CONTEXT_WINDOW = 4096
export const MAX_QUESTION_LENGTH = 400

export type ChatTurn = { role: 'system' | 'user' | 'assistant'; content: string }
export type { InitProgressReport }

export function isWebGPUAvailable(): boolean {
  return typeof navigator !== 'undefined' && Boolean(navigator.gpu)
}

let enginePromise: Promise<MLCEngine> | null = null
let onProgress: ((r: InitProgressReport) => void) | null = null

/** Download + compile the model. Safe to call repeatedly; dedupes. */
export function loadEngine(
  cb: (r: InitProgressReport) => void,
): Promise<MLCEngine> {
  onProgress = cb
  if (!enginePromise) {
    enginePromise = (async () => {
      if (!navigator.gpu || !(await navigator.gpu.requestAdapter())) {
        throw new Error('No WebGPU adapter is available')
      }
      const webllm = await import('@mlc-ai/web-llm')
      return webllm.CreateMLCEngine(
        CHAT_MODEL_ID,
        {
          // Store the downloaded weights in IndexedDB instead of the Cache API.
          // The default Cache backend calls `Cache.add()`, which throws
          // "Failed to execute 'add' on 'Cache': ... network error" whenever the
          // HF CDN answers with a redirect/opaque response or the browser is in
          // a context where the Cache API is restricted (some privacy modes,
          // storage-pressure eviction). IndexedDB has none of those edge cases
          // and is available everywhere WebGPU is.
          appConfig: { ...webllm.prebuiltAppConfig, cacheBackend: 'indexeddb' },
          initProgressCallback: (r) => onProgress?.(r),
        },
        { context_window_size: CHAT_CONTEXT_WINDOW },
      )
    })().catch((err) => {
      enginePromise = null // let the user retry after a failed load
      throw err
    })
  }
  return enginePromise
}

/**
 * Stream a reply token by token. `shouldStop` is polled each chunk; when it
 * turns true the generation is interrupted and the generator ends.
 */
export async function* streamReply(
  engine: MLCEngine,
  messages: ChatTurn[],
  shouldStop: () => boolean,
): AsyncGenerator<string> {
  const stream = await engine.chat.completions.create({
    messages,
    stream: true,
    temperature: 0,
    max_tokens: 4,
  })
  for await (const chunk of stream) {
    if (shouldStop()) {
      engine.interruptGenerate()
      break
    }
    const delta = chunk.choices[0]?.delta?.content
    if (delta) yield delta
  }
}

/** Clear the model's internal chat state. Keeps the engine warm. */
export async function resetEngineChat(): Promise<void> {
  const engine = await enginePromise
  await engine?.resetChat()
}
