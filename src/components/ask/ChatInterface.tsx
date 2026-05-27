"use client";
import { useState, useRef, useEffect } from "react";
import { Send, Loader2 } from "lucide-react";
import Link from "next/link";

interface Source {
  id: string;
  title: string;
  score: number;
}

interface Message {
  role: "user" | "assistant";
  content: string;
  sources?: Source[];
  streaming?: boolean;
}

const SUGGESTED_QUESTIONS = [
  "Which KOLs discussed fibrosis regression at DDW 2026?",
  "Compare risankizumab vs ustekinumab efficacy data",
  "What are the latest GLP-1 outcomes in MASH?",
  "Summarize competitor drug presentations this year",
];

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (question: string) => {
    if (!question.trim() || loading) return;

    const userMessage: Message = { role: "user", content: question };
    const assistantMessage: Message = {
      role: "assistant",
      content: "",
      streaming: true,
    };

    setMessages((prev) => [...prev, userMessage, assistantMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      let fullContent = "";
      let sources: Source[] = [];

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          const lines = chunk.split("\n");

          for (const line of lines) {
            if (!line.startsWith("data: ")) continue;
            try {
              const data = JSON.parse(line.slice(6));
              if (data.type === "token") {
                fullContent += data.content;
                setMessages((prev) => {
                  const updated = [...prev];
                  updated[updated.length - 1] = {
                    ...updated[updated.length - 1],
                    content: fullContent,
                  };
                  return updated;
                });
              } else if (data.type === "sources") {
                sources = data.sources;
              } else if (data.type === "done") {
                setMessages((prev) => {
                  const updated = [...prev];
                  updated[updated.length - 1] = {
                    ...updated[updated.length - 1],
                    content: fullContent,
                    sources,
                    streaming: false,
                  };
                  return updated;
                });
              }
            } catch {
              // ignore parse errors
            }
          }
        }
      }
    } catch {
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          ...updated[updated.length - 1],
          content: "Sorry, I encountered an error. Please try again.",
          streaming: false,
        };
        return updated;
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Messages area */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
              style={{ backgroundColor: "#0F2A43" }}
            >
              <span className="text-2xl">🔍</span>
            </div>
            <h2 className="text-xl font-bold text-[#0F2A43] mb-2">
              Ask about DDW 2026
            </h2>
            <p className="text-sm text-slate-500 mb-8 max-w-md">
              Ask anything about congress abstracts, KOLs, trial data, or
              competitive intelligence.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-2xl w-full">
              {SUGGESTED_QUESTIONS.map((q) => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  className="text-left px-4 py-3 bg-white border border-[#E2E8F0] rounded-xl text-sm text-slate-600 hover:border-[#0D9488] hover:text-[#0D9488] transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((msg, i) => (
            <div
              key={i}
              className={
                msg.role === "user" ? "flex justify-end" : "flex justify-start"
              }
            >
              {msg.role === "assistant" && (
                <div className="w-8 h-8 rounded-full bg-[#0F2A43] flex items-center justify-center text-xs font-bold text-white mr-3 flex-shrink-0 mt-0.5">
                  AI
                </div>
              )}
              <div
                className={`max-w-2xl ${
                  msg.role === "user"
                    ? "bg-[#0D9488] text-white"
                    : "bg-white border border-[#E2E8F0]"
                } rounded-2xl px-4 py-3`}
              >
                {msg.role === "user" ? (
                  <p className="text-sm">{msg.content}</p>
                ) : (
                  <div>
                    <div className="text-sm text-[#0F2A43] leading-relaxed whitespace-pre-wrap">
                      {msg.content}
                      {msg.streaming && (
                        <span className="inline-block w-0.5 h-4 bg-[#0D9488] ml-0.5 animate-pulse" />
                      )}
                    </div>

                    {/* Source chips */}
                    {!msg.streaming &&
                      msg.sources &&
                      msg.sources.length > 0 && (
                        <div className="mt-3 pt-3 border-t border-[#E2E8F0]">
                          <p className="text-[10px] text-slate-400 mb-2 uppercase tracking-wide font-semibold">
                            Sources
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {msg.sources.map((src) => (
                              <Link
                                key={src.id}
                                href={`/abstracts/${src.id}`}
                                className="inline-flex items-center gap-1.5 text-xs bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#0D9488] hover:text-[#0D9488] text-slate-600 px-2.5 py-1.5 rounded-lg transition max-w-xs"
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-[#0D9488] flex-shrink-0" />
                                <span className="truncate">{src.title}</span>
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                  </div>
                )}
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="px-6 pb-6 pt-4 border-t border-[#E2E8F0] bg-white">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage(input);
          }}
          className="flex gap-3"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about abstracts, KOLs, trial data…"
            disabled={loading}
            className="flex-1 px-4 py-3 border border-[#E2E8F0] rounded-xl text-sm text-[#0F2A43] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0D9488] focus:border-transparent disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="px-4 py-3 rounded-xl text-white font-medium text-sm disabled:opacity-50 transition flex items-center gap-2"
            style={{ backgroundColor: "#0D9488" }}
          >
            {loading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Send size={16} />
            )}
          </button>
        </form>
        <p className="text-[10px] text-slate-400 mt-2 text-center">
          Responses synthesized from DDW 2026 abstract corpus. Always verify
          with source abstracts.
        </p>
      </div>
    </div>
  );
}
