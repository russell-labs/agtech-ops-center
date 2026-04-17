"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import { Bell, ExternalLink, Sun, Moon } from "lucide-react";
import Link from "next/link";
import { useSession, signIn } from "next-auth/react";
import { RegionContext } from "@/contexts/RegionContext";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [region, setRegion] = useState("CA");
  const { data: session } = useSession();
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const isDark = stored !== "light";
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  function toggleTheme() {
    const next = !dark;
    setDark(next);
    localStorage.setItem("theme", next ? "dark" : "light");
    document.documentElement.classList.toggle("dark", next);
  }

  return (
    <div className="flex h-screen overflow-hidden bg-slate-950">
      <Sidebar region={region} onRegionChange={setRegion} />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top bar */}
        <header className="flex items-center justify-between px-6 py-3.5 bg-slate-950 border-b border-white/5 shrink-0">
          <div>
            <h2 className="text-sm font-semibold text-white">Global AgTech Founder Dashboard</h2>
            <p className="text-xs text-gray-500">Tools, data, and insights for agricultural technology founders worldwide.</p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSfhY5p0D4PQRlke2rH_9Rbe-4dCObvufSfNoMaQTjdbc3vnzQ/viewform"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/10 text-amber-400 text-xs font-medium hover:bg-amber-500/20 transition-colors border border-amber-500/20"
            >
              <Bell className="w-3.5 h-3.5" />
              <span>Share Feedback</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            <button
              onClick={toggleTheme}
              className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
              title={dark ? "Switch to light mode" : "Switch to dark mode"}
            >
              {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {session ? null : (
              <button
                onClick={() => signIn()}
                className="px-4 py-1.5 rounded-lg bg-brand-700 hover:bg-brand-600 text-white text-sm font-medium transition-colors"
              >
                Sign In
              </button>
            )}
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          <RegionContext.Provider value={region}>
            {children}
          </RegionContext.Provider>
        </main>
      </div>
    </div>
  );
}
