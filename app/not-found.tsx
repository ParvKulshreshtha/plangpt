"use client";

import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="font-sans text-center py-32 sm:py-48 lg:py-48">
      <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold text-neon-pink mb-4">
        Oops! 404
      </h1>
      <p className="text-xl sm:text-2xl lg:text-3xl text-electric-blue mb-6">
        Looks like you’ve taken a wrong turn. This page doesn’t exist.
      </p>
      <button
        onClick={() => router.push('/')}
        className="bg-neon-green text-black px-8 py-3 rounded-full text-xl font-semibold hover:bg-electric-blue transition duration-300"
      >
        Go Back Home
      </button>
    </div>
  );
}
