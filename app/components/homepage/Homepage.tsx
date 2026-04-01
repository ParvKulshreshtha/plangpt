"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { PlanInfo, planData } from "@/app/data/planData";
import { motion, LayoutGroup } from "framer-motion";
import {  Star } from "lucide-react";

const tags = [
      { name: "Travel", icon: "✈️" },
      { name: "Fitness", icon: "💪" },
      { name: "Wedding", icon: "💍" },
      { name: "Finance", icon: "💰" },
      { name: "Events", icon: "🎉" },
      { name: "Health", icon: "🩺" },
    ]

export default function Homepage() {
  const router = useRouter();
  const [selectedTag, setSelectedTag] = useState("All");

  const filteredPlans =
    selectedTag === "All"
      ? planData
      : planData.filter((p) => p.tags?.includes(selectedTag.toLowerCase()));

  return (
    <main className="p-6 sm:p-8 lg:p-12 space-y-12">
      <LayoutGroup>
        <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
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
            {selectedTag === "All" && (
              <motion.div
                layoutId="tag-highlight"
                className="absolute inset-0 rounded-full bg-neon-pink/10"
              />
            )}
          </motion.button>

          {tags.map((tag, i) => (
            <motion.button
              key={tag.name}
              layout="position"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: (i+1) * 0.05, type: "spring", stiffness: 180 }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedTag(tag.name)}
              className={`relative whitespace-nowrap m-2 px-4 py-2 rounded-full border text-sm font-medium transition duration-300 ${
                selectedTag === tag.name ? "text-neon-pink border-neon-pink" : ""
              }`}
            >
              {tag.name}
              {selectedTag === tag.name && (
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
            className="min-w-[280px] sm:min-w-[320px] max-w-[320px] rounded-xl border border-electric-blue shadow-lg cursor-pointer 
            hover:shadow-xl hover:scale-105 transition snap-start"
          >
            <img
              src={
                planObject.image !== ""
                  ? planObject.image
                  : "https://media.wired.com/photos/5a0a38c1d07f6824ff44221b/master/w_2560%2Cc_limit/twitterlists-TA.jpg"
              }
              alt={planObject.useCase}
              className="w-full h-48 object-cover rounded-t-xl"
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


    

      {/* 🔥 AI Quick Start Section */}
<section className="mt-16 space-y-6">
  <h2 className="text-2xl font-bold text-neon-pink">AI Quick Bites</h2>

  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {[
      {
        title: "Plan a Trip in 10 Seconds",
        desc: "Tell us your destination and we’ll build an itinerary instantly.",
        href: "/tools/itinerary",
      },
      {
        title: "Build a Daily Routine",
        desc: "A perfect day designed automatically based on your goals.",
        href: "/tools/time-blocker",
      },
      {
        title: "Fix Your Finances",
        desc: "Auto-generate budgeting, saving, and investment blueprints.",
        href: "/explore/finance",
      },
    ].map((card, i) => (
      <motion.div
        key={card.title}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: i * 0.08, type: "spring", stiffness: 150 }}
        onClick={() => router.push(card.href)}
        className="cursor-pointer bg-gradient-to-r from-neon-pink/10 to-neon-blue/10 
                   border border-electric-blue rounded-xl p-6 shadow-lg 
                   hover:shadow-xl hover:scale-[1.04] transition transform duration-300"
      >
        <h3 className="text-xl font-semibold text-neon-pink">{card.title}</h3>
        <p className="text-electric-blue mt-2 text-sm">{card.desc}</p>
      </motion.div>
    ))}
  </div>
</section>


        {/* 🔥 Trending Categories Section */}
<section className="mt-12 space-y-6">
  <h2 className="text-2xl font-bold text-neon-pink">Trending Categories</h2>

  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
    {tags.map((cat, i) => (
      <motion.div
        key={cat.name}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: i * 0.06, type: "spring", stiffness: 140 }}
        onClick={() =>
          router.push(`/explore/${cat.name.toLowerCase()}`)
        }
        className={`cursor-pointer
                   border border-electric-blue rounded-xl p-4 shadow-md 
                   hover:shadow-xl hover:scale-[1.04] transition transform duration-300`}
      >
        <div className="text-4xl">{cat.icon}</div>
        <h3 className="text-lg font-semibold text-neon-pink mt-2">{cat.name}</h3>
      </motion.div>
    ))}
  </div>
</section>




{/* ================= RANDOM FLOATING TESTIMONIAL STREAM ================= */}
<section className="space-y-4 pt-10">
  <div className="flex items-center gap-2">
    <Star className="text-neon-pink" />
    <h2 className="text-2xl font-bold text-neon-pink">What Users Say</h2>
  </div>

  <div className="relative h-[360px] overflow-hidden w-full">
    {/* Infinite vertical motion */}
    <motion.div
      className="absolute top-0 left-0 right-0 flex flex-col gap-6"
      animate={{ y: ["0%", "-100%"] }}
      transition={{
        duration: 500,
        ease: "linear",
        repeat: Infinity,
      }}
    >
      {[...Array(200)].map((_, index) => {
        const texts = [
          "This app changed the way I plan everything!",
          "AI suggestions are unbelievably accurate.",
          "Beautiful UI + super fast. Love it!",
          "Productivity increased like crazy.",
          "Never using traditional planners again.",
          "Makes travel planning 10x easier.",
          "Saves me hours every week.",
          "The best planning tool in the world.",
          "Simple. Clean. Powerful.",
          "Exactly what I needed.",
        ];

        const t = texts[index % texts.length];

        // Generate random values
        const randomX = Math.floor(Math.random() * 70);        // left padding in %
        const randomW = 40 + Math.floor(Math.random() * 50);   // width 40–90%

        return (
          <motion.div
            key={index}
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: (index % 10) * 0.25,
            }}
            style={{
              width: `${randomW}%`,
              marginLeft: `${randomX}%`,
            }}
            className="p-4 bg-accent-orange font-semibold text-white border border-white/20 
                       rounded-xl backdrop-blur-xl shadow-lg text-sm"
          >
            <p className="text-electric-blue">{t}</p>
          </motion.div>
        );
      })}
    </motion.div>
  </div>
</section>


{/* 📬 Newsletter Section */}
<section className="mt-20">
  <div className=" 
                  p-8 rounded-2xl border border-electric-blue shadow-lg">
    <h2 className="text-2xl font-bold text-neon-pink mb-3">
      Join Our Productivity Newsletter
    </h2>
    <p className="text-electric-blue mb-6 text-sm">
      Weekly tips, templates, and AI-powered tools. No spam ever.
    </p>

    <div className="flex flex-col sm:flex-row gap-4">
      <input
        type="email"
        placeholder="Enter your email"
        className="flex-1 px-4 py-3 rounded-xl border border-neon-pink 
                   bg-white text-neon-blue focus:outline-none focus:ring-2 
                   focus:ring-neon-pink"
      />
      <button className="px-6 py-3 rounded-xl bg-neon-pink text-white 
                         font-semibold hover:bg-electric-blue transition">
        Subscribe
      </button>
    </div>
  </div>
</section>

    </main>
  );
}
