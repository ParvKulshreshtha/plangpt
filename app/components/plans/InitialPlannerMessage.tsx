"use client";

import { AnswerFormatItem } from "@/app/data/planData";

type InitialPlannerMessageProps = {
  description: string;
  answerFormat: AnswerFormatItem[];
  selectedIds: string[];
  onToggle: (id: string) => void;
  disabled?: boolean;
};

export default function InitialPlannerMessage({
  description,
  answerFormat,
  selectedIds,
  onToggle,
  disabled,
}: InitialPlannerMessageProps) {
  const selectableItems = answerFormat.filter(
    (item) => item.type === "heading" || item.type === "custom"
  );

  return (
    <div className="space-y-4">
      <p className="text-sm md:text-base text-gray-800 leading-relaxed">{description}</p>

      {selectableItems.length > 0 && (
        <div className="rounded-xl border border-neon-blue/15 bg-pastel-blue/10 p-4 space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-neon-blue">
            I can include these in your plan
          </p>
          <div className="flex flex-wrap gap-2">
            {selectableItems.map((item) => {
              const selected = selectedIds.includes(item.id);
              return (
                <button
                  key={item.id}
                  type="button"
                  disabled={disabled}
                  onClick={() => onToggle(item.id)}
                  className={`px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium border transition ${
                    selected
                      ? "bg-neon-pink/10 text-neon-pink border-neon-pink/40"
                      : "bg-white/80 text-gray-500 border-gray-200 hover:border-neon-blue/30"
                  } ${disabled ? "opacity-60 cursor-not-allowed" : ""}`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
          <p className="text-xs text-gray-500">
            Tap to include or exclude sections. All are selected by default.
          </p>
        </div>
      )}
    </div>
  );
}
