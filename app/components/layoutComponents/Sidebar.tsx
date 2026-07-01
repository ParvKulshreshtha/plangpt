"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Compass, LayoutGrid, Search } from "lucide-react";
import Logo from "./Logo";
import CreateButton from "./CreateButton";

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
        <CreateButton />
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
    </aside>
  );
}
