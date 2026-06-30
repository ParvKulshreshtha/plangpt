"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Compass, LayoutGrid, Plus, Search } from "lucide-react";
import Logo from "./Logo";

const navItems = [
  { label: "Discover", href: "/", icon: Compass },
  { label: "Plans", href: "/plans", icon: LayoutGrid },
  { label: "Search", href: "/search", icon: Search },
];

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <aside className="hidden lg:flex flex-col w-60 shrink-0 h-screen sticky top-0 border-r border-neon-pink/10 bg-gradient-to-b from-pastel-pink/25 via-white to-pastel-blue/25">
      <div className="px-5 py-6 border-b border-zinc-100">
        <Logo />
      </div>

      <div className="p-4">
        <Link
          href="/plans"
          className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl border border-neon-blue/25 bg-white/80 text-sm font-medium text-neon-blue hover:bg-neon-blue/5 hover:border-neon-blue/40 transition"
        >
          <Plus className="w-4 h-4" />
          Create
        </Link>
      </div>

      <nav className="flex-1 px-3 space-y-1">
        {navItems.map(({ label, href, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition ${
              isActive(href)
                ? "bg-white/90 text-neon-pink shadow-sm shadow-neon-pink/10 border border-neon-pink/20"
                : "text-gray-600 hover:bg-white/70 hover:text-neon-blue"
            }`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-neon-pink/10">
        <button
          type="button"
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-white/70 hover:text-neon-blue transition"
        >
          <span className="w-8 h-8 rounded-full bg-gradient-to-br from-neon-pink to-neon-blue text-white flex items-center justify-center text-xs font-bold">
            U
          </span>
          Login / Signup
        </button>
      </div>
    </aside>
  );
}
