"use client";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";

const words = ["Day", "Trip", "Startup", "Career", "Dream"];

const Banner = () => {
  const router = useRouter();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full bg-gradient-to-r from-neon-pink to-neon-blue text-white text-center py-48 lg:py-20">
      {/* Subheading */}
      <h1 className="text-lg sm:text-xl uppercase tracking-widest text-neon-green font-semibold mb-4">
        AI-Powered Life Planners
      </h1>

      {/* Animated Heading */}
      <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold flex justify-center items-center gap-3">
        <span>Plan your</span>
        <span className="relative inline-block min-w-[140px] text-neon-green">
          <AnimatePresence mode="wait">
            <motion.span
              key={words[index]}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="inline-block"
            >
              {words[index]}
            </motion.span>
          </AnimatePresence>
        </span>
      </h2>


      {/* CTA Button */}
      <div className="mt-10">
        <motion.button
          onClick={() => router.push("/signup")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-neon-green text-black px-10 py-4 rounded-full text-lg sm:text-xl font-semibold shadow-[0_0_15px_rgba(57,255,20,0.4)] hover:shadow-[0_0_25px_rgba(57,255,20,0.6)] transition duration-300"
        >
          Try Now
        </motion.button>
      </div>

      {/* Background Glow */}
      <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-neon-green/10 blur-[120px] rounded-full pointer-events-none" />
    </section>
  );
};

export default Banner;
