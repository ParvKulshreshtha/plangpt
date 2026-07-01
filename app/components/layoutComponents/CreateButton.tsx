"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

type CreateButtonProps = {
  className?: string;
};

export default function CreateButton({ className = "" }: CreateButtonProps) {
  const [tipOpen, setTipOpen] = useState(false);

  return (
    <div className={`relative group ${className}`}>
      <button
        type="button"
        disabled
        aria-disabled="true"
        onClick={() => setTipOpen((open) => !open)}
        className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white/60 text-sm font-medium text-gray-400 cursor-not-allowed"
      >
        <Plus className="w-4 h-4" />
        Create
      </button>

      {/* Desktop: hover popover */}
      <div
        role="tooltip"
        className="absolute left-full top-1/2 z-50 ml-3 -translate-y-1/2 pointer-events-none hidden lg:block opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150"
      >
        <div className="relative px-3 py-2 rounded-lg bg-zinc-900 text-white text-xs font-medium whitespace-nowrap shadow-lg">
          Feature coming soon
          <span className="absolute right-full top-1/2 -translate-y-1/2 border-[5px] border-transparent border-r-zinc-900" />
        </div>
      </div>

      {/* Mobile: tap to show */}
      {tipOpen && (
        <p className="lg:hidden mt-2 text-center text-xs font-medium text-gray-500 bg-gray-100 rounded-lg py-2 px-3">
          Feature coming soon
        </p>
      )}
    </div>
  );
}
