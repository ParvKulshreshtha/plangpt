"use client";

import { useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { planData, PlanInfo } from "../data/planData";

export default function Plans() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const activeCategory = (searchParams.get("category") || "").toLowerCase().trim();
  const searchQuery = (searchParams.get("q") || "").toLowerCase().trim();

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

  return (
    <div className="font-sans"> {/* Updated background color */}
      {/* Heading Section */}
      <div className="text-center py-16">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-neon-pink">
          Our Plans
        </h1>
        <p className="mt-4 text-lg sm:text-xl lg:text-2xl max-w-3xl mx-auto text-electric-blue">
          Explore all available plans. Find the one that fits your needs.
        </p>
      </div>

      {/* Main Content Section */}
      <main className="p-6 sm:p-8 lg:p-12">
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-neon-pink mb-3">Filter by category</h2>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => router.push(buildPlansUrl())}
              className={`px-4 py-2 rounded-full border text-sm font-medium transition ${
                !activeCategory
                  ? "border-neon-pink text-neon-pink"
                  : "border-electric-blue text-electric-blue hover:border-neon-pink hover:text-neon-pink"
              }`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => router.push(buildPlansUrl(category))}
                className={`px-4 py-2 rounded-full border text-sm font-medium capitalize transition ${
                  activeCategory === category
                    ? "border-neon-pink text-neon-pink"
                    : "border-electric-blue text-electric-blue hover:border-neon-pink hover:text-neon-pink"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          {(activeCategory || searchQuery) && (
            <p className="mt-3 text-sm text-electric-blue">
              Showing {filteredPlans.length} result{filteredPlans.length === 1 ? "" : "s"}
              {activeCategory ? ` in "${activeCategory}"` : ""}.
            </p>
          )}
        </div>

        <div className="flex flex-wrap gap-6 justify-center">
          {filteredPlans?.map((planObject: PlanInfo) => (
            <div 
              key={planObject.uri}
              onClick={() => router.push(`/plans/${planObject.uri}`)}
              className="w-full sm:w-80 lg:w-96 bg-white border border-electric-blue rounded-lg shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition duration-300 transform hover:scale-105"
            >
              <img
                src={planObject.image !== "" ? planObject.image : "https://media.wired.com/photos/5a0a38c1d07f6824ff44221b/master/w_2560%2Cc_limit/twitterlists-TA.jpg"}
                alt={planObject.useCase}
                className="w-full h-60 object-cover mb-4"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "https://media.wired.com/photos/5a0a38c1d07f6824ff44221b/master/w_2560%2Cc_limit/twitterlists-TA.jpg";
                }}
              />
              <div className="p-4">
                <h3 className="text-xl sm:text-2xl font-semibold text-neon-pink mb-2">
                  {planObject.useCase}
                </h3>
                <p className="text-sm sm:text-base text-electric-blue mb-4">
                  {planObject.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        {filteredPlans.length === 0 && (
          <p className="text-center text-electric-blue mt-8">
            No plans found for the selected filters.
          </p>
        )}
      </main>
    </div>
  );
}
