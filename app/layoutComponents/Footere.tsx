"use client";

import { useRouter } from "next/navigation";

export default function Footer() {
  const router = useRouter();

  return (
    <footer className="bg-gradient-to-r from-neon-pink to-neon-blue text-white py-12 mt-16 border-t border-white">
      <div className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-12">
        <div className="text-lg sm:text-xl text-center text-white">
          <p>&copy; 2025 Plangpt. All rights reserved.</p>
        </div>

        <div className="flex gap-6">
          <button 
            onClick={() => router.push('/privacy')}
            className="text-white hover:text-neon-green transition duration-300"
          >
            Privacy Policy
          </button>
          <button 
            onClick={() => router.push('/terms')}
            className="text-white hover:text-neon-green transition duration-300"
          >
            Terms & Conditions
          </button>
        </div>

        <div className="mt-6">
          <p className="text-xl sm:text-2xl text-neon-green font-semibold">
            Connect with us
          </p>
          <div className="flex justify-center gap-6 mt-4">
            <a href="https://twitter.com" target="_blank" className="text-white hover:text-neon-green transition duration-300">
              Twitter
            </a>
            <a href="https://instagram.com" target="_blank" className="text-white hover:text-neon-green transition duration-300">
              Instagram
            </a>
            <a href="https://facebook.com" target="_blank" className="text-white hover:text-neon-green transition duration-300">
              Facebook
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
