"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { planData } from "@/app/data/planData";

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
    <main className="font-sans p-6 sm:p-8 lg:p-12 max-w-5xl mx-auto">
      <h1 className="text-3xl sm:text-4xl font-bold text-neon-pink">Search</h1>
      <p className="mt-2 text-electric-blue">Find plans or browse categories.</p>

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          onClick={() => setSelectedType("plans")}
          className={`px-4 py-2 rounded-full border text-sm font-medium transition ${
            selectedType === "plans"
              ? "border-neon-pink text-neon-pink"
              : "border-electric-blue text-electric-blue hover:border-neon-pink hover:text-neon-pink"
          }`}
        >
          Plans
        </button>
        <button
          onClick={() => setSelectedType("categories")}
          className={`px-4 py-2 rounded-full border text-sm font-medium transition ${
            selectedType === "categories"
              ? "border-neon-pink text-neon-pink"
              : "border-electric-blue text-electric-blue hover:border-neon-pink hover:text-neon-pink"
          }`}
        >
          Categories
        </button>
      </div>

      <div className="mt-6 flex gap-3">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={`Search ${selectedType}...`}
          className="w-full px-4 py-3 rounded-xl border border-electric-blue text-neon-blue focus:outline-none focus:ring-2 focus:ring-neon-pink"
        />
        {selectedType === "plans" && (
          <button
            onClick={goToPlansWithQuery}
            className="px-5 py-3 rounded-xl bg-neon-pink text-white font-semibold hover:bg-electric-blue transition"
          >
            Search
          </button>
        )}
      </div>

      {selectedType === "plans" ? (
        <section className="mt-8 space-y-3">
          {filteredPlans.map((plan) => (
            <button
              key={plan.uri}
              onClick={() => router.push(`/plans/${plan.uri}`)}
              className="w-full text-left p-4 rounded-xl border border-electric-blue hover:border-neon-pink transition"
            >
              <h2 className="text-lg font-semibold text-neon-pink">{plan.useCase}</h2>
              <p className="text-sm text-electric-blue mt-1">{plan.description}</p>
            </button>
          ))}
          {filteredPlans.length === 0 && (
            <p className="text-electric-blue">No matching plans found.</p>
          )}
        </section>
      ) : (
        <section className="mt-8">
          <div className="flex flex-wrap gap-3">
            {filteredCategories.map((category) => (
              <button
                key={category}
                onClick={() => goToPlansWithCategory(category)}
                className="px-4 py-2 rounded-full border border-electric-blue text-electric-blue capitalize hover:border-neon-pink hover:text-neon-pink transition"
              >
                {category}
              </button>
            ))}
          </div>
          {filteredCategories.length === 0 && (
            <p className="text-electric-blue">No matching categories found.</p>
          )}
        </section>
      )}
    </main>
  );
}
