"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Search as SearchIcon } from "lucide-react";
import { planData } from "@/app/data/planData";
import { ui } from "@/app/lib/uiClasses";

export default function SearchPage() {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState<"plans" | "categories">("plans");
  const [query, setQuery] = useState("");

  const categories = useMemo(() => {
    return Array.from(
      new Set(
        planData
          .flatMap((plan) => plan.tags || [])
          .map((tag) => tag.toLowerCase().trim())
          .filter(Boolean)
      )
    ).sort();
  }, []);

  const filteredPlans = useMemo(() => {
    const normalizedQuery = query.toLowerCase().trim();
    if (!normalizedQuery) {
      return planData.slice(0, 6);
    }
    return planData.filter(
      (plan) =>
        plan.useCase.toLowerCase().includes(normalizedQuery) ||
        plan.description.toLowerCase().includes(normalizedQuery) ||
        plan.tags?.some((tag) => tag.toLowerCase().includes(normalizedQuery))
    );
  }, [query]);

  const filteredCategories = useMemo(() => {
    const normalizedQuery = query.toLowerCase().trim();
    if (!normalizedQuery) {
      return categories;
    }
    return categories.filter((category) => category.includes(normalizedQuery));
  }, [categories, query]);

  const goToPlansWithCategory = (category: string) => {
    router.push(`/plans?category=${encodeURIComponent(category)}`);
  };

  const goToPlansWithQuery = () => {
    const normalizedQuery = query.trim();
    if (!normalizedQuery) {
      router.push("/plans");
      return;
    }
    router.push(`/plans?q=${encodeURIComponent(normalizedQuery)}`);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-3xl space-y-6">
      <p className="text-sm text-gray-500">
        Find plans or <span className="text-neon-pink">browse categories</span>.
      </p>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setSelectedType("plans")}
          className={`px-4 py-2 rounded-full border text-sm font-medium transition ${
            selectedType === "plans" ? ui.pillActive : ui.pillInactive
          }`}
        >
          Plans
        </button>
        <button
          type="button"
          onClick={() => setSelectedType("categories")}
          className={`px-4 py-2 rounded-full border text-sm font-medium transition ${
            selectedType === "categories" ? ui.pillActive : ui.pillInactive
          }`}
        >
          Categories
        </button>
      </div>

      <div className="relative">
        <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neon-blue/60" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && selectedType === "plans" && goToPlansWithQuery()}
          placeholder={`Search ${selectedType}...`}
          className={ui.input + " pl-11 py-3 rounded-full"}
        />
      </div>

      {selectedType === "plans" ? (
        <section className="space-y-2">
          {filteredPlans.map((plan) => (
            <button
              key={plan.uri}
              type="button"
              onClick={() => router.push(`/plans/${plan.uri}`)}
              className={`w-full text-left p-4 ${ui.card}`}
            >
              <h2 className="text-base font-semibold text-gray-900">{plan.useCase}</h2>
              <p className="text-sm text-gray-500 mt-1">{plan.description}</p>
            </button>
          ))}
          {filteredPlans.length === 0 && (
            <p className="text-gray-500 text-sm">No matching plans found.</p>
          )}
        </section>
      ) : (
        <section>
          <div className="flex flex-wrap gap-2">
            {filteredCategories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => goToPlansWithCategory(category)}
                className={`px-4 py-2 rounded-full border text-sm capitalize ${ui.pillInactive}`}
              >
                {category}
              </button>
            ))}
          </div>
          {filteredCategories.length === 0 && (
            <p className="text-gray-500 text-sm mt-4">No matching categories found.</p>
          )}
        </section>
      )}
    </div>
  );
}
