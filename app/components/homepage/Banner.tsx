"use client";

import { useRouter } from "next/navigation";
import { Pin } from "lucide-react";
import { planData } from "@/app/data/planData";
import { ui } from "@/app/lib/uiClasses";

const FALLBACK_IMAGE =
  "https://media.wired.com/photos/5a0a38c1d07f6824ff44221b/master/w_2560%2Cc_limit/twitterlists-TA.jpg";

const featuredPlans = planData.slice(0, 4);

export default function Banner() {
  const router = useRouter();

  return (
    <section className="space-y-4 p-5 rounded-2xl bg-gradient-to-r from-neon-pink/5 via-white/80 to-neon-blue/5 border border-neon-pink/10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Pin className="w-4 h-4 text-neon-pink" />
          <h2 className={`${ui.sectionTitle}`}>Featured</h2>
        </div>
        <button type="button" onClick={() => router.push("/plans")} className={ui.link}>
          Browse all plans
        </button>
      </div>

      <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-1">
        {featuredPlans.map((plan) => (
          <button
            key={plan.uri}
            type="button"
            onClick={() => router.push(`/plans/${plan.uri}`)}
            className={`flex items-center gap-3 shrink-0 w-64 p-3 ${ui.card} text-left`}
          >
            <img
              src={plan.image || FALLBACK_IMAGE}
              alt={plan.useCase}
              className="w-12 h-12 rounded-lg object-cover shrink-0 ring-2 ring-neon-blue/10"
              onError={(e) => {
                (e.target as HTMLImageElement).src = FALLBACK_IMAGE;
              }}
            />
            <div className="min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">
                {plan.useCase}
              </p>
              <p className="text-xs text-gray-500 line-clamp-2">{plan.description}</p>
            </div>
          </button>
        ))}

        <button
          type="button"
          onClick={() => router.push("/plans")}
          className="flex flex-col items-center justify-center shrink-0 w-40 p-3 rounded-xl border border-dashed border-neon-blue/30 bg-neon-blue/5 hover:bg-neon-blue/10 transition"
        >
          <span className="text-2xl text-neon-blue">+</span>
          <span className="text-xs font-medium text-neon-blue mt-1">View all plans</span>
        </button>
      </div>
    </section>
  );
}
