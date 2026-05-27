import { ChatInterface } from "@/components/ask/ChatInterface";

export default function AskPage() {
  return (
    <div className="flex flex-col h-screen">
      <div className="px-6 py-5 border-b border-[#E2E8F0] bg-white flex items-center justify-between flex-shrink-0">
        <div>
          <h1 className="text-xl font-bold text-[#0F2A43]">Ask Anything</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Synthesized answers from DDW 2026 abstract corpus
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-teal-50 text-teal-700 border border-teal-200">
          <span className="w-1.5 h-1.5 rounded-full bg-[#0D9488]" />
          Live stream
        </span>
      </div>
      <div className="flex-1 overflow-hidden bg-[#F8FAFC]">
        <div className="max-w-4xl mx-auto h-full flex flex-col">
          <ChatInterface />
        </div>
      </div>
    </div>
  );
}
