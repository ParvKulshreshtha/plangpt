"use client";

import { useState, useRef, useEffect } from "react";
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

  const navRef = useRef<HTMLDivElement>(null);

  // ✅ CLOSE DROPDOWN WHEN CLICKING OUTSIDE
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
      <div
        ref={navRef}
        className="max-w-7xl mx-auto flex justify-between items-center relative"
      >
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
              className={`lg:flex lg:space-x-6 inset-0 text-center lg:flex-row flex-col items-center justify-center ${
                isMenuOpen ? "block" : "hidden lg:flex"
              }`}
            >
              {navItems.map((item) => (
                <li key={item.label} className="group relative">
                  <button
                    onClick={() => toggleDropdown(item.label)}
                    className="relative w-full lg:w-auto px-4 py-2 hover:text-neon-blue font-medium flex justify-center items-center"
                  >
                    {item.label}
                  </button>

                  {/* Dropdown */}
                  <AnimatePresence>
                    {openDropdown === item.label && (
                      <motion.ul
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="
                        absolute 
                        top-full
                        w-[260px] 
                        bg-white/90 backdrop-blur-xl 
                        text-neon-blue 
                        shadow-2xl 
                        rounded-2xl 
                        py-3 
                        border border-white/20
                        z-40
                      "
                      >
                        {item.subItems.map((sub) => (
                          <li key={sub.name}>
                            <Link
                              href={sub.href}
                              onClick={() => setOpenDropdown(null)}
                              className="
                                block 
                                px-4 py-3 
                                rounded-xl 
                                font-medium 
                                hover:bg-neon-blue hover:text-white 
                                transition-all
                              "
                            >
                              {sub.name}
                            </Link>
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>

        {/* Search Bar */}
        {isSearchPage ? (
          <div className="relative hidden lg:block w-full">
            <input
              type="text"
              placeholder="Search..."
              className="bg-white text-neon-blue px-4 py-2 rounded-full shadow-md 
                w-full focus:outline-none focus:ring-2 focus:ring-neon-pink"
            />
          </div>
        ) : (
          <div className="w-full flex justify-end items-end">
            <motion.div
              className="relative hidden lg:block"
              initial={false}
              animate={
                searchActive
                  ? { width: "100%", scale: 1 }
                  : { width: "180px", scale: 0.95 }
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
