import type { InitProgressReport, MLCEngine } from '@mlc-ai/web-llm'

/**
 * Browser-local chat engine. Runs the model entirely on the visitor's GPU via
 * WebGPU (@mlc-ai/web-llm) - no API, no backend, no cost. Weights stream from
 * the MLC / Hugging Face CDN on first load and are cached by the browser.
 *
 * The engine is a module-level singleton so it survives the panel opening and
 * closing and React StrictMode's dev double-mount. Nothing here is imported by
 * ChatWidget statically - it is pulled in with `await import()` only after the
 * user clicks "Load", so `@mlc-ai/web-llm` stays out of the main bundle.
 *
 * v1 runs on the main thread. If token streaming ever janks the animated
 * background, switch to CreateWebWorkerMLCEngine + a worker.ts host.
 */

// The one place to change the model. Any id from web-llm's prebuiltAppConfig.
// SmolLM2-360M is the lightest instruct model web-llm ships: ~0.2 GB to
// download and ~375 MB of GPU memory at runtime, roughly half the footprint of
// Llama-3.2-1B. The trade is real - a 360M model follows the "answer only from
// these facts" instruction less reliably - but it lets low-power laptops run
// the assistant at all. Bump back up to 'Llama-3.2-1B-Instruct-q4f16_1-MLC' if
// answer quality matters more than the memory budget.
export const CHAT_MODEL_ID = 'SmolLM2-360M-Instruct-q4f16_1-MLC'
export const CHAT_MODEL_DOWNLOAD = '~0.2 GB'

// Shrinks the KV cache below the model default (4096). The system prompt, a
// 6-turn history window, and a 512-token reply all fit inside 2048 with room
// to spare, so this is free memory back.
const CHAT_CONTEXT_WINDOW = 2048

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
      if (!isWebGPUAvailable()) throw new Error('WebGPU is not available')
      const webllm = await import('@mlc-ai/web-llm')
      return webllm.CreateMLCEngine(
        CHAT_MODEL_ID,
        { initProgressCallback: (r) => onProgress?.(r) },
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
    temperature: 0.4,
    max_tokens: 512,
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
