"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleDropdown = (menu: string) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  const navItems = [
    {
      label: "Plan",
      subItems: [
        { name: "Create New", href: "/plan/create" },
        { name: "My Plans", href: "/plan/my-plans" },
        { name: "Saved Templates", href: "/plan/templates" },
        { name: "AI Suggestions", href: "/plan/ai-suggestions" },
      ],
    },
    {
      label: "Explore",
      subItems: [
        { name: "Travel", href: "/explore/travel" },
        { name: "Fitness", href: "/explore/fitness" },
        { name: "Career", href: "/explore/career" },
        { name: "Study", href: "/explore/study" },
        { name: "Finance", href: "/explore/finance" },
      ],
    },
    {
      label: "Tools",
      subItems: [
        { name: "AI Brainstormer", href: "/tools/brainstormer" },
        { name: "Time Blocker", href: "/tools/time-blocker" },
        { name: "Itinerary Builder", href: "/tools/itinerary" },
        { name: "Checklist Maker", href: "/tools/checklist" },
      ],
    },
    {
      label: "Community",
      subItems: [
        { name: "Shared Plans", href: "/community/shared" },
        { name: "Forums", href: "/community/forums" },
        { name: "Top Planners", href: "/community/top" },
      ],
    },
    {
      label: "Resources",
      subItems: [
        { name: "Guides", href: "/resources/guides" },
        { name: "Blog", href: "/resources/blog" },
        { name: "Help Center", href: "/resources/help" },
      ],
    },
  ];

  return (
    <nav
      className={`bg-gradient-to-r from-neon-pink to-neon-blue text-white p-4 sticky top-0 z-30 ${
        isMenuOpen ? "h-screen" : ""
      }`}
    >
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
          className={`lg:flex lg:space-x-6 inset-0  text-center lg:flex-row flex-col transition-all duration-300 ease-in-out ${
            isMenuOpen ? "block" : "hidden"
          }`}
        >
          {navItems.map((item) => (
            <li key={item.label} className=" group">
              <button
                onClick={() => toggleDropdown(item.label)}
                className="w-full lg:w-auto px-4 py-2 hover:text-neon-blue font-medium flex justify-center items-center"
              >
                {item.label}
              </button>

              {/* Full-width Dropdown */}
              <ul
                className={`absolute left-0 right-0 top-full w-screen bg-white text-neon-blue shadow-xl transition-all duration-300 ease-in-out overflow-hidden ${
                  openDropdown === item.label
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="max-w-7xl mx-auto flex flex-wrap justify-center py-4">
                  {item.subItems.map((sub) => (
                    <li key={sub.name} className="m-2">
                      <Link
                        href={sub.href}
                        className="block px-6 py-3 rounded-lg hover:bg-neon-blue hover:text-white transition-all font-medium"
                      >
                        {sub.name}
                      </Link>
                    </li>
                  ))}
                </div>
              </ul>
            </li>
          ))}
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
