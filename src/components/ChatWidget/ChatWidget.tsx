import { useEffect, useRef, useState } from 'react'
import type { MLCEngine } from '@mlc-ai/web-llm'
import {
  CHAT_MODEL_DOWNLOAD,
  isWebGPUAvailable,
  loadEngine,
  resetEngineChat,
  streamReply,
  type ChatTurn,
} from '../../lib/chat/engine'
import { EXAMPLE_PROMPTS, SYSTEM_PROMPT } from '../../lib/chat/systemPrompt'

type Status = 'unsupported' | 'idle' | 'loading' | 'ready' | 'error'
type Msg = { id: string; role: 'user' | 'assistant'; content: string }

const uid = () =>
  typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : Math.random().toString(36).slice(2)

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [status, setStatus] = useState<Status>(() =>
    isWebGPUAvailable() ? 'idle' : 'unsupported',
  )
  const [progress, setProgress] = useState({ pct: 0, text: '' })
  const [messages, setMessages] = useState<Msg[]>([])
  const [input, setInput] = useState('')
  const [generating, setGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const engineRef = useRef<MLCEngine | null>(null)
  const stopRef = useRef(false)
  const listEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (open && status === 'ready') inputRef.current?.focus()
  }, [open, status])

  // Start pulling the model the first time the panel is opened - no button.
  // (Not on mount: don't cost every visitor the model download if they never
  // open it.)
  useEffect(() => {
    if (open && status === 'idle') handleLoad()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, status])

  useEffect(() => {
    listEndRef.current?.scrollIntoView({ block: 'end' })
  }, [messages])

  // Escape closes the panel.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  // On phones the open panel is a near-full-height sheet over a scrim, so freeze
  // the page behind it - otherwise the body scrolls under the sheet and the
  // whole thing reads as "covering everything" instead of a dismissible modal.
  // Desktop keeps its small floating card and stays scrollable.
  useEffect(() => {
    if (!open) return
    const isPhone = window.matchMedia('(max-width: 639px)').matches
    if (!isPhone) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  async function handleLoad() {
    setStatus('loading')
    setError(null)
    try {
      engineRef.current = await loadEngine((r) =>
        setProgress({ pct: Math.round(r.progress * 100), text: r.text }),
      )
      setStatus('ready')
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e))
      setStatus('error')
    }
  }

  async function handleSend() {
    const text = input.trim()
    if (!text || generating || !engineRef.current) return

    const userMsg: Msg = { id: uid(), role: 'user', content: text }
    const botId = uid()
    setMessages((m) => [...m, userMsg, { id: botId, role: 'assistant', content: '' }])
    setInput('')
    if (inputRef.current) inputRef.current.style.height = 'auto'
    setGenerating(true)
    stopRef.current = false

    const history: ChatTurn[] = [...messages, userMsg]
      .slice(-6)
      .map((m) => ({ role: m.role, content: m.content }))
    const turns: ChatTurn[] = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...history,
    ]

    try {
      for await (const delta of streamReply(
        engineRef.current,
        turns,
        () => stopRef.current,
      )) {
        setMessages((m) =>
          m.map((msg) =>
            msg.id === botId ? { ...msg, content: msg.content + delta } : msg,
          ),
        )
      }
    } catch {
      setMessages((m) =>
        m.map((msg) =>
          msg.id === botId
            ? { ...msg, content: `${msg.content}\n\n[generation error]` }
            : msg,
        ),
      )
    } finally {
      setGenerating(false)
    }
  }

  function handleReset() {
    setMessages([])
    setError(null)
    resetEngineChat().catch(() => {})
  }

  function onComposerKey(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  function autoGrow(e: React.FormEvent<HTMLTextAreaElement>) {
    const el = e.currentTarget
    el.style.height = 'auto'
    el.style.height = `${Math.min(el.scrollHeight, 120)}px`
  }

  return (
    <>
      {!open && (
        <div className="fixed bottom-4 left-1/2 z-40 -translate-x-1/2 sm:bottom-6">
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-expanded={false}
            className="glass glass-frost glass-hover inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold text-white"
          >
            <ChatIcon />
            <span className="hidden sm:inline">Ask about Danny</span>
            <span className="sm:hidden">Ask</span>
          </button>
        </div>
      )}

      {/* Phone-only scrim: dims the page and closes on tap so the sheet is
          clearly dismissible. Hidden from >=sm, where the panel is a small
          floating card that doesn't obscure the page. */}
      {open && (
        <button
          type="button"
          tabIndex={-1}
          aria-hidden="true"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-black/50 sm:hidden"
        />
      )}

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Ask about Danny"
          className={`fixed inset-x-2 bottom-2 z-40 flex flex-col sm:inset-x-auto sm:bottom-6 sm:left-1/2 sm:w-[min(400px,calc(100vw-1.5rem))] sm:-translate-x-1/2 ${
            status === 'ready'
              ? 'h-[min(75dvh,560px)] sm:h-[min(70dvh,560px)]'
              : 'max-h-[min(75dvh,560px)] sm:max-h-[min(70dvh,560px)]'
          }`}
        >
          <div className="glass glass-frost glass-panel-warp flex h-full flex-col overflow-hidden rounded-[28px]">
            {/* header */}
            <div className="flex items-center justify-between gap-2 border-b border-white/10 px-4 py-3">
              <div className="flex items-center gap-2 text-sm font-semibold text-white">
                <ChatIcon />
                <span>Ask about Danny</span>
              </div>
              <div className="flex items-center gap-1">
                {status === 'ready' && messages.length > 0 && (
                  <IconButton label="Clear chat" onClick={handleReset}>
                    <ResetIcon />
                  </IconButton>
                )}
                <IconButton label="Close" onClick={() => setOpen(false)}>
                  <CloseIcon />
                </IconButton>
              </div>
            </div>

            {/* body */}
            <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4 text-sm text-[var(--ink-dim)] [scrollbar-width:thin]">
              {status === 'unsupported' && (
                <p className="leading-relaxed">
                  This assistant runs entirely in your browser and needs a WebGPU
                  browser, like desktop Chrome or Edge. It is not available here.
                </p>
              )}

              {(status === 'idle' || status === 'loading') && (
                <div className="space-y-3 leading-relaxed">
                  <p>
                    Setting up a small language model that runs entirely in your
                    browser, on your GPU. Nothing you type is sent to a server.
                  </p>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-white/70 motion-safe:transition-[width] motion-safe:duration-300"
                      style={{ width: `${progress.pct}%` }}
                    />
                  </div>
                  <p className="text-xs text-[var(--ink-faint)]">
                    {progress.text ||
                      `Downloading model files (${CHAT_MODEL_DOWNLOAD}, one time - cached after this).`}
                  </p>
                </div>
              )}

              {status === 'error' && (
                <div className="space-y-3">
                  <p className="text-rose-300">{error}</p>
                  <button
                    type="button"
                    onClick={handleLoad}
                    className="glass glass-frost glass-hover rounded-full px-5 py-2.5 text-sm font-semibold text-white"
                  >
                    Try again
                  </button>
                </div>
              )}

              {status === 'ready' && (
                <div className="space-y-3">
                  {messages.length === 0 && (
                    <div className="space-y-2">
                      <p className="text-[var(--ink-faint)]">
                        Ask about Danny's work, projects, or background.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {EXAMPLE_PROMPTS.map((p) => (
                          <button
                            key={p}
                            type="button"
                            onClick={() => {
                              setInput(p)
                              inputRef.current?.focus()
                            }}
                            className="chip"
                          >
                            {p}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  {messages.map((m) => (
                    <div
                      key={m.id}
                      className={
                        m.role === 'user'
                          ? 'ml-auto max-w-[85%] rounded-2xl rounded-br-md bg-white/12 px-3 py-2 text-white'
                          : 'mr-auto max-w-[90%] whitespace-pre-wrap'
                      }
                    >
                      {m.content}
                      {m.role === 'assistant' &&
                        generating &&
                        m.id === messages[messages.length - 1]?.id && (
                          <span className="ml-0.5 inline-block motion-safe:animate-pulse">
                            |
                          </span>
                        )}
                    </div>
                  ))}
                  <div ref={listEndRef} />
                </div>
              )}
            </div>

            {/* composer */}
            {status === 'ready' && (
              <div className="border-t border-white/10 px-3 py-3">
                <div className="glass glass-input flex items-end gap-2 rounded-2xl px-3 py-2">
                  <textarea
                    ref={inputRef}
                    rows={1}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onInput={autoGrow}
                    onKeyDown={onComposerKey}
                    placeholder="Ask a question"
                    className="max-h-[120px] min-h-[24px] flex-1 resize-none bg-transparent text-sm text-white outline-none placeholder:text-[var(--ink-faint)]"
                  />
                  {generating ? (
                    <button
                      type="button"
                      aria-label="Stop"
                      onClick={() => {
                        stopRef.current = true
                      }}
                      className="glass-control shrink-0 rounded-full p-1.5 text-white"
                    >
                      <StopIcon />
                    </button>
                  ) : (
                    <button
                      type="button"
                      aria-label="Send"
                      onClick={handleSend}
                      disabled={!input.trim()}
                      className="glass-control shrink-0 rounded-full p-1.5 text-white"
                    >
                      <SendIcon />
                    </button>
                  )}
                </div>
                <p className="mt-2 text-center text-[11px] text-[var(--ink-faint)]">
                  Runs a small model in your browser. It can be wrong.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}

function IconButton({
  label,
  onClick,
  children,
}: {
  label: string
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      className="glass-control flex h-8 w-8 items-center justify-center rounded-full text-white/75 hover:text-white"
    >
      {children}
    </button>
  )
}

const svg = {
  width: 18,
  height: 18,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.9,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
}

function ChatIcon() {
  return (
    <svg {...svg}>
      <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20.5l1.4-5.4A8 8 0 1 1 21 12z" />
    </svg>
  )
}
function SendIcon() {
  return (
    <svg {...svg} width={16} height={16}>
      <path d="M12 19V5M6 11l6-6 6 6" />
    </svg>
  )
}
function StopIcon() {
  return (
    <svg {...svg} width={16} height={16} fill="currentColor" stroke="none">
      <rect x="6" y="6" width="12" height="12" rx="2.5" />
    </svg>
  )
}
function CloseIcon() {
  return (
    <svg {...svg}>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  )
}
function ResetIcon() {
  return (
    <svg {...svg}>
      <path d="M3 12a9 9 0 1 0 3-6.7M3 4v4h4" />
    </svg>
  )
}
