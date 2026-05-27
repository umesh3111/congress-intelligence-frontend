"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, MessageSquare, Mic } from "lucide-react";
import clsx from "clsx";

const NAV_ITEMS = [
  { href: "/feed", label: "Intel Feed", icon: Search },
  { href: "/ask", label: "Ask Anything", icon: MessageSquare },
  { href: "/capture", label: "Capture", icon: Mic },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="w-60 flex-shrink-0 flex flex-col h-full"
      style={{ backgroundColor: "#0F2A43" }}
    >
      {/* Logo */}
      <div className="px-6 py-5 border-b border-white/10">
        <div className="text-white font-bold text-lg tracking-tight">
          Congress Intel
        </div>
        <div style={{ color: "#5EEAD4" }} className="text-xs mt-0.5">
          DDW 2026 · Live
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const active = pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={clsx(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                active
                  ? "text-white"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              )}
              style={active ? { backgroundColor: "#0D9488" } : {}}
            >
              <Icon size={16} />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-white/10">
        <div className="text-white/40 text-xs">Pharma Alpha Inc.</div>
        <div className="text-white/40 text-xs">Demo session</div>
      </div>
    </aside>
  );
}
