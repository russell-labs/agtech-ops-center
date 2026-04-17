"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { ChevronDown, ExternalLink, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { regions } from "@/data/content";

const ADMIN_EMAIL = "russellcolevop@gmail.com";

interface SidebarProps {
  region: string;
  onRegionChange: (code: string) => void;
}

function NavItem({ href, emoji, label, pathname }: { href: string; emoji: string; label: string; pathname: string }) {
  const active = pathname === href;
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-2.5 px-4 py-2 text-sm transition-colors w-full",
        active
          ? "bg-sidebar-active text-white border-l-2 border-brand-500"
          : "text-sidebar-text hover:bg-sidebar-hover hover:text-white border-l-2 border-transparent"
      )}
    >
      <span className="text-base flex-shrink-0">{emoji}</span>
      <span className="truncate">{label}</span>
    </Link>
  );
}

export default function Sidebar({ region, onRegionChange }: SidebarProps) {
  const [globalOpen, setGlobalOpen] = useState(true);
  const [regionOpen, setRegionOpen] = useState(false);
  const [myToolsOpen, setMyToolsOpen] = useState(false);
  const [regionDropOpen, setRegionDropOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();

  const selectedRegion = regions.find((r) => r.code === region) || regions[0];
  const isAdmin = session?.user?.email === ADMIN_EMAIL;
  const isSignedIn = !!session?.user;

  return (
    <>
      {/* About modal */}
      {aboutOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          onClick={() => setAboutOpen(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-md w-full p-7 relative shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={() => setAboutOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700">
              <X className="w-4 h-4" />
            </button>
            <h3 className="text-lg font-bold text-gray-900 mb-3">Welcome to FounderOps Center</h3>
            <p className="text-sm text-gray-600 mb-3 leading-relaxed">FounderOps Center is your AgTech ecosystem intelligence platform — built to help founders, investors, and operators navigate the agricultural technology landscape with clarity and confidence.</p>
            <p className="text-sm text-gray-600 mb-3 leading-relaxed"><strong>Explore the Ecosystem</strong> — Browse the global AgTech overview, discover key players, events, funding programs, and thought leaders shaping the industry.</p>
            <p className="text-sm text-gray-600 mb-3 leading-relaxed"><strong>Your Founder&apos;s Journey</strong> — Step-by-step guidance from idea validation through scaling, tailored to your stage and focus area.</p>
            <p className="text-sm text-gray-600 mb-3 leading-relaxed"><strong>Smart Connections</strong> — Get matched with relevant people in the ecosystem based on your profile, interests, and goals.</p>
            <p className="text-sm text-gray-600 leading-relaxed"><strong>Region-Specific Data</strong> — Select your country to see localized ecosystem data, crops, and support programs across 8 regions worldwide.</p>
          </div>
        </div>
      )}

      <aside className="relative flex flex-col h-screen bg-sidebar-bg border-r border-sidebar-border shrink-0 w-64 overflow-hidden">
        {/* Brand */}
        <div className="px-4 pt-5 pb-3 border-b border-sidebar-border">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex-shrink-0 w-9 h-9 bg-brand-600 rounded-lg flex items-center justify-center text-white font-black text-lg select-none">
              F
            </div>
            <div className="min-w-0">
              <p className="text-white text-sm font-bold leading-tight">Founder Ops Center</p>
              <p className="text-sidebar-text text-xs leading-tight">founderopscenter.com</p>
            </div>
          </div>
          <p className="text-sidebar-text text-xs leading-relaxed">AgTech ecosystem intelligence for founders, investors, and operators.</p>
        </div>

        {/* About button */}
        <div className="px-4 py-2 border-b border-sidebar-border">
          <button
            onClick={() => setAboutOpen(true)}
            className="w-full text-left text-xs text-sidebar-text hover:text-white px-3 py-2 rounded-lg hover:bg-sidebar-hover transition-colors"
          >
            ℹ️ About FounderOps Center
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-3">
          {/* Global Resources */}
          <div className="mb-1">
            <button
              onClick={() => setGlobalOpen(!globalOpen)}
              className="w-full flex items-center justify-between px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-sidebar-heading hover:text-white transition-colors"
            >
              <span>Global Resources</span>
              <ChevronDown className={cn("w-3 h-3 transition-transform", globalOpen && "rotate-180")} />
            </button>
            {globalOpen && (
              <div className="mt-0.5">
                <NavItem href="/overview" emoji="🌐" label="Global AgTech Overview" pathname={pathname} />
                <NavItem href="/market-intel" emoji="📊" label="Market Intelligence" pathname={pathname} />
                <NavItem href="/founders-journey" emoji="🚀" label="Founder's Journey" pathname={pathname} />
                <NavItem href="/glossary" emoji="📖" label="AgTech Glossary" pathname={pathname} />
                <NavItem href="/documents" emoji="🧰" label="Founder Toolkit" pathname={pathname} />
              </div>
            )}
          </div>

          {/* Region-Specific Data */}
          <div className="border-t border-sidebar-border pt-2 mt-1 mb-1">
            <button
              onClick={() => setRegionOpen(!regionOpen)}
              className="w-full flex items-center justify-between px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-sidebar-heading hover:text-white transition-colors"
            >
              <span>Region-Specific Data</span>
              <ChevronDown className={cn("w-3 h-3 transition-transform", regionOpen && "rotate-180")} />
            </button>
            {regionOpen && (
              <div className="mt-0.5">
                {/* Region selector */}
                <div className="px-4 mb-1 relative">
                  <button
                    onClick={() => setRegionDropOpen(!regionDropOpen)}
                    className="w-full flex items-center gap-2 px-3 py-2 bg-sidebar-active rounded-lg text-sm text-white hover:bg-sidebar-hover transition-colors"
                  >
                    <span className="text-base">{selectedRegion.flag}</span>
                    <span className="flex-1 text-left truncate text-xs">{selectedRegion.name}</span>
                    <ChevronDown className={cn("w-3 h-3 transition-transform flex-shrink-0", regionDropOpen && "rotate-180")} />
                  </button>
                  {regionDropOpen && (
                    <div className="absolute top-full left-4 right-4 mt-1 bg-sidebar-active border border-sidebar-border rounded-lg shadow-lg z-50 overflow-hidden">
                      {regions.map((r) => (
                        <button
                          key={r.code}
                          onClick={() => { onRegionChange(r.code); setRegionDropOpen(false); }}
                          className={cn(
                            "w-full flex items-center gap-2 px-3 py-2 text-xs transition-colors text-left",
                            r.code === region ? "bg-brand-800 text-white" : "text-sidebar-text hover:bg-sidebar-hover hover:text-white"
                          )}
                        >
                          <span>{r.flag}</span>
                          <span>{r.name}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <NavItem href="/ecosystem" emoji="📍" label="Ecosystem Overview" pathname={pathname} />
                <NavItem href="/crops" emoji="🌱" label="Crops" pathname={pathname} />
                <NavItem href="/hub" emoji="🌐" label="Community Hub" pathname={pathname} />
                <NavItem href="/venture" emoji="🚀" label="Venture Studio" pathname={pathname} />
                <NavItem href="/accelerators" emoji="⚡" label="Accelerator Hub" pathname={pathname} />
                <NavItem href="/resources" emoji="📚" label="Resources & Support" pathname={pathname} />
                {isSignedIn && <NavItem href="/investor" emoji="📈" label="Investor Dashboard" pathname={pathname} />}
                {isSignedIn && <NavItem href="/ecosystem-ws" emoji="🏗️" label="Ecosystem Workspace" pathname={pathname} />}
              </div>
            )}
          </div>

          {/* My Tools — signed in only */}
          {isSignedIn && (
            <div className="border-t border-sidebar-border pt-2 mt-1">
              <button
                onClick={() => setMyToolsOpen(!myToolsOpen)}
                className="w-full flex items-center justify-between px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-sidebar-heading hover:text-white transition-colors"
              >
                <span>My Tools</span>
                <ChevronDown className={cn("w-3 h-3 transition-transform", myToolsOpen && "rotate-180")} />
              </button>
              {myToolsOpen && (
                <div className="mt-0.5">
                  <NavItem href="/action" emoji="🎯" label="Action Center" pathname={pathname} />
                  <NavItem href="/connections" emoji="🤝" label="My Connections" pathname={pathname} />
                  <NavItem href="/roadmap" emoji="🗺️" label="Product Roadmap" pathname={pathname} />
                  {isAdmin && <NavItem href="/admin" emoji="🔐" label="Admin Panel" pathname={pathname} />}
                </div>
              )}
            </div>
          )}
        </nav>

        {/* Footer */}
        <div className="border-t border-sidebar-border p-4 space-y-3">
          <div className="flex items-center gap-2.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/Russell.jpeg"
              alt="Russell Cole"
              className="w-8 h-8 rounded-full object-cover flex-shrink-0 border border-brand-600"
              onError={(e) => { const img = e.target as HTMLImageElement; img.style.display = "none"; }}
            />
            <div className="min-w-0">
              <p className="text-white text-xs font-bold leading-tight">Russell Cole</p>
              <a
                href="https://www.linkedin.com/in/russellcole/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-400 text-xs hover:text-brand-300 transition-colors inline-flex items-center gap-0.5"
              >
                LinkedIn <ExternalLink className="w-2.5 h-2.5 ml-0.5" />
              </a>
            </div>
          </div>

          <Link
            href="/book-a-call"
            className={cn(
              "flex items-center gap-2 w-full px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors",
              "bg-brand-700 text-white hover:bg-brand-600",
              pathname === "/book-a-call" && "bg-brand-600"
            )}
          >
            <span>📞</span>
            <span className="truncate">Book a Call with Russell</span>
          </Link>

          {isSignedIn && (
            <div className="flex items-center gap-2 pt-1 border-t border-sidebar-border">
              {session.user.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={session.user.image} alt={session.user.name || "User"} className="w-6 h-6 rounded-full flex-shrink-0" />
              ) : (
                <div className="w-6 h-6 rounded-full bg-sidebar-active flex items-center justify-center flex-shrink-0 text-xs text-sidebar-text">
                  {session.user.name?.[0] ?? "U"}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-white text-xs font-medium truncate leading-tight">{session.user.name}</p>
                <p className="text-sidebar-text text-xs truncate leading-tight">{session.user.email}</p>
              </div>
              <button
                onClick={() => signOut({ callbackUrl: "/login" })}
                className="text-sidebar-text hover:text-white transition-colors text-xs flex-shrink-0"
                title="Sign out"
              >
                ↪
              </button>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
