"use client";

import { useRouter } from "next/navigation";
import { PlanInfo, planData } from "@/app/data/planData";
import { categoryAccents, ui } from "@/app/lib/uiClasses";

const categories = [
  { tag: "travel", title: "Best Travel Planners" },
  { tag: "fitness", title: "Best Fitness Planners" },
  { tag: "wedding", title: "Best Wedding Planners" },
  { tag: "finance", title: "Best Finance Planners" },
  { tag: "events", title: "Best Event Planners" },
  { tag: "health", title: "Best Health Planners" },
];

const FALLBACK_IMAGE =
  "https://media.wired.com/photos/5a0a38c1d07f6824ff44221b/master/w_2560%2Cc_limit/twitterlists-TA.jpg";

const PLANS_PER_SECTION = 3;

function PlanCard({
  plan,
  accent,
  onClick,
}: {
  plan: PlanInfo;
  accent: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex gap-4 p-4 ${ui.card} ${accent} text-left`}
    >
      <img
        src={plan.image !== "" ? plan.image : FALLBACK_IMAGE}
        alt={plan.useCase}
        className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover shrink-0 ring-2 ring-white shadow-sm"
        onError={(e) => {
          (e.target as HTMLImageElement).src = FALLBACK_IMAGE;
        }}
      />
      <div className="min-w-0 flex flex-col">
        <h3 className="text-sm sm:text-base font-semibold text-gray-900 line-clamp-1">
          {plan.useCase}
        </h3>
        <p className="text-xs sm:text-sm text-gray-500 mt-1 line-clamp-3 flex-1">
          {plan.description}
        </p>
      </div>
    </button>
  );
}

export default function Homepage() {
  const router = useRouter();

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 space-y-10 max-w-6xl">
      {categories.map(({ tag, title }) => {
        const sectionPlans = planData
          .filter((plan) => plan.tags?.includes(tag))
          .slice(0, PLANS_PER_SECTION);

        if (sectionPlans.length === 0) return null;

        const accent = categoryAccents[tag];

        return (
          <section key={tag} className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className={`w-1 h-5 rounded-full ${accent.bar}`} />
                <h2 className={`${ui.sectionTitle} ${accent.title}`}>{title}</h2>
              </div>
              <button
                type="button"
                onClick={() => router.push(`/plans?category=${tag}`)}
                className={ui.link}
              >
                View all &gt;
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {sectionPlans.map((plan) => (
                <PlanCard
                  key={plan.uri}
                  plan={plan}
                  accent={accent.cardHover}
                  onClick={() => router.push(`/plans/${plan.uri}`)}
                />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
