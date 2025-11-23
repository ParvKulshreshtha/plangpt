"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [searchActive, setSearchActive] = useState(false);

  const pathname = usePathname();
  const isSearchPage = pathname === "/search";

  const router = useRouter();

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
      <div className="max-w-7xl mx-auto flex justify-between items-center relative">
        {/* Logo */}
        {!searchActive && !isSearchPage && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0 }}
          >
            <Link href="/" className="text-xl font-bold text-white">
              PlanGPT
            </Link>
          </motion.div>
        )}

        {/* Hamburger Icon */}
        {!searchActive && !isSearchPage && (
          <button
            className="lg:hidden text-white text-2xl z-50"
            onClick={toggleMenu}
          >
            {isMenuOpen ? "❌" : "☰"}
          </button>
        )}

        {/* Navigation Items */}
        <AnimatePresence>
          {!searchActive && !isSearchPage && (
            <motion.ul
              initial={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0 }}
              className={`lg:flex lg:space-x-6 inset-0 text-center lg:flex-row flex-col ${
                isMenuOpen ? "block" : "hidden lg:flex"
              }`}
            >
              {navItems.map((item) => (
                <li key={item.label} className="group">
                  <button
                    onClick={() => toggleDropdown(item.label)}
                    className="w-full lg:w-auto px-4 py-2 hover:text-neon-blue font-medium flex justify-center items-center"
                  >
                    {item.label}
                  </button>

                  {/* Dropdown */}
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
            </motion.ul>
          )}
        </AnimatePresence>

        {/* Search Bar */}
        {isSearchPage ? (
          // --- NO ANIMATION ON SEARCH PAGE ---
          <div className="relative hidden lg:block w-full">
            <input
              type="text"
              placeholder="Search..."
              className="bg-white text-neon-blue px-4 py-2 rounded-full shadow-md 
      w-full focus:outline-none focus:ring-2 focus:ring-neon-pink"
            />
          </div>
        ) : (
          // --- ANIMATED VERSION FOR OTHER PAGES ---
          <div className="w-full flex justify-end items-end">
            <motion.div
              className="relative hidden lg:block"
              initial={false}
              animate={
                searchActive
                  ? { width: "100%", scale: 1 } // Expanded state
                  : { width: "180px", scale: 0.95 } // Default state
              }
              transition={{ duration: 1, ease: "easeInOut" }}
            >
              <input
                type="text"
                placeholder="Search..."
                onFocus={() => {
                  setSearchActive(true);
                  setTimeout(() => router.push("/search"), 500);
                }}
                className="bg-white text-neon-blue px-4 py-2 rounded-full shadow-md 
      w-full focus:outline-none focus:ring-2 focus:ring-neon-pink"
              />

              {!searchActive && (
                <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-neon-blue">
                  🔍
                </span>
              )}
            </motion.div>
          </div>
        )}
      </div>
    </nav>
  );
}
