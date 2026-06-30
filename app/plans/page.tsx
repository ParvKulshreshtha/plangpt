"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { planData, PlanInfo } from "../data/planData";
import CategoryModal from "../components/plans/CategoryModal";
import { ui } from "../lib/uiClasses";

const FALLBACK_IMAGE =
  "https://media.wired.com/photos/5a0a38c1d07f6824ff44221b/master/w_2560%2Cc_limit/twitterlists-TA.jpg";

const featuredCategories = [
  { tag: "travel", label: "Travel" },
  { tag: "fitness", label: "Fitness" },
  { tag: "wedding", label: "Wedding" },
  { tag: "finance", label: "Finance" },
  { tag: "events", label: "Events" },
  { tag: "health", label: "Health" },
  { tag: "food", label: "Food" },
];

export default function Plans() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [modalOpen, setModalOpen] = useState(false);

  const activeCategory = (searchParams.get("category") || "").toLowerCase().trim();
  const searchQuery = (searchParams.get("q") || "").toLowerCase().trim();

  const allCategories = useMemo(() => {
    return Array.from(
      new Set(
        planData
          .flatMap((plan) => plan.tags || [])
          .map((tag) => tag.toLowerCase().trim())
          .filter(Boolean)
      )
    ).sort();
  }, []);

  const featuredTags = featuredCategories.map((c) => c.tag);
  const activeIsFeatured = !activeCategory || featuredTags.includes(activeCategory);

  const filteredPlans = useMemo(() => {
    return planData.filter((plan) => {
      const matchesCategory =
        !activeCategory ||
        plan.tags?.some((tag) => tag.toLowerCase().trim() === activeCategory);
      const matchesQuery =
        !searchQuery ||
        plan.useCase.toLowerCase().includes(searchQuery) ||
        plan.description.toLowerCase().includes(searchQuery) ||
        plan.tags?.some((tag) => tag.toLowerCase().includes(searchQuery));
      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, searchQuery]);

  const buildPlansUrl = (category?: string) => {
    const params = new URLSearchParams();
    if (category) {
      params.set("category", category);
    }
    if (searchQuery) {
      params.set("q", searchQuery);
    }
    const queryString = params.toString();
    return queryString ? `/plans?${queryString}` : "/plans";
  };

  const selectCategory = (category?: string) => {
    router.push(category ? buildPlansUrl(category) : buildPlansUrl());
    setModalOpen(false);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-6xl space-y-6">
      <p className="text-sm text-gray-500">
        Explore all available plans.{" "}
        <span className="text-neon-blue">Find the one that fits your needs.</span>
      </p>

      <div className="flex flex-wrap gap-2 items-center">
        <button
          type="button"
          onClick={() => router.push(buildPlansUrl())}
          className={`px-4 py-2 rounded-full border text-sm font-medium transition ${
            !activeCategory ? ui.pillActive : ui.pillInactive
          }`}
        >
          All
        </button>

        {featuredCategories.map(({ tag, label }) => (
          <button
            key={tag}
            type="button"
            onClick={() => router.push(buildPlansUrl(tag))}
            className={`px-4 py-2 rounded-full border text-sm font-medium transition ${
              activeCategory === tag ? ui.pillActive : ui.pillInactive
            }`}
          >
            {label}
          </button>
        ))}

        {activeCategory && !activeIsFeatured && (
          <button
            type="button"
            onClick={() => router.push(buildPlansUrl(activeCategory))}
            className={`px-4 py-2 rounded-full border text-sm font-medium capitalize ${ui.pillActive}`}
          >
            {activeCategory}
          </button>
        )}

        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="px-4 py-2 rounded-full border border-dashed border-neon-purple/30 text-sm font-medium text-neon-purple hover:bg-neon-purple/5 hover:border-neon-purple/50 transition"
        >
          View more categories
        </button>
      </div>

      {(activeCategory || searchQuery) && (
        <p className="text-sm text-gray-500">
          Showing {filteredPlans.length} result{filteredPlans.length === 1 ? "" : "s"}
          {activeCategory ? ` in "${activeCategory}"` : ""}.
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredPlans.map((planObject: PlanInfo) => (
          <button
            key={planObject.uri}
            type="button"
            onClick={() => router.push(`/plans/${planObject.uri}`)}
            className={`flex gap-4 p-4 ${ui.card} text-left`}
          >
            <img
              src={planObject.image !== "" ? planObject.image : FALLBACK_IMAGE}
              alt={planObject.useCase}
              className="w-24 h-24 rounded-xl object-cover shrink-0"
              onError={(e) => {
                (e.target as HTMLImageElement).src = FALLBACK_IMAGE;
              }}
            />
            <div className="min-w-0">
              <h3 className="text-base font-semibold text-gray-900">
                {planObject.useCase}
              </h3>
              <p className="text-sm text-gray-500 mt-1 line-clamp-3">
                {planObject.description}
              </p>
            </div>
          </button>
        ))}
      </div>

      {filteredPlans.length === 0 && (
        <p className="text-center text-gray-500 py-8">
          No plans found for the selected filters.
        </p>
      )}

      <CategoryModal
        open={modalOpen}
        categories={allCategories}
        activeCategory={activeCategory}
        onClose={() => setModalOpen(false)}
        onSelect={selectCategory}
      />
    </div>
  );
}
