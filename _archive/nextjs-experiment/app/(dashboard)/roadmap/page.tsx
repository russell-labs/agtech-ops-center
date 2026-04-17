"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { supabase } from "@/lib/supabase";
import { Lock } from "lucide-react";

const ADMIN_EMAIL = "russellcolevop@gmail.com";

interface FeatureCard {
  icon: string;
  title: string;
  desc: string;
}

const SHIPPED: FeatureCard[] = [
  { icon: "🎯", title: "Persona-Specific Milestone Journeys", desc: "8 persona types each with 12 unique milestones tracking their real journey. Founders progress from incorporation through PMF to scaling. Investors track from fund affiliation through lead deals to ecosystem champion." },
  { icon: "📝", title: "Badge Claim with Evidence Collection", desc: "Users claim milestones by submitting structured evidence — not self-declaration. Each badge has specific evidence prompts. A founder claiming 'First Revenue' describes their revenue model and timeline. This evidence creates the richest participant dataset in AgTech." },
  { icon: "🏅", title: "Tier System (Explorer → Leader)", desc: "Four-tier progression: Explorer (0+), Builder (3+), Operator (6+), Leader (9+). Tiers reflect verified engagement, not vanity metrics. A Leader-tier investor has proven portfolio activity and can filter to only connect with Operator+ founders." },
  { icon: "🔄", title: "Monthly Check-In System", desc: "Users prompted monthly to confirm their profile is current and claim new milestones. Color-coded urgency keeps the ecosystem fresh. Stale profiles lose visibility. 'Nothing changed' fast-path respects busy users while still recording engagement." },
  { icon: "📜", title: "Terms & Consent Flow", desc: "Onboarding includes persona-specific terms with clear value propositions. Users consent to structured data collection, understanding that their milestone evidence contributes to ecosystem intelligence. Timestamped consent for compliance." },
  { icon: "📊", title: "Ecosystem Quality Metrics (Admin)", desc: "Admin dashboard shows real-time ecosystem health: tier distribution, check-in rates, milestone velocity, engagement quality scores, and per-persona pool depth. Data-driven ecosystem management instead of guesswork." },
  { icon: "🤝", title: "Tier-Gated Introduction System", desc: "Users discover AI-scored matches filtered by tier level. Request introductions through the platform, track progress via a visual pipeline (Suggested → Introduced → Outcome → Connected), and report outcomes with star ratings. Non-reporters get intro privileges paused." },
  { icon: "🔒", title: "Connection Discovery with Tier Gating", desc: "Users see blurred previews of connections they can't yet access, with clear messaging on how many badges they need to unlock them. Every locked connection is a reason to claim another milestone and level up." },
  { icon: "🏗️", title: "Ecosystem Manager Workspaces", desc: "Full CRM workspaces for accelerators, incubators, regional hubs. Private startup pipeline with Kanban stages (Lead → Engaged → Active → Alumni → Exited). Relationship notes, tag management, and interaction logging per startup. Replaces Airtable and spreadsheet workflows." },
  { icon: "🔍", title: "Platform-Wide Startup Directory", desc: "Ecosystem managers can browse all platform members directly from their workspace. One-click 'Add to Pipeline' or bulk 'Add All' to instantly populate their startup pipeline with real, verified founders. No manual data entry — the ecosystem feeds itself." },
  { icon: "🤝", title: "Partner Ecosystem Network", desc: "Curated partner ecosystem directory with claim-and-verify flow for managers. Founders browse and apply to programs. Ecosystem managers claim their organization with invite-code verification and admin approval." },
  { icon: "🚀", title: "Venture Studio & Idea Pipeline", desc: "5-step idea submission wizard collecting startup name, pitch, sector, market analysis, team info, goals, and needs. Admin dashboard shows all submissions with status management (New → Under Review → Approved → Declined). The front door for AgTech innovation." },
  { icon: "🛡️", title: "Auto-Suspend & Profile Integrity", desc: "Incomplete profiles auto-suspended after 48 hours with clear messaging. Blocked users see their specific reason and can complete their profile to regain access. Keeps the ecosystem clean of ghost accounts and abandoned signups." },
  { icon: "📊", title: "Admin Deal Manager", desc: "Full deal tracking system for the admin investor dashboard. Add, edit, and delete deals with company, amount, round, sector, region, and lead investor. Powers the Investor Dashboard with live, curated AgTech deal flow data." },
];

const PHASE1: FeatureCard[] = [
  { icon: "🔄", title: "Cross-Ecosystem Pipeline Sharing", desc: "Opt-in pipeline sharing between partner ecosystems. See when a startup is tracked by multiple organizations — coordinate instead of competing. Build the network effect across partner ecosystems." },
  { icon: "🚀", title: "Venture Studio Pipeline Deepening", desc: "Admin review queue with Startup Kit generation for selected startups (landing page, 1-pager, business plan). Mentor matching for accepted ideas. Progress tracking from idea → validated → funded. Full venture builder pipeline." },
  { icon: "💬", title: "Community Hub & Engagement", desc: "Discussion forums, founder AMAs, weekly digests, and event coordination. Give founders a reason to come back daily. Organic connections and knowledge sharing alongside the structured matching engine." },
  { icon: "👥", title: "Talent & Co-Founder Matching", desc: "AgTech startups struggle to find specialized talent. Extend the matching engine to connect founders with technical co-founders, advisors, and hires based on verified expertise and milestone stage." },
];

function FeatureGrid({ items }: { items: FeatureCard[] }) {
  return (
    <div className="grid md:grid-cols-2 gap-3 mt-4">
      {items.map(f => (
        <div key={f.title} className="p-4 bg-gray-50 border border-gray-200 rounded-xl">
          <div className="font-bold text-sm text-gray-900 mb-1">{f.icon} {f.title}</div>
          <div className="text-xs text-gray-600 leading-relaxed">{f.desc}</div>
        </div>
      ))}
    </div>
  );
}

function PhaseCard({ status, color, borderColor, badgeBg, badgeText, icon, title, subtitle, desc, children }: {
  status: string; color: string; borderColor: string; badgeBg: string; badgeText: string;
  icon: string; title: string; subtitle?: string; desc: string; children?: React.ReactNode;
}) {
  return (
    <div className={`bg-white border border-gray-200 rounded-xl p-6 border-l-4 ${borderColor}`}>
      <div className="flex items-center gap-3 mb-3">
        <span className="text-2xl">{icon}</span>
        <div>
          <h2 className="font-bold text-gray-900">{title}</h2>
          {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
        </div>
      </div>
      <span className={`inline-block text-xs font-bold px-2.5 py-1 rounded-full mb-3 ${badgeBg} ${badgeText}`}>{status}</span>
      <p className="text-sm text-gray-600 leading-relaxed">{desc}</p>
      {children}
    </div>
  );
}

export default function RoadmapPage() {
  const { data: session, status } = useSession();
  const [hasAccess, setHasAccess] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "loading") return;
    if (!session?.user?.email) { setLoading(false); return; }
    if (session.user.email === ADMIN_EMAIL) { setHasAccess(true); setLoading(false); return; }

    supabase
      .from("profiles")
      .select("admin_tags")
      .eq("email", session.user.email)
      .single()
      .then(({ data }) => {
        if (data?.admin_tags && Array.isArray(data.admin_tags) && data.admin_tags.includes("roadmap_access")) {
          setHasAccess(true);
        }
        setLoading(false);
      });
  }, [session, status]);

  if (loading) {
    return <div className="flex items-center justify-center h-64 text-gray-400">Loading...</div>;
  }

  if (!session?.user) {
    return (
      <div className="max-w-md mx-auto mt-20 text-center">
        <Lock className="w-10 h-10 text-gray-300 mx-auto mb-4" />
        <h2 className="text-lg font-bold text-gray-900 mb-2">Sign in required</h2>
        <p className="text-sm text-gray-500">Sign in to view the product roadmap.</p>
      </div>
    );
  }

  if (!hasAccess) {
    return (
      <div className="max-w-md mx-auto mt-20 text-center">
        <Lock className="w-10 h-10 text-gray-300 mx-auto mb-4" />
        <h2 className="text-lg font-bold text-gray-900 mb-2">Roadmap access required</h2>
        <p className="text-sm text-gray-500 mb-4">This page is shared selectively. Ask Russell for access.</p>
        <a href="/book-a-call" className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold rounded-lg transition-colors">
          Book a Call with Russell
        </a>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">🗺️ Product Roadmap</h1>
        <p className="text-gray-500 mt-1">Strategic feature initiatives for FounderOps Center. Confidential — admin-only unless shared.</p>
      </div>

      {/* Shipped */}
      <PhaseCard
        status="✅ Live"
        color="green"
        borderColor="border-l-green-500"
        badgeBg="bg-green-100"
        badgeText="text-green-700"
        icon="✅"
        title="Shipped — Ecosystem Intelligence Foundation"
        desc="The core platform is live with verified profiles, persona-specific milestone journeys, structured evidence collection, engagement tracking, and a full tier-gated introduction system with outcome accountability. Every feature below is built and deployed."
      >
        <FeatureGrid items={SHIPPED} />
        <div className="mt-5 pt-4 border-t border-gray-100">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Why This Matters</h3>
          <div className="text-xs text-gray-600 leading-relaxed space-y-2">
            <p><strong>The data moat:</strong> Every milestone claimed with evidence creates proprietary intelligence no other platform has. Every introduction tracked with outcome reports adds connection intelligence. After 100 founders progress through milestones and 50 introductions are completed, the platform knows which stages are hardest, which matches convert, and where capital is needed most.</p>
            <p><strong>Self-maintaining quality:</strong> Monthly check-ins + tier gating + intro accountability means the ecosystem stays fresh without manual curation. Stale profiles fade, active participants rise. Users who don&apos;t report outcomes lose intro access. Investors see only verified, engaged founders.</p>
            <p><strong>Network effects:</strong> Each new participant increases the value for everyone else. A founder&apos;s milestone evidence helps investors assess deal quality. An investor&apos;s portfolio data helps founders target the right capital. Every completed introduction makes the matching algorithm smarter.</p>
          </div>
        </div>
      </PhaseCard>

      {/* Phase 1 */}
      <PhaseCard
        status="🏗️ In Progress"
        color="amber"
        borderColor="border-l-amber-400"
        badgeBg="bg-amber-100"
        badgeText="text-amber-700"
        icon="🏗️"
        title="Phase 1 — Community Growth & Cross-Ecosystem Intelligence"
        desc="Ecosystem CRM workspaces are live. The next focus is scaling the community: deeper Venture Studio pipeline management, cross-ecosystem data sharing between partner organizations, community hub engagement features, and the talent matching layer that connects AgTech professionals with startups that need them."
      >
        <FeatureGrid items={PHASE1} />
      </PhaseCard>

      {/* Phase 2 */}
      <PhaseCard
        status="🔮 Future"
        color="blue"
        borderColor="border-l-blue-300"
        badgeBg="bg-blue-100"
        badgeText="text-blue-700"
        icon="🔮"
        title="Phase 2 — Intelligence Layer"
        desc="Aggregate milestone evidence and engagement data across the network to surface sector-wide trends, emerging startups, funding gaps, and collaboration opportunities. Introduce smart matching — connecting founders to the right investors based on verified stage, sector, and check size fit. This is where FounderOps Center becomes the Bloomberg Terminal for AgTech."
      />

      {/* Phase 3 */}
      <PhaseCard
        status="💰 Long-term"
        color="purple"
        borderColor="border-l-purple-300"
        badgeBg="bg-purple-100"
        badgeText="text-purple-700"
        icon="💰"
        title="Phase 3 — Revenue Model"
        desc="Free tier: ecosystem profiles with milestone tracking (current features). Pro tier: CRM workspace for ecosystem managers. Premium investor access: verified deal flow, filtered by tier and milestone stage. Fund: thesis-driven investments powered by proprietary deal flow and milestone intelligence from the entire network."
      />

      {/* Phase 4 */}
      <PhaseCard
        status="👥 Future Opportunity"
        color="purple"
        borderColor="border-l-purple-300"
        badgeBg="bg-purple-100"
        badgeText="text-purple-700"
        icon="👥"
        title="Phase 4 — Talent & Employment"
        desc="AgTech startups struggle to find specialized talent. The platform already has verified, tiered professionals across every persona. Extend the matching engine to talent: job board, talent matching based on verified expertise, and ecosystem-wide talent supply/demand data. Monetizes through listing fees and recruiting commissions."
      />
    </div>
  );
}
