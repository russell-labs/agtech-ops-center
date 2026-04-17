"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, ExternalLink, Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { HUB_NEWSLETTERS, HUB_COMMUNITIES, HUB_EVENTS, HUB_PODCASTS, HUB_LEADERS } from "@/data/hub";
import { MENTORS } from "@/data/mentors";

const AVATAR_COLORS = ["#FF6B6B","#4ECDC4","#45B7D1","#FFA07A","#98D8C8","#F7DC6F","#BB8FCE","#85C1E2","#F8B88B","#82E0AA"];
function getInitials(name: string) { return name.split(" ").slice(0, 2).map(n => n[0]).join("").toUpperCase(); }
function getAvatarColor(name: string) {
  let h = 0;
  for (let i = 0; i < name.length; i++) { h = ((h << 5) - h) + name.charCodeAt(i); h = h & h; }
  return AVATAR_COLORS[Math.abs(h) % AVATAR_COLORS.length];
}

function Accordion({ id, icon, title, count, defaultOpen = false, children }: {
  id: string; icon: string; title: string; count: number; defaultOpen?: boolean; children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 px-5 py-4 text-left hover:bg-gray-50 transition-colors"
      >
        <span className="text-xl">{icon}</span>
        <span className="flex-1 font-bold text-gray-900 text-sm">{title}</span>
        <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full font-semibold">{count}</span>
        {open ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
      </button>
      {open && <div className="border-t border-gray-100 p-5">{children}</div>}
    </div>
  );
}

function MentorsSection() {
  const [search, setSearch] = useState("");
  const [availFilter, setAvailFilter] = useState("All");

  const filtered = MENTORS.filter(m => {
    if (availFilter === "Available" && m.available !== "Yes") return false;
    if (availFilter === "Limited" && m.available !== "Limited") return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (m.name + m.firm + m.expertise + m.focusAreas + m.agExpertise).toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div>
      <div className="flex gap-3 mb-4 flex-wrap">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
          <input
            type="text"
            className="w-full pl-8 pr-8 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
            placeholder="Search mentors..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          {search && <button onClick={() => setSearch("")} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"><X className="w-3 h-3" /></button>}
        </div>
        <select
          value={availFilter}
          onChange={e => setAvailFilter(e.target.value)}
          className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white"
        >
          <option value="All">All Availability</option>
          <option value="Available">Available Now</option>
          <option value="Limited">Limited</option>
        </select>
      </div>
      <p className="text-xs text-gray-400 mb-3">{filtered.length} of {MENTORS.length} mentors</p>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
        {filtered.slice(0, 30).map(m => {
          const color = getAvatarColor(m.name);
          const initials = getInitials(m.name);
          return (
            <div key={m.name} className="border border-gray-200 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center text-white font-bold text-sm" style={{ backgroundColor: color }}>
                  {initials}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-gray-900 text-sm truncate">{m.name}</p>
                  <p className="text-xs text-gray-500 truncate">{m.firm}</p>
                </div>
              </div>
              <p className="text-xs text-gray-600 line-clamp-2 mb-2 leading-relaxed">{m.expertise.substring(0, 100)}...</p>
              <div className="flex items-center justify-between">
                <span className={cn("text-xs font-semibold px-2 py-0.5 rounded-full",
                  m.available === "Yes" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                )}>
                  {m.available === "Yes" ? "Available" : "Limited"}
                </span>
                {m.linkedin && (
                  <a href={m.linkedin} target="_blank" rel="noopener noreferrer" className="text-xs text-brand-600 hover:text-brand-700 font-semibold flex items-center gap-0.5">
                    LinkedIn <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>
      {filtered.length > 30 && (
        <p className="text-xs text-gray-400 mt-4 text-center">Showing 30 of {filtered.length} results. Use the <a href="/mentors" className="text-brand-600 hover:underline">full Mentor Directory</a> for all results.</p>
      )}
    </div>
  );
}

function CommunitiesSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {HUB_COMMUNITIES.map(c => (
        <div key={c.name} className="border border-gray-200 rounded-xl p-4 flex flex-col">
          <div className="text-2xl mb-2">{c.icon}</div>
          <h3 className="font-bold text-gray-900 text-sm mb-0.5">{c.name}</h3>
          <p className="text-xs text-gray-500 mb-1">{c.by}</p>
          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full self-start mb-2 font-medium">{c.type}</span>
          <p className="text-sm text-gray-600 leading-relaxed flex-1 mb-3">{c.desc}</p>
          <a href={c.url} target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 px-3 py-2 bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold rounded-lg transition-colors">
            Join <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      ))}
    </div>
  );
}

function EventsSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {HUB_EVENTS.map(e => (
        <div key={e.name} className="border border-gray-200 rounded-xl p-4 flex flex-col">
          <div className="text-2xl mb-2">{e.icon}</div>
          <h3 className="font-bold text-gray-900 text-sm mb-0.5">{e.name}</h3>
          <p className="text-xs text-gray-500 mb-1">{e.location}</p>
          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full self-start mb-2 font-medium">📅 {e.date}</span>
          <p className="text-sm text-gray-600 leading-relaxed flex-1 mb-3">{e.desc}</p>
          <a href={e.url} target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 px-3 py-2 border border-gray-300 hover:bg-gray-50 text-gray-700 text-xs font-semibold rounded-lg transition-colors">
            Learn More <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      ))}
    </div>
  );
}

function NewslettersSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {HUB_NEWSLETTERS.map(n => (
        n.isHeader ? (
          <div key={n.name} className="md:col-span-2 xl:col-span-3 bg-brand-50 border border-brand-200 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg">{n.icon}</span>
              <h3 className="font-bold text-brand-800 text-sm">{n.name}</h3>
            </div>
            <p className="text-sm text-brand-700">{n.desc}</p>
          </div>
        ) : (
          <div key={n.name} className="border border-gray-200 rounded-xl p-4 flex flex-col">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">{n.icon}</span>
              <div>
                <p className="font-bold text-gray-900 text-sm">{n.name}</p>
                <p className="text-xs text-gray-500">{n.by}</p>
              </div>
            </div>
            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full self-start mb-2 font-medium">{n.freq}</span>
            <p className="text-sm text-gray-600 leading-relaxed flex-1 mb-3">{n.desc}</p>
            {n.url && (
              <a href={n.url} target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 px-3 py-2 bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold rounded-lg transition-colors">
                📩 Subscribe
              </a>
            )}
          </div>
        )
      ))}
    </div>
  );
}

function PodcastsSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {HUB_PODCASTS.map(p => (
        <div key={p.name} className="border border-gray-200 rounded-xl p-4 flex flex-col">
          <div className="text-2xl mb-2">{p.icon}</div>
          <h3 className="font-bold text-gray-900 text-sm mb-1">{p.name}</h3>
          <div className="flex gap-1.5 mb-2">
            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full font-medium">{p.type}</span>
            <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full font-medium">{p.tag}</span>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed flex-1 mb-3">{p.desc}</p>
          {p.url && (
            <a href={p.url} target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 px-3 py-2 border border-gray-300 hover:bg-gray-50 text-gray-700 text-xs font-semibold rounded-lg transition-colors">
              Listen / Watch <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>
      ))}
    </div>
  );
}

function LeadersSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {HUB_LEADERS.map(p => {
        const initials = p.name.split(" ").map(w => w[0]).join("");
        return (
          <div key={p.name} className="border border-gray-200 rounded-xl p-4 flex flex-col">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center text-white text-sm font-bold bg-gradient-to-br from-brand-500 to-brand-700">
                {initials}
              </div>
              <div className="min-w-0">
                <p className="font-bold text-gray-900 text-sm truncate">{p.name}</p>
                <p className="text-xs text-gray-500 leading-tight">{p.role}</p>
              </div>
            </div>
            <span className="text-xs bg-brand-100 text-brand-700 px-2 py-0.5 rounded-full self-start mb-2 font-semibold">{p.focus}</span>
            <p className="text-sm text-gray-600 leading-relaxed flex-1 mb-3">{p.desc}</p>
            {p.linkedin && (
              <a href={p.linkedin} target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 px-3 py-2 border border-gray-300 hover:bg-gray-50 text-gray-700 text-xs font-semibold rounded-lg transition-colors">
                Follow / Connect <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function HubPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Community Hub</h1>
        <p className="text-gray-500 mt-1">Your front door to the entire AgTech ecosystem — people, communities, events, and resources.</p>
      </div>

      <div className="space-y-4">
        <Accordion id="mentors" icon="🤝" title="People Directory — Mentors & Advisors" count={MENTORS.length} defaultOpen>
          <MentorsSection />
        </Accordion>
        <Accordion id="communities" icon="🌐" title="Communities & Working Groups" count={HUB_COMMUNITIES.length} defaultOpen>
          <CommunitiesSection />
        </Accordion>
        <Accordion id="events" icon="📅" title="Events & Conferences" count={HUB_EVENTS.length}>
          <EventsSection />
        </Accordion>
        <Accordion id="newsletters" icon="📰" title="Newsletters & Media" count={HUB_NEWSLETTERS.length - 1}>
          <NewslettersSection />
        </Accordion>
        <Accordion id="podcasts" icon="🎙️" title="Podcasts & Video" count={HUB_PODCASTS.length}>
          <PodcastsSection />
        </Accordion>
        <Accordion id="leaders" icon="🌟" title="Thought Leaders to Follow" count={HUB_LEADERS.length}>
          <LeadersSection />
        </Accordion>
      </div>
    </div>
  );
}
