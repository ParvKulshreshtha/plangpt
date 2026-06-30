"use client";

import { useEffect, useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { ui } from "@/app/lib/uiClasses";

type CategoryModalProps = {
  open: boolean;
  categories: string[];
  activeCategory: string;
  onClose: () => void;
  onSelect: (category?: string) => void;
};

export default function CategoryModal({
  open,
  categories,
  activeCategory,
  onClose,
  onSelect,
}: CategoryModalProps) {
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!open) setSearch("");
  }, [open]);

  const filteredCategories = useMemo(() => {
    const query = search.toLowerCase().trim();
    if (!query) return categories;
    return categories.filter((category) => category.includes(query));
  }, [categories, search]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
        aria-hidden
      />
      <div className="relative w-full max-w-md bg-white/95 backdrop-blur-md rounded-2xl shadow-xl shadow-neon-pink/10 border border-neon-pink/15">
        <div className="flex items-center justify-between p-4 border-b border-neon-pink/10">
          <h2 className="text-lg font-semibold bg-gradient-to-r from-neon-pink to-neon-blue bg-clip-text text-transparent">
            All Categories
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 border-b border-neon-pink/10">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neon-blue/60" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search categories..."
              className={ui.input + " pl-10"}
              autoFocus
            />
          </div>
        </div>

        <div className="max-h-80 overflow-y-auto p-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => {
              onSelect();
              setSearch("");
            }}
            className={`px-4 py-2 rounded-full border text-sm font-medium transition ${
              !activeCategory ? ui.pillActive : ui.pillInactive
            }`}
          >
            All
          </button>

          {filteredCategories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => {
                onSelect(category);
                setSearch("");
              }}
              className={`px-4 py-2 rounded-full border text-sm font-medium capitalize transition ${
                activeCategory === category ? ui.pillActive : ui.pillInactive
              }`}
            >
              {category}
            </button>
          ))}
          {filteredCategories.length === 0 && (
            <p className="text-sm text-gray-500 w-full text-center py-4">
              No categories match your search.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
