"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className={`bg-gradient-to-r from-neon-pink to-neon-blue text-white p-4 sticky top-0 z-30 ${isMenuOpen && 'h-screen'}`}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-white">
          PlanGPT
        </Link>

        {/* Hamburger Icon (for mobile) */}
        <button
          className="lg:hidden text-white text-2xl z-50"
          onClick={toggleMenu}
        >
          {isMenuOpen ? "❌" : "☰"}
        </button>

        {/* Navigation Links */}
        <ul
          className={`lg:flex lg:space-x-6 space-y-4 lg:space-y-0 absolute lg:static inset-0  lg:text-white text-center lg:flex-row flex-col transition-all duration-300 ease-in-out ${
            isMenuOpen ? "block" : "hidden"
          }`}
        >
          <li>
            <Link
              href="/plans"
              className="hover:text-neon-blue block px-4 py-2 lg:px-0 lg:py-0"
            >
              Explore Plans
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className="hover:text-neon-blue block px-4 py-2 lg:px-0 lg:py-0"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className="hover:text-neon-blue block px-4 py-2 lg:px-0 lg:py-0"
            >
              Contact
            </Link>
          </li>
          <li>
            <Link
              href="/404"
              className="hover:text-neon-blue block px-4 py-2 lg:px-0 lg:py-0"
            >
              404
            </Link>
          </li>
        </ul>

        {/* Search Bar */}
        <div className="relative hidden lg:block">
          <input
            type="text"
            placeholder="Search..."
            className="bg-white text-neon-blue px-4 py-2 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-neon-pink transition duration-200 ease-in-out"
          />
          <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-neon-blue">
            🔍
          </span>
        </div>
      </div>
    </nav>
  );
}
