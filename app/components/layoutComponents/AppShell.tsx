"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Compass, LayoutGrid, Menu, Plus, Search, X } from "lucide-react";
import Sidebar from "./Sidebar";
import Logo from "./Logo";

const mobileNavItems = [
  { label: "Discover", href: "/", icon: Compass },
  { label: "Plans", href: "/plans", icon: LayoutGrid },
  { label: "Search", href: "/search", icon: Search },
];

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      {menuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMenuOpen(false)}
          />
          <aside className="relative w-72 h-full bg-gradient-to-b from-pastel-pink/25 via-white to-pastel-blue/25 flex flex-col shadow-xl">
            <div className="flex items-center justify-between px-5 py-6 border-b border-zinc-100">
              <Logo onClick={() => setMenuOpen(false)} />
              <button type="button" onClick={() => setMenuOpen(false)}>
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            <div className="p-4 space-y-1">
              <Link
                href="/plans"
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl border border-neon-blue/25 bg-white/80 text-sm font-medium text-neon-blue"
              >
                <Plus className="w-4 h-4" />
                Create
              </Link>
              {mobileNavItems.map(({ label, href, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium ${
                    isActive(href)
                      ? "bg-white/90 text-neon-pink border border-neon-pink/20 shadow-sm"
                      : "text-gray-600"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </Link>
              ))}
            </div>
          </aside>
        </div>
      )}

      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-20 bg-white/75 backdrop-blur-md border-b border-neon-pink/10 px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <button
              type="button"
              className="lg:hidden p-2 rounded-lg hover:bg-pastel-pink/30 text-neon-pink"
              onClick={() => setMenuOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-neon-pink via-neon-purple to-neon-blue bg-clip-text text-transparent">
              Plan your world
            </h1>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
