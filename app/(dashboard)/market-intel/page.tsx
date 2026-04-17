"use client";

import { useState, useMemo } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import {
  AGTECH_COMPANIES, MI_SECTOR_MAP, MI_SECTORS, MI_TRENDS,
  MI_MATRIX, MI_SIGNALS, MI_PERSONAS, MI_RISKS, MI_CROSSWALK,
} from "@/data/market-intel";

type Tab = "sectors" | "trends" | "crosswalk" | "matrix" | "personas" | "signals" | "companies";
type CiTab = "overview" | "directory" | "canadian" | "sources";

function parseFunding(f: string): number {
  if (!f) return 0;
  const num = parseFloat(f.replace(/[^0-9.]/g, ""));
  if (f.includes("B")) return num * 1000;
  return num || 0;
}

function analyzeCompanies(companies: typeof AGTECH_COMPANIES) {
  const bySector: Record<string, number> = {};
  const byGeo: Record<string, number> = {};
  const byStage: Record<string, number> = {};
  companies.forEach(c => {
    bySector[c.sector] = (bySector[c.sector] || 0) + 1;
    byGeo[c.hq] = (byGeo[c.hq] || 0) + 1;
    byStage[c.stage] = (byStage[c.stage] || 0) + 1;
  });
  const totalFunding = companies.reduce((s, c) => s + parseFunding(c.funding), 0);
  const topFunded = [...companies].sort((a, b) => parseFunding(b.funding) - parseFunding(a.funding)).slice(0, 10);
  const canadian = companies.filter(c => c.hq === "Canada");
  const repeats = companies.filter(c => c.list && c.list.includes(","));
  const ages = companies.filter(c => c.yr).map(c => 2026 - (c.yr as number));
  const avgAge = ages.length ? (ages.reduce((a, b) => a + b, 0) / ages.length).toFixed(1) : "0";
  return {
    total: companies.length,
    sectorDist: Object.entries(bySector).sort((a, b) => b[1] - a[1]),
    geoDist: Object.entries(byGeo).sort((a, b) => b[1] - a[1]),
    stageDist: Object.entries(byStage).sort((a, b) => b[1] - a[1]),
    totalFunding, topFunded, canadian, repeats, avgAge,
  };
}

const GEO_FLAGS: Record<string, string> = {
  US:"🇺🇸",Canada:"🇨🇦",UK:"🇬🇧",France:"🇫🇷",Israel:"🇮🇱",Brazil:"🇧🇷",
  Australia:"🇦🇺",Netherlands:"🇳🇱",Germany:"🇩🇪",Japan:"🇯🇵",Mexico:"🇲🇽",
  Kenya:"🇰🇪",Indonesia:"🇮🇩",Norway:"🇳🇴",Switzerland:"🇨🇭",Singapore:"🇸🇬",
  Ireland:"🇮🇪",Denmark:"🇩🇰",Belgium:"🇧🇪","New Zealand":"🇳🇿",UAE:"🇦🇪",
};

const PRIORITY_COLORS: Record<string, string> = {
  high: "bg-green-500/15 text-green-400 border border-green-500/20",
  med: "bg-amber-500/15 text-amber-400 border border-amber-500/20",
  watch: "bg-purple-500/15 text-purple-400 border border-purple-500/20",
  low: "bg-red-500/15 text-red-400 border border-red-500/20",
};

const SECTOR_COLORS: Record<string, string> = {
  CEA:"#10b981","Animal Tech":"#f59e0b","On-Farm AI/Robotics":"#3b82f6",
  "Novel Crop Inputs":"#8b5cf6","Agribusiness Platform":"#ec4899",
};

const STAGE_COLORS: Record<string, string> = {
  Seed:"#94a3b8","Series A":"#60a5fa","Series B":"#34d399","Series C":"#fbbf24",
  "Series D":"#f97316",Growth:"#a78bfa",Late:"#f43f5e",
};

export default function MarketIntelPage() {
  const [tab, setTab] = useState<Tab>("sectors");
  const [openSector, setOpenSector] = useState<string | null>(null);
  const [ciTab, setCiTab] = useState<CiTab>("overview");
  const [ciFilter, setCiFilter] = useState("all");
  const [ciSearch, setCiSearch] = useState("");
  const [ciSort, setCiSort] = useState("funding");

  const stats = useMemo(() => analyzeCompanies(AGTECH_COMPANIES), []);

  const filtered = useMemo(() => {
    let list = [...AGTECH_COMPANIES];
    if (ciFilter !== "all") list = list.filter(c => c.sector === ciFilter);
    if (ciSearch) {
      const q = ciSearch.toLowerCase();
      list = list.filter(c =>
        c.name.toLowerCase().includes(q) || c.sub.toLowerCase().includes(q) ||
        c.hq.toLowerCase().includes(q) || c.sector.toLowerCase().includes(q)
      );
    }
    if (ciSort === "funding") list.sort((a, b) => parseFunding(b.funding) - parseFunding(a.funding));
    else if (ciSort === "name") list.sort((a, b) => a.name.localeCompare(b.name));
    else if (ciSort === "sector") list.sort((a, b) => a.sector.localeCompare(b.sector));
    else if (ciSort === "geo") list.sort((a, b) => a.hq.localeCompare(b.hq));
    return list;
  }, [ciFilter, ciSearch, ciSort]);

  const tabs: { key: Tab; label: string }[] = [
    { key: "sectors", label: `📊 Emerging Sectors (${MI_SECTORS.length})` },
    { key: "trends", label: "📈 Global Trends" },
    { key: "crosswalk", label: "🔗 Tech Framework" },
    { key: "matrix", label: "🎯 Opportunity Matrix" },
    { key: "personas", label: "👥 Stakeholder Lens" },
    { key: "signals", label: "📡 Market Signals" },
    { key: "companies", label: `🏢 Company Intel (${AGTECH_COMPANIES.length})` },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">📊 Market Intelligence</h1>
          <p className="text-sm text-gray-400">AgTech emerging sectors, growth trends, and opportunity analysis — grounded in 2025–2026 global data.</p>
        </div>
      </div>

      {/* Meta tags */}
      <div className="flex flex-wrap gap-2">
        {["April 2026","Global scope",`9 sectors · ${AGTECH_COMPANIES.length} companies`,"All personas"].map((t, i) => (
          <span key={t} className={`text-xs px-3 py-1 rounded-full border ${i === 3 ? "border-green-500/40 text-green-400" : "border-white/10 text-gray-400"}`}>{t}</span>
        ))}
      </div>

      {/* Tab bar */}
      <div className="flex flex-wrap gap-2">
        {tabs.map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-4 py-2 rounded-full text-xs font-semibold border transition-all ${
              tab === t.key
                ? "bg-green-600 border-green-500 text-white"
                : "bg-transparent border-white/10 text-gray-400 hover:border-white/20 hover:text-gray-300"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* SECTORS TAB */}
      {tab === "sectors" && (
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-4">{MI_SECTORS.length} high-growth opportunity areas — click a sector to expand</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {MI_SECTORS.map(s => {
              const isOpen = openSector === s.id;
              return (
                <div
                  key={s.id}
                  onClick={() => setOpenSector(isOpen ? null : s.id)}
                  className={`bg-white/5 rounded-xl border cursor-pointer transition-all ${isOpen ? "border-green-500" : "border-white/10 hover:border-white/20"}`}
                >
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-semibold px-3 py-1 rounded-full" style={{ background: s.badgeColor + "22", color: s.badgeColor }}>
                        {s.badge}
                      </span>
                      {isOpen ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                    </div>
                    <h3 className="text-sm font-bold text-white mb-2">{s.title}</h3>
                    <p className="text-xs text-gray-400 leading-relaxed mb-3">{s.summary}</p>
                    <div className="flex flex-wrap gap-1">
                      {s.techLayers.map(t => (
                        <span key={t} className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-gray-500">{t}</span>
                      ))}
                    </div>
                  </div>
                  {isOpen && (
                    <div className="border-t border-white/10 p-5">
                      {s.whyPerforming && (
                        <div className="mb-4 pl-3 border-l-2 rounded-r-lg py-2 pr-3" style={{ borderColor: s.badgeColor, background: s.badgeColor + "11" }}>
                          <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: s.badgeColor }}>Why it&apos;s performing</p>
                          <p className="text-xs text-gray-400 leading-relaxed">{s.whyPerforming}</p>
                        </div>
                      )}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[
                          { label: "For Founders", items: s.founders, color: "#16a34a" },
                          { label: "For Investors", items: s.investors, color: "#2563eb" },
                          { label: "Canadian Context", items: s.context, color: "#f59e0b" },
                        ].map(col => (
                          <div key={col.label}>
                            <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: col.color }}>{col.label}</p>
                            {col.items.map(item => (
                              <div key={item} className="text-xs text-gray-400 py-1.5 border-b border-white/5 leading-snug">{item}</div>
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TRENDS TAB */}
      {tab === "trends" && (
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-4">Key technology and market forces shaping the global sector</p>
          {MI_TRENDS.map(t => (
            <div key={t.title} className="bg-white/5 rounded-xl border border-white/10 p-5 flex gap-4">
              <div className="w-2.5 h-2.5 rounded-full flex-shrink-0 mt-1.5" style={{ background: t.color }} />
              <div className="flex-1">
                <h4 className="text-sm font-bold text-white mb-2">{t.title}</h4>
                <p className="text-xs text-gray-400 leading-relaxed mb-3">{t.desc}</p>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-500 w-24 flex-shrink-0">{t.label}</span>
                  <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all" style={{ width: `${t.pct}%`, background: t.color }} />
                  </div>
                  <span className="text-xs font-bold text-gray-400 w-8 text-right">{t.pct}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* CROSSWALK TAB */}
      {tab === "crosswalk" && (
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-4">Technology layers powering AgTech innovation — which sectors each layer enables</p>
          {MI_CROSSWALK.map(c => (
            <div key={c.layer} className="bg-white/5 rounded-xl border border-white/10 p-5">
              <div className="flex gap-4">
                <div className="w-1 rounded-full flex-shrink-0" style={{ background: c.color, minHeight: 40 }} />
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h4 className="text-sm font-bold text-white mb-1">{c.layer}</h4>
                      <p className="text-xs text-gray-400 leading-relaxed mb-3">{c.desc}</p>
                      <div className="flex flex-wrap gap-2">
                        {c.sectors.map(s => (
                          <span key={s} className="text-xs px-2 py-0.5 rounded-full font-semibold border" style={{ background: c.color + "15", color: c.color, borderColor: c.color + "30" }}>{s}</span>
                        ))}
                      </div>
                    </div>
                    <span className="text-xs text-gray-500 font-bold flex-shrink-0 pt-0.5">{c.sectors.length} sector{c.sectors.length !== 1 ? "s" : ""}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4">
            <p className="text-xs text-gray-300 leading-relaxed"><strong className="text-green-400">Key insight:</strong> AI-driven technology and digital/sensing technology are the most cross-cutting layers — appearing in five of the nine sectors. Infrastructure plays in those two categories have the largest total addressable market and the most natural expansion paths.</p>
          </div>
        </div>
      )}

      {/* MATRIX TAB */}
      {tab === "matrix" && (
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-4">Opportunity assessment — Canadian pilot context</p>
          <div className="bg-white/5 rounded-xl border border-white/10 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-white/10">
                    {["Sector","Pilot Readiness","Farmer Adoption","Capital Intensity","2027 Priority","Notes"].map(h => (
                      <th key={h} className="text-left px-4 py-3 text-gray-500 font-semibold uppercase tracking-wider text-xs">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {MI_MATRIX.map(m => (
                    <tr key={m.sector} className="border-b border-white/5 last:border-0">
                      <td className="px-4 py-3 font-bold text-white">{m.sector}</td>
                      <td className="px-4 py-3"><span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${m.ready.includes("High") ? PRIORITY_COLORS.high : m.ready.includes("Low") ? PRIORITY_COLORS.low : PRIORITY_COLORS.med}`}>{m.ready}</span></td>
                      <td className="px-4 py-3"><span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${m.ease.includes("High") ? PRIORITY_COLORS.high : m.ease.includes("Low") ? PRIORITY_COLORS.low : PRIORITY_COLORS.med}`}>{m.ease}</span></td>
                      <td className="px-4 py-3"><span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${m.capex === "Low" ? PRIORITY_COLORS.high : m.capex === "High" ? PRIORITY_COLORS.low : PRIORITY_COLORS.med}`}>{m.capex}</span></td>
                      <td className="px-4 py-3"><span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${PRIORITY_COLORS[m.prClass]}`}>{m.priority}</span></td>
                      <td className="px-4 py-3 text-gray-400">{m.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* PERSONAS TAB */}
      {tab === "personas" && (
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-4">What each stakeholder needs from this landscape</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {MI_PERSONAS.map(p => (
              <div key={p.title} className="bg-white/5 rounded-xl border border-white/10 p-5">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl mb-3" style={{ background: p.bg }}>{p.icon}</div>
                <h3 className="text-sm font-bold text-white mb-0.5">{p.title}</h3>
                <p className="text-xs text-gray-500 mb-4">{p.sub}</p>
                <div className="border-t border-white/10 pt-4 space-y-3">
                  {[
                    { l: "Wants", v: p.wants },
                    { l: "Fears", v: p.fears },
                    { l: "Signal", v: p.signal },
                    { l: "Sectors", v: p.sectors },
                  ].map(row => (
                    <div key={row.l} className="flex gap-3">
                      <span className="text-xs font-bold uppercase tracking-wider text-gray-500 w-14 flex-shrink-0 pt-0.5">{row.l}</span>
                      <span className="text-xs text-gray-400 leading-relaxed">{row.v}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SIGNALS TAB */}
      {tab === "signals" && (
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-4">Key numbers grounding this analysis</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
            {MI_SIGNALS.map(s => (
              <div key={s.num} className="bg-white/5 rounded-xl border border-white/10 p-4 text-center">
                <div className="text-2xl font-black text-green-400 mb-1">{s.num}</div>
                <div className="text-xs text-gray-400 leading-snug">{s.label}</div>
              </div>
            ))}
          </div>
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-4">Key risks to track going into 2027 planning</p>
          <div className="space-y-3">
            {MI_RISKS.map(r => (
              <div key={r.title} className="bg-white/5 rounded-xl border border-white/10 p-5 flex gap-4">
                <div className="w-2.5 h-2.5 rounded-full flex-shrink-0 mt-1.5" style={{ background: r.color }} />
                <div>
                  <h4 className="text-sm font-bold text-white mb-2">{r.title}</h4>
                  <p className="text-xs text-gray-400 leading-relaxed">{r.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-600 mt-6 leading-relaxed">Sources: iGrow News State of Industry 2025, PitchBook Q1 2025, Fermes Leader AgTech 2026, ICL Group AgTech Innovations 2026, Animal AgTech Investment Outlook 2026, World Agri-Tech Innovation Summit, AgTechNavigator.</p>
        </div>
      )}

      {/* COMPANIES TAB */}
      {tab === "companies" && (
        <div>
          {/* Sub-tabs */}
          <div className="flex gap-1 bg-white/5 p-1 rounded-xl mb-5 flex-wrap">
            {(["overview","directory","canadian","sources"] as CiTab[]).map(ct => (
              <button
                key={ct}
                onClick={() => setCiTab(ct)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all capitalize ${ciTab === ct ? "bg-green-600 text-white" : "text-gray-400 hover:text-gray-300"}`}
              >
                {ct === "overview" ? "📊 Dashboard" : ct === "directory" ? "📋 Directory" : ct === "canadian" ? "🍁 Canadian Spotlight" : "📚 Sources"}
              </button>
            ))}
          </div>

          {/* OVERVIEW DASHBOARD */}
          {ciTab === "overview" && (
            <div>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
                {[
                  { val: stats.total, label: "Companies Tracked", color: "text-green-400" },
                  { val: `$${(stats.totalFunding / 1000).toFixed(1)}B+`, label: "Combined Funding", color: "text-blue-400" },
                  { val: stats.geoDist.length, label: "Countries", color: "text-amber-400" },
                  { val: `${stats.avgAge}yr`, label: "Avg Company Age", color: "text-purple-400" },
                  { val: stats.repeats.length, label: "Multi-List Winners", color: "text-pink-400" },
                ].map(item => (
                  <div key={item.label} className="bg-white/5 rounded-xl border border-white/10 p-4 text-center">
                    <div className={`text-2xl font-black mb-1 ${item.color}`}>{item.val}</div>
                    <div className="text-xs text-gray-500 uppercase tracking-wide leading-snug">{item.label}</div>
                  </div>
                ))}
              </div>

              <div className="bg-white/5 rounded-xl border border-white/10 p-5 mb-4">
                <h3 className="text-sm font-bold text-white mb-4">Sector Distribution</h3>
                {stats.sectorDist.map(([s, c]) => {
                  const pct = ((c / stats.total) * 100).toFixed(0);
                  const clr = SECTOR_COLORS[s] || "#16a34a";
                  return (
                    <div key={s} className="mb-3">
                      <div className="flex justify-between mb-1">
                        <span className="text-xs font-semibold text-gray-300">{MI_SECTOR_MAP[s] || s}</span>
                        <span className="text-xs text-gray-500">{c} companies ({pct}%)</span>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${(c / (stats.sectorDist[0]?.[1] || 1)) * 100}%`, background: clr }} />
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="bg-white/5 rounded-xl border border-white/10 p-5">
                  <h3 className="text-sm font-bold text-white mb-4">Stage Distribution</h3>
                  {stats.stageDist.map(([s, c]) => (
                    <div key={s} className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: STAGE_COLORS[s] || "#6b7280" }} />
                      <span className="text-xs text-gray-300 flex-1">{s}</span>
                      <div className="h-1.5 rounded-full" style={{ width: `${(c / (stats.stageDist[0]?.[1] || 1)) * 60}px`, background: STAGE_COLORS[s] || "#6b7280" }} />
                      <span className="text-xs font-bold text-gray-500 w-5 text-right">{c}</span>
                    </div>
                  ))}
                </div>
                <div className="bg-white/5 rounded-xl border border-white/10 p-5">
                  <h3 className="text-sm font-bold text-white mb-4">Geography</h3>
                  {stats.geoDist.slice(0, 10).map(([g, c]) => (
                    <div key={g} className="flex items-center gap-2 mb-2">
                      <span className="text-sm">{GEO_FLAGS[g] || "🌍"}</span>
                      <span className="text-xs text-gray-300 flex-1">{g}</span>
                      <div className="h-1.5 bg-green-500 rounded-full" style={{ width: `${(c / (stats.geoDist[0]?.[1] || 1)) * 60}px` }} />
                      <span className="text-xs font-bold text-gray-500 w-5 text-right">{c}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/5 rounded-xl border border-white/10 p-5">
                <h3 className="text-sm font-bold text-white mb-4">🏆 Top 10 Most Funded</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead><tr className="border-b border-white/10">
                      {["#","Company","Sector","HQ","Funding","Stage"].map(h => (
                        <th key={h} className="text-left px-2 py-2 text-gray-500 font-semibold">{h}</th>
                      ))}
                    </tr></thead>
                    <tbody>
                      {stats.topFunded.map((c, i) => (
                        <tr key={c.name} className="border-b border-white/5 last:border-0">
                          <td className="px-2 py-2 text-gray-500 font-bold">{i + 1}</td>
                          <td className="px-2 py-2 font-bold text-white">{c.name}</td>
                          <td className="px-2 py-2 text-gray-400">{MI_SECTOR_MAP[c.sector] || c.sector}</td>
                          <td className="px-2 py-2 text-gray-400">{c.hq}</td>
                          <td className="px-2 py-2 font-bold text-green-400">{c.funding}</td>
                          <td className="px-2 py-2"><span className="px-2 py-0.5 rounded-full bg-white/10 text-gray-400">{c.stage}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* DIRECTORY */}
          {ciTab === "directory" && (
            <div>
              <div className="flex flex-wrap gap-2 mb-4 items-center">
                <div className="flex-1 min-w-48 relative">
                  <input
                    type="text"
                    placeholder="Search companies, sectors, locations..."
                    value={ciSearch}
                    onChange={e => setCiSearch(e.target.value)}
                    className="w-full pl-8 pr-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white placeholder-gray-500 focus:outline-none focus:border-green-500/50"
                  />
                  <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-500 text-sm">🔍</span>
                </div>
                <select
                  value={ciFilter}
                  onChange={e => setCiFilter(e.target.value)}
                  className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-gray-300 focus:outline-none cursor-pointer"
                >
                  <option value="all">All Sectors</option>
                  {Array.from(new Set(AGTECH_COMPANIES.map(c => c.sector))).sort().map(s => (
                    <option key={s} value={s}>{MI_SECTOR_MAP[s] || s}</option>
                  ))}
                </select>
                <select
                  value={ciSort}
                  onChange={e => setCiSort(e.target.value)}
                  className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-gray-300 focus:outline-none cursor-pointer"
                >
                  <option value="funding">Sort: Funding ↓</option>
                  <option value="name">Sort: Name A→Z</option>
                  <option value="sector">Sort: Sector</option>
                  <option value="geo">Sort: Geography</option>
                </select>
                <span className="text-xs text-gray-500">{filtered.length} of {AGTECH_COMPANIES.length}</span>
              </div>
              <div className="bg-white/5 rounded-xl border border-white/10 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead><tr className="bg-white/5 border-b border-white/10">
                      {["Company","Focus","Sector","HQ","Funding","Stage","Source","Est."].map(h => (
                        <th key={h} className="text-left px-3 py-2.5 text-gray-500 font-semibold whitespace-nowrap">{h}</th>
                      ))}
                    </tr></thead>
                    <tbody>
                      {filtered.map((c, i) => {
                        const clr = SECTOR_COLORS[c.sector] || "#6b7280";
                        return (
                          <tr key={`${c.name}-${i}`} className={`border-b border-white/5 last:border-0 ${i % 2 === 1 ? "bg-white/3" : ""}`}>
                            <td className="px-3 py-2.5 font-bold text-white whitespace-nowrap">{c.name}</td>
                            <td className="px-3 py-2.5 text-gray-400 max-w-48 overflow-hidden text-ellipsis whitespace-nowrap">{c.sub}</td>
                            <td className="px-3 py-2.5 whitespace-nowrap"><span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ background: clr + "20", color: clr }}>{c.sector}</span></td>
                            <td className="px-3 py-2.5 text-gray-400 whitespace-nowrap">{c.hq}</td>
                            <td className="px-3 py-2.5 font-bold text-green-400 whitespace-nowrap text-right">{c.funding}</td>
                            <td className="px-3 py-2.5 whitespace-nowrap"><span className="px-2 py-0.5 rounded-full bg-white/10 text-gray-400">{c.stage}</span></td>
                            <td className="px-3 py-2.5 text-gray-500 whitespace-nowrap">{c.list}</td>
                            <td className="px-3 py-2.5 text-gray-500 text-center">{c.yr || "—"}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* CANADIAN SPOTLIGHT */}
          {ciTab === "canadian" && (
            <div>
              {(() => {
                const ca = [...stats.canadian].sort((a, b) => parseFunding(b.funding) - parseFunding(a.funding));
                const caTotalFund = ca.reduce((s, c) => s + parseFunding(c.funding), 0);
                const caSectors = new Set(ca.map(c => c.sector));
                return (
                  <>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                      {[
                        { val: `🍁 ${ca.length}`, label: "Canadian Companies", color: "text-red-400" },
                        { val: `$${caTotalFund.toFixed(0)}M+`, label: "Combined Funding", color: "text-green-400" },
                        { val: caSectors.size, label: "Sectors Represented", color: "text-blue-400" },
                        { val: `${((ca.length / stats.total) * 100).toFixed(0)}%`, label: "of Total Tracked", color: "text-amber-400" },
                      ].map(item => (
                        <div key={item.label} className="bg-white/5 rounded-xl border border-white/10 p-4 text-center">
                          <div className={`text-2xl font-black mb-1 ${item.color}`}>{item.val}</div>
                          <div className="text-xs text-gray-500 uppercase tracking-wide">{item.label}</div>
                        </div>
                      ))}
                    </div>
                    <div className="bg-white/5 rounded-xl border border-white/10 p-5 mb-4">
                      <h3 className="text-sm font-bold text-white mb-4">Canadian AgTech Companies</h3>
                      {ca.map((c, i) => {
                        const clr = SECTOR_COLORS[c.sector] || "#6b7280";
                        return (
                          <div key={c.name} className={`flex items-center gap-3 py-3 ${i < ca.length - 1 ? "border-b border-white/5" : ""}`}>
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm flex-shrink-0" style={{ background: clr + "20" }}>🍁</div>
                            <div className="flex-1 min-w-0">
                              <div className="text-sm font-bold text-white">{c.name}</div>
                              <div className="text-xs text-gray-400">{c.sub}</div>
                            </div>
                            <span className="text-xs px-2 py-0.5 rounded-full font-semibold flex-shrink-0" style={{ background: clr + "20", color: clr }}>{c.sector}</span>
                            <div className="text-right flex-shrink-0">
                              <div className="text-sm font-bold text-green-400">{c.funding}</div>
                              <div className="text-xs text-gray-500">{c.stage}</div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4">
                      <p className="text-xs text-gray-300 leading-relaxed">
                        <strong className="text-green-400">Why this matters:</strong> Canada&apos;s AgTech ecosystem punches above its weight with strong representation in animal tech (feed monitoring, dairy logistics, methane reduction), crop protection, and farm robotics. Key hubs include Ontario, British Columbia, and the Prairies — and many Canadian companies appear on multiple international accelerator lists, signaling strong global traction.
                      </p>
                    </div>
                  </>
                );
              })()}
            </div>
          )}

          {/* SOURCES */}
          {ciTab === "sources" && (
            <div>
              <div className="bg-white/5 rounded-xl border border-white/10 p-5 mb-4">
                <h3 className="text-sm font-bold text-white mb-2">Data Sources & Methodology</h3>
                <p className="text-xs text-gray-400 leading-relaxed mb-5">Company data is aggregated from leading accelerator cohort lists, VC portfolios, and industry trackers. Funding figures are approximations based on publicly reported rounds. Multi-source companies appear once with all source lists noted.</p>
                {[
                  { name:"THRIVE Top 50 AgTech 2024", count: AGTECH_COMPANIES.filter(c=>c.list.includes("THRIVE 2024")).length, desc:"Annual selection of the most innovative AgTech companies globally. Categories: CEA, Animal Tech, On-Farm AI/Robotics, Novel Crop Inputs, Agribusiness Platforms." },
                  { name:"THRIVE Top 50 AgTech 2026", count: AGTECH_COMPANIES.filter(c=>c.list.includes("THRIVE 2026")).length, desc:"Confirmed 2026 cohort entries from THRIVE news coverage and partner announcements. Includes returning companies and new entrants." },
                  { name:"Notable Funded 2025–2026", count: AGTECH_COMPANIES.filter(c=>c.list.includes("Notable")).length, desc:"Companies with significant funding rounds in 2025–2026, sourced from AgFunder, PitchBook, and industry press." },
                  { name:"Yield Lab Portfolio", count: AGTECH_COMPANIES.filter(c=>c.list.includes("Yield Lab")).length, desc:"Selected companies from Yield Lab Group portfolio — a leading AgTech VC with funds in St. Louis, Ireland, Singapore, and LATAM." },
                ].map(s => (
                  <div key={s.name} className="border border-white/10 rounded-xl p-4 mb-3">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-xs font-bold text-white">{s.name}</h4>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/15 text-green-400 border border-green-500/20 font-semibold">{s.count} companies</span>
                    </div>
                    <p className="text-xs text-gray-400 leading-relaxed">{s.desc}</p>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                <strong>Update cadence:</strong> Company data refreshed quarterly. Last updated April 2026. Funding figures are approximate — private company rounds may be undisclosed.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
