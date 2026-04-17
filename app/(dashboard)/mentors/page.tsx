"use client";

import { useState, useMemo } from "react";
import { Search, X, ExternalLink, ChevronLeft, Filter } from "lucide-react";
import { cn } from "@/lib/utils";
import { MENTORS, type Mentor } from "@/data/mentors";

const AVATAR_COLORS = ["#FF6B6B","#4ECDC4","#45B7D1","#FFA07A","#98D8C8","#F7DC6F","#BB8FCE","#85C1E2","#F8B88B","#82E0AA"];

function getInitials(name: string) {
  return name.split(" ").slice(0, 2).map(n => n[0]).join("").toUpperCase();
}

function getAvatarColor(name: string) {
  let h = 0;
  for (let i = 0; i < name.length; i++) { h = ((h << 5) - h) + name.charCodeAt(i); h = h & h; }
  return AVATAR_COLORS[Math.abs(h) % AVATAR_COLORS.length];
}

function AvailBadge({ available }: { available: Mentor["available"] }) {
  return (
    <span className={cn(
      "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold",
      available === "Yes" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
    )}>
      <span className={cn("w-1.5 h-1.5 rounded-full", available === "Yes" ? "bg-green-500" : "bg-yellow-500")} />
      {available === "Yes" ? "Available Now" : "Limited"}
    </span>
  );
}

function MentorDetail({ mentor, onBack }: { mentor: Mentor; onBack: () => void }) {
  const color = getAvatarColor(mentor.name);
  const initials = getInitials(mentor.name);
  const focusTags = mentor.focusAreas.split(",").map(f => f.trim()).filter(Boolean);

  return (
    <div className="max-w-3xl">
      <button onClick={onBack} className="flex items-center gap-1.5 text-sm text-brand-600 hover:text-brand-700 font-semibold mb-6">
        <ChevronLeft className="w-4 h-4" /> Back to Directory
      </button>

      <div className="flex items-start gap-5 mb-6">
        <div className="w-20 h-20 rounded-full flex-shrink-0 flex items-center justify-center text-white font-bold text-2xl" style={{ backgroundColor: color }}>
          {initials}
        </div>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-900">{mentor.name}</h1>
          <p className="text-gray-500 mt-0.5">{mentor.firm}</p>
          <div className="flex flex-wrap gap-2 mt-3">
            <AvailBadge available={mentor.available} />
            {mentor.comp && <span className="bg-gray-100 text-gray-700 px-2.5 py-1 rounded-full text-xs font-semibold">{mentor.comp}</span>}
            {mentor.country && <span className="bg-gray-100 text-gray-700 px-2.5 py-1 rounded-full text-xs font-semibold">{mentor.country}</span>}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <h3 className="text-sm font-bold text-gray-900 mb-3">About &amp; Experience</h3>
          <p className="text-sm text-gray-700 leading-relaxed">{mentor.experience}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <h3 className="text-sm font-bold text-gray-900 mb-3">Areas of Expertise</h3>
            <p className="text-sm text-gray-700 leading-relaxed mb-3">{mentor.expertise}</p>
            {focusTags.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {focusTags.slice(0, 6).map(tag => (
                  <span key={tag} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">{tag}</span>
                ))}
              </div>
            )}
            {mentor.agExpertise && (
              <div className="mt-3 px-3 py-2 bg-brand-50 rounded-lg text-xs text-brand-800 font-semibold">
                🌾 {mentor.agExpertise}
              </div>
            )}
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <h3 className="text-sm font-bold text-gray-900 mb-3">Connect</h3>
            <div className="space-y-2">
              {mentor.linkedin && (
                <a href={mentor.linkedin} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 w-full px-4 py-2.5 bg-[#0a66c2] hover:bg-[#004182] text-white text-sm font-semibold rounded-lg transition-colors">
                  <ExternalLink className="w-3.5 h-3.5" /> LinkedIn Profile
                </a>
              )}
              <div className="text-xs text-gray-400 mt-2 p-2 bg-gray-50 rounded-lg">
                <strong>Source:</strong> Western Growers Center for Innovation &amp; Technology — AgTech Startup Mentor List (CC BY 4.0)
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MentorsPage() {
  const [search, setSearch] = useState("");
  const [countryFilter, setCountryFilter] = useState("All");
  const [availFilter, setAvailFilter] = useState("All");
  const [compFilter, setCompFilter] = useState("All");
  const [selected, setSelected] = useState<Mentor | null>(null);

  const countries = useMemo(() => ["All", ...Array.from(new Set(MENTORS.map(m => m.country).filter(Boolean))).sort()], []);
  const compOptions = useMemo(() => ["All", ...Array.from(new Set(MENTORS.map(m => m.comp).filter(Boolean))).sort()], []);

  const availCount = useMemo(() => MENTORS.filter(m => m.available === "Yes").length, []);
  const countryCount = useMemo(() => new Set(MENTORS.map(m => m.country).filter(Boolean)).size, []);
  const openCount = useMemo(() => MENTORS.filter(m => m.comp.toLowerCase().includes("open") || m.comp.toLowerCase().includes("free") || m.comp.toLowerCase().includes("pro bono") || m.comp.toLowerCase().includes("na")).length, []);

  const filtered = useMemo(() => {
    let list = MENTORS;
    if (countryFilter !== "All") list = list.filter(m => m.country === countryFilter);
    if (availFilter !== "All") list = list.filter(m => m.available === availFilter);
    if (compFilter !== "All") list = list.filter(m => m.comp === compFilter);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(m =>
        m.name.toLowerCase().includes(q) ||
        m.firm.toLowerCase().includes(q) ||
        m.expertise.toLowerCase().includes(q) ||
        m.focusAreas.toLowerCase().includes(q) ||
        m.agExpertise.toLowerCase().includes(q)
      );
    }
    return list;
  }, [search, countryFilter, availFilter, compFilter]);

  if (selected) {
    return <MentorDetail mentor={selected} onBack={() => setSelected(null)} />;
  }

  const selectCls = "pl-3 pr-8 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white appearance-none";

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Mentor Directory</h1>
        <p className="text-gray-500 mt-1">{MENTORS.length} AgTech mentors and advisors. Filter by expertise, availability, or region.</p>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Mentors", value: MENTORS.length, color: "text-brand-600" },
          { label: "Available Now", value: availCount, color: "text-green-600" },
          { label: "Countries", value: countryCount, color: "text-orange-500" },
          { label: "Open / No-Cost", value: openCount, color: "text-purple-600" },
        ].map(s => (
          <div key={s.label} className="bg-white border border-gray-200 rounded-xl p-4 text-center">
            <p className={cn("text-2xl font-bold", s.color)}>{s.value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-3 mb-5 flex-wrap">
        <div className="relative flex-1 min-w-56">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            className="w-full pl-9 pr-9 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
            placeholder="Search by name, firm, expertise..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          {search && (
            <button onClick={() => setSearch("")} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
          <select className={cn(selectCls, "pl-8")} value={countryFilter} onChange={e => setCountryFilter(e.target.value)}>
            {countries.map(c => <option key={c} value={c}>{c === "All" ? "Country: All" : c}</option>)}
          </select>
        </div>
        <select className={selectCls} value={availFilter} onChange={e => setAvailFilter(e.target.value)}>
          <option value="All">Availability: All</option>
          <option value="Yes">Available Now</option>
          <option value="Limited">Limited</option>
        </select>
        <select className={cn(selectCls, "max-w-44")} value={compFilter} onChange={e => setCompFilter(e.target.value)}>
          <option value="All">Compensation: All</option>
          {compOptions.filter(c => c !== "All").map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      <p className="text-xs text-gray-400 mb-4">{filtered.length} mentor{filtered.length !== 1 ? "s" : ""} found</p>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map(mentor => {
          const color = getAvatarColor(mentor.name);
          const initials = getInitials(mentor.name);
          return (
            <button
              key={mentor.name}
              onClick={() => setSelected(mentor)}
              className="bg-white border border-gray-200 rounded-xl p-4 text-left hover:border-brand-300 hover:shadow-md transition-all group"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center text-white font-bold text-base" style={{ backgroundColor: color }}>
                  {initials}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-gray-900 text-sm truncate group-hover:text-brand-700 transition-colors">{mentor.name}</p>
                  <p className="text-xs text-gray-500 truncate">{mentor.firm}</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 line-clamp-2 mb-3 leading-relaxed">
                {mentor.expertise.substring(0, 120)}{mentor.expertise.length > 120 ? "..." : ""}
              </p>
              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <span className="text-xs text-gray-400">{mentor.country || "—"}</span>
                <div className="flex items-center gap-2">
                  <AvailBadge available={mentor.available} />
                </div>
              </div>
            </button>
          );
        })}
        {filtered.length === 0 && (
          <div className="col-span-3 text-center py-16 text-gray-400">
            <Search className="w-8 h-8 mx-auto mb-3 opacity-40" />
            <p className="font-semibold">No mentors match your search</p>
            <button onClick={() => { setSearch(""); setCountryFilter("All"); setAvailFilter("All"); setCompFilter("All"); }} className="text-xs text-brand-600 hover:underline mt-1">Clear filters</button>
          </div>
        )}
      </div>
    </div>
  );
}
