"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { PlanInfo, planData } from "@/app/data/planData";
import { motion, LayoutGroup } from "framer-motion";

const tags = [
  "Travel",
  "Workout",
  "Finance",
  "Wedding",
  "Fitness",
  "Events",
  "Health",
];

export default function Homepage() {
  const router = useRouter();
  const [selectedTag, setSelectedTag] = useState("All");

  const filteredPlans =
    selectedTag === "All"
      ? planData
      : planData.filter((p) => p.tags?.includes(selectedTag.toLowerCase()));

  return (
    <main className="p-6 sm:p-8 lg:p-12 space-y-8">
      {/* Scrollable Tags */}
      <LayoutGroup>
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
          {/* All Button */}
          <motion.button
            layout="position"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            transition={{ delay: 0, type: "spring", stiffness: 180 }}
            onClick={() => setSelectedTag("All")}
            className={`relative whitespace-nowrap m-2 px-4 py-2 rounded-full border text-sm font-medium transition duration-300 ${
              selectedTag === "All" ? "text-neon-pink border-neon-pink" : ""
            }`}
          >
            All
            {/* Animated Highlight */}
            {selectedTag === "All" && (
              <motion.div
                layoutId="tag-highlight"
                className="absolute inset-0 rounded-full bg-neon-pink/10"
              />
            )}
          </motion.button>

          {/* Other tags */}
          {tags.map((tag, i) => (
            <motion.button
              key={tag}
              layout="position"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: (i+1) * 0.05, type: "spring", stiffness: 180 }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedTag(tag)}
              className={`relative whitespace-nowrap m-2 px-4 py-2 rounded-full border text-sm font-medium transition duration-300 ${
                selectedTag === tag ? "text-neon-pink border-neon-pink" : ""
              }`}
            >
              {tag}

              {/* Moving Highlight */}
              {selectedTag === tag && (
                <motion.div
                  layoutId="tag-highlight"
                  className="absolute inset-0 rounded-full bg-neon-pink/10"
                />
              )}
            </motion.button>
          ))}
        </div>
      </LayoutGroup>

      {/* Scrollable Cards */}
      <div className="flex gap-6 overflow-x-auto no-scrollbar pb-2 snap-x snap-mandatory scrollbar-hide">
        {filteredPlans?.map((planObject: PlanInfo) => (
          <div
            key={planObject.uri}
            onClick={() => router.push(`/plans/${planObject.uri}`)}
            className="min-w-[280px] sm:min-w-[320px] bg-white border border-electric-blue rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition duration-300 transform hover:scale-105 snap-start"
          >
            <img
              src={
                planObject.image !== ""
                  ? planObject.image
                  : "https://media.wired.com/photos/5a0a38c1d07f6824ff44221b/master/w_2560%2Cc_limit/twitterlists-TA.jpg"
              }
              alt={planObject.useCase}
              className="w-full h-48 object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src =
                  "https://media.wired.com/photos/5a0a38c1d07f6824ff44221b/master/w_2560%2Cc_limit/twitterlists-TA.jpg";
              }}
            />

            <div className="p-4">
              <h3 className="text-lg sm:text-xl font-semibold text-neon-pink mb-1">
                {planObject.useCase}
              </h3>
              <p className="text-sm text-electric-blue">
                {planObject.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* View More Button */}
      <div className="flex justify-center">
        <button
          onClick={() => router.push("/plans")}
          className="bg-neon-green text-white px-6 py-2 rounded-full text-lg font-semibold hover:bg-electric-blue transition duration-300"
        >
          View More
        </button>
      </div>
    </main>
  );
}
