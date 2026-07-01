"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, Loader2, Send } from "lucide-react";
import { useRouter } from "next/navigation";
import { PlanInfo } from "@/app/data/planData";
import { buildPlanPrompt } from "@/app/lib/buildPlanPrompt";
import AnswerRenderer from "./AnswerRenderer";
import InitialPlannerMessage from "./InitialPlannerMessage";

const FALLBACK_IMAGE =
  "https://media.wired.com/photos/5a0a38c1d07f6824ff44221b/master/w_2560%2Cc_limit/twitterlists-TA.jpg";

type PlannerMessage = { id: string; role: "planner"; content: string; isInitial?: boolean };
type UserMessage = { id: string; role: "user"; content: string };
type ChatMessage = PlannerMessage | UserMessage;

function isInitialPlannerMessage(msg: ChatMessage): msg is PlannerMessage & { isInitial: true } {
  return msg.role === "planner" && "isInitial" in msg && msg.isInitial === true;
}

type PlanChatProps = {
  plan: PlanInfo;
};

function getDefaultSelectedIds(plan: PlanInfo): string[] {
  return plan.answerFormat
    .filter((item) => item.type === "heading" || item.type === "custom")
    .map((item) => item.id);
}

export default function PlanChat({ plan }: PlanChatProps) {
  const router = useRouter();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const [selectedSectionIds, setSelectedSectionIds] = useState<string[]>(() =>
    getDefaultSelectedIds(plan)
  );
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setMessages([{ id: "initial", role: "planner", content: "", isInitial: true }]);
    setSelectedSectionIds(getDefaultSelectedIds(plan));
    setInput("");
    setError("");
  }, [plan.uri]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isGenerating]);

  const toggleSection = (id: string) => {
    setSelectedSectionIds((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed || isGenerating) return;
    if (selectedSectionIds.length === 0) {
      setError("Select at least one section to include in your plan.");
      return;
    }

    setError("");
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: trimmed,
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsGenerating(true);

    try {
      const prompt = buildPlanPrompt(plan, trimmed, selectedSectionIds);
      const response = await fetch("/api/generate-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to generate plan. Please try again.");
        return;
      }

      setMessages((prev) => [
        ...prev,
        { id: `planner-${Date.now()}`, role: "planner", content: data.text },
      ]);
    } catch {
      setError("Failed to generate plan. Please try again in a moment.");
    } finally {
      setIsGenerating(false);
      inputRef.current?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-5rem)] max-w-3xl mx-auto">
      {/* Chat header */}
      <div className="flex items-center gap-3 px-2 py-3 border-b border-gray-100 shrink-0">
        <button
          type="button"
          onClick={() => router.push("/plans")}
          className="p-2 rounded-lg hover:bg-pastel-pink/20 text-gray-500 transition"
          aria-label="Back to plans"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <img
          src={plan.image || FALLBACK_IMAGE}
          alt={plan.useCase}
          className="w-10 h-10 rounded-xl object-cover ring-2 ring-neon-pink/10"
          onError={(e) => {
            (e.target as HTMLImageElement).src = FALLBACK_IMAGE;
          }}
        />
        <div className="min-w-0">
          <h2 className="text-base font-semibold text-gray-900 truncate">{plan.useCase}</h2>
          <p className="text-xs text-gray-500 truncate">{plan.description}</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-2 py-4 space-y-4 scrollbar-hide">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[90%] sm:max-w-[85%] rounded-2xl px-4 py-3 ${
                msg.role === "user"
                  ? "bg-gradient-to-r from-neon-pink to-neon-purple text-white rounded-br-md"
                  : "bg-white/90 border border-gray-200/80 text-gray-800 rounded-bl-md shadow-sm"
              }`}
            >
              {isInitialPlannerMessage(msg) ? (
                <InitialPlannerMessage
                  description={plan.initialDescription}
                  answerFormat={plan.answerFormat}
                  selectedIds={selectedSectionIds}
                  onToggle={toggleSection}
                  disabled={isGenerating}
                />
              ) : msg.role === "user" ? (
                <p className="text-sm md:text-base whitespace-pre-wrap">{msg.content}</p>
              ) : (
                <AnswerRenderer content={msg.content} />
              )}
            </div>
          </div>
        ))}

        {isGenerating && (
          <div className="flex justify-start">
            <div className="bg-white/90 border border-gray-200/80 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <Loader2 className="w-4 h-4 animate-spin text-neon-blue" />
                Planning...
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Error */}
      {error && (
        <div className="mx-2 mb-2 rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Input */}
      <div className="shrink-0 border-t border-gray-100 bg-white/80 backdrop-blur-sm px-2 py-3">
        <div className="flex items-end gap-2 rounded-2xl border border-gray-200 bg-white px-3 py-2 focus-within:ring-2 focus-within:ring-neon-blue/30 focus-within:border-neon-blue/40">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={`Message ${plan.useCase}...`}
            rows={1}
            disabled={isGenerating}
            className="flex-1 resize-none bg-transparent text-sm md:text-base text-gray-900 placeholder:text-gray-400 focus:outline-none max-h-32 py-1.5"
          />
          <button
            type="button"
            onClick={sendMessage}
            disabled={!input.trim() || isGenerating}
            className="p-2 rounded-xl bg-gradient-to-r from-neon-green to-neon-blue text-white disabled:opacity-40 disabled:cursor-not-allowed hover:from-neon-pink hover:to-neon-purple transition shrink-0"
            aria-label="Send message"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        <p className="text-xs text-gray-400 text-center mt-2">
          Press Enter to send · Shift+Enter for new line
        </p>
      </div>
    </div>
  );
}
