"use client";

import { useSession, signIn } from "next-auth/react";
import Link from "next/link";
import { ExternalLink, Leaf } from "lucide-react";

const PERSONAS = [
  {
    emoji: "🚀",
    title: "For Founders",
    sub: "Founder Ops Center",
    desc: "Stop searching and start building. Market intelligence, curated connections, and a clear path to the right investors and pilot partners. All in one place.",
    features: ["AI-matched investor intros", "17 accelerators and pitch competitions", "Farmer pilot partner network", "Milestone tracking that proves your traction"],
    benefits: [
      { icon: "📊", label: "Market Intelligence", detail: "Sector data, crop markets, investment trends" },
      { icon: "🤝", label: "Smart Connections", detail: "AI scores your match with every investor and advisor" },
      { icon: "🎯", label: "Action Center", detail: "Personalized next steps, deadlines, and opportunities" },
      { icon: "🌐", label: "Community Hub", detail: "81 mentors, 12 communities, podcasts, and events" },
    ],
  },
  {
    emoji: "💰",
    title: "For Investors",
    sub: "Investor Ops Center",
    desc: "Pre-qualified deal flow with milestone-verified founder profiles. See who's building, what traction they have, and get warm introductions to the highest-potential AgTech startups.",
    features: ["Investor Dashboard with funding data and sector heatmaps", "Founder profiles verified by real milestone evidence", "AI-matched warm introductions", "Market landscape and ecosystem mapping"],
    benefits: [
      { icon: "📈", label: "Investor Dashboard", detail: "$16B+ market data, deal flow, sector trends" },
      { icon: "🔥", label: "Sector Heatmap", detail: "See what's hot, what's cooling, where money flows" },
      { icon: "🤝", label: "Verified Founders", detail: "Milestone-tracked profiles with real traction data" },
      { icon: "🗺️", label: "Ecosystem Map", detail: "VCs, accelerators, and programs in one view" },
    ],
  },
  {
    emoji: "🌾",
    title: "For Farmers",
    sub: "Farmer Ops Center",
    desc: "You're the reason AgTech exists. Get early access to innovations built for your operation, connect directly with the startups building them, and have a real voice shaping the products of tomorrow.",
    features: ["Early access to new AgTech products", "Pilot partnerships with funded startups", "Direct line to founders building for your crops", "No jargon, just tools that work"],
    benefits: [
      { icon: "🧪", label: "Pilot Programs", detail: "Try new tech before anyone else, often free or subsidized" },
      { icon: "🌱", label: "Crop Intelligence", detail: "Market data for the crops you actually grow" },
      { icon: "🗣️", label: "Your Voice Matters", detail: "Shape the products startups are building for you" },
      { icon: "🤝", label: "Direct Connections", detail: "Talk to founders, not sales reps" },
    ],
  },
  {
    emoji: "🧭",
    title: "For Advisors & Mentors",
    sub: "Advisor Ops Center",
    desc: "Your expertise is the multiplier. Connect with founders who match your domain, track your impact, and build your reputation as a trusted voice in the AgTech ecosystem.",
    features: ["Matched with founders who need your expertise", "Milestone recognition system", "81-mentor community from Walt Duflock's network", "Ecosystem-wide visibility for your contributions"],
    benefits: [
      { icon: "🎯", label: "Smart Matching", detail: "AI pairs you with founders who need your skills" },
      { icon: "🏅", label: "Recognition", detail: "Earn milestone badges as you mentor and connect" },
      { icon: "🌐", label: "Mentor Network", detail: "Join 81 mentors already in the community" },
      { icon: "📊", label: "Ecosystem View", detail: "See the full landscape of who's building what" },
    ],
  },
];

const PLATFORM_FEATURES = [
  { icon: "📊", bg: "bg-green-50", title: "Market Intelligence", desc: "Investment trends, sector heatmaps, crop data, and ecosystem mapping. Know where the money is flowing before everyone else." },
  { icon: "🤝", bg: "bg-blue-50", title: "AI-Powered Connections", desc: "Every profile is scored against every other. See match percentages, match reasons, and request warm introductions facilitated by a real human." },
  { icon: "🎯", bg: "bg-amber-50", title: "Personalized Dashboard", desc: "The platform adapts to who you are. Founders see fundraising tools. Investors see deal flow. Farmers see pilot programs. One platform, tailored to you." },
  { icon: "🏆", bg: "bg-emerald-50", title: "Milestone Progression", desc: "Earn badges, climb tiers, and unlock higher-value connections as you contribute to the ecosystem. Your engagement is your reputation." },
];

export default function LandingPage() {
  const { data: session } = useSession();
  const isSignedIn = !!session?.user;

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-white/5 sticky top-0 bg-slate-950/95 backdrop-blur-sm z-50">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center">
            <Leaf className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-white">Founder Ops Center</span>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/overview" className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors">
            Explore as Guest
          </Link>
          {isSignedIn ? (
            <Link href="/overview" className="px-4 py-2 bg-brand-600 hover:bg-brand-500 text-white text-sm font-semibold rounded-lg transition-colors">
              Go to Dashboard →
            </Link>
          ) : (
            <button
              onClick={() => signIn()}
              className="px-4 py-2 bg-brand-600 hover:bg-brand-500 text-white text-sm font-semibold rounded-lg transition-colors"
            >
              Sign In
            </button>
          )}
        </div>
      </nav>

      {/* Hero */}
      <div className="max-w-4xl mx-auto px-6 pt-20 pb-16 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-900/40 border border-brand-700/40 rounded-full text-xs text-brand-400 font-medium mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-500 inline-block"></span>
          Free to use · 8 regions worldwide
        </div>
        <h1 className="text-5xl sm:text-6xl font-black leading-tight mb-6">
          The operating system for<br />
          <span className="text-brand-500">AgTech ecosystems</span>
        </h1>
        <p className="text-xl text-gray-400 leading-relaxed mb-10 max-w-2xl mx-auto">
          Founders build better companies when they&apos;re connected to the right investors, advisors, and farmers. We make that happen with market intelligence, AI-powered matching, and a trusted network that grows stronger with every connection.
        </p>
        <div className="flex items-center justify-center gap-4 flex-wrap mb-6">
          {isSignedIn ? (
            <Link href="/overview" className="px-8 py-4 bg-brand-600 hover:bg-brand-500 text-white text-lg font-bold rounded-xl transition-colors shadow-lg shadow-brand-900/40">
              Go to Dashboard →
            </Link>
          ) : (
            <>
              <button
                onClick={() => signIn()}
                className="px-8 py-4 bg-brand-600 hover:bg-brand-500 text-white text-lg font-bold rounded-xl transition-colors shadow-lg shadow-brand-900/40"
              >
                Join Free →
              </button>
              <Link href="/overview" className="px-8 py-4 border border-white/20 hover:border-white/40 text-white text-lg font-semibold rounded-xl transition-colors">
                Browse the Platform
              </Link>
            </>
          )}
        </div>
        <p className="text-sm text-gray-600">Free to join · Google sign-in · No credit card required</p>

        {/* Idea CTA */}
        <div className="mt-12 p-7 bg-white/5 border border-brand-700/30 rounded-2xl max-w-lg mx-auto text-left">
          <div className="text-3xl mb-3">💡</div>
          <h3 className="text-lg font-bold text-white mb-2">Got an idea for an AgTech innovation?</h3>
          <p className="text-sm text-gray-400 leading-relaxed mb-4">
            You don&apos;t need a company to start. Share your idea and we&apos;ll help you figure out the next step — whether that&apos;s finding a co-founder, joining our venture studio, or just getting feedback.
          </p>
          <Link href="/venture" className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-600 hover:bg-brand-500 text-white text-sm font-bold rounded-lg transition-colors">
            Share Your Idea →
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="border-y border-white/5 bg-white/[0.02] py-10">
        <div className="max-w-3xl mx-auto px-6 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {[
            { val: "81", lbl: "Expert mentors" },
            { val: "17", lbl: "Accelerators & programs" },
            { val: "100+", lbl: "VC & funding sources" },
            { val: "8", lbl: "Persona-tailored views" },
          ].map(s => (
            <div key={s.lbl}>
              <div className="text-3xl font-black text-brand-400">{s.val}</div>
              <div className="text-xs text-gray-500 mt-1">{s.lbl}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Persona section */}
      <div className="max-w-5xl mx-auto px-6 py-20">
        <p className="text-center text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">Built for every role in AgTech</p>
        <div className="grid sm:grid-cols-2 gap-5">
          {PERSONAS.map(p => (
            <div key={p.title} className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 hover:border-brand-700/40 transition-colors">
              <div className="text-3xl mb-3">{p.emoji}</div>
              <h3 className="text-lg font-bold text-white mb-1">{p.title}</h3>
              <p className="text-xs text-brand-400 font-semibold mb-3">{p.sub}</p>
              <p className="text-sm text-gray-400 leading-relaxed mb-4">{p.desc}</p>
              <div className="space-y-1 mb-4">
                {p.features.map(f => (
                  <div key={f} className="flex items-start gap-2 text-xs text-gray-400">
                    <span className="text-brand-500 mt-0.5 flex-shrink-0">✓</span>
                    {f}
                  </div>
                ))}
              </div>
              <div className="border-t border-white/5 pt-4 grid grid-cols-2 gap-2">
                {p.benefits.map(b => (
                  <div key={b.label} className="flex items-start gap-2">
                    <span className="text-lg flex-shrink-0">{b.icon}</span>
                    <div>
                      <p className="text-xs font-bold text-white leading-tight">{b.label}</p>
                      <p className="text-xs text-gray-500 leading-tight">{b.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Platform features */}
      <div className="bg-white/[0.02] border-y border-white/5 py-20">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-center text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">Platform Highlights</p>
          <div className="grid sm:grid-cols-2 gap-5">
            {PLATFORM_FEATURES.map(f => (
              <div key={f.title} className="bg-white/[0.03] border border-white/10 rounded-xl p-5">
                <div className="text-2xl mb-3">{f.icon}</div>
                <h3 className="font-bold text-white mb-2">{f.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Russell's story */}
      <div className="max-w-3xl mx-auto px-6 py-20">
        <p className="text-center text-xs font-bold uppercase tracking-widest text-gray-500 mb-8">Why this exists</p>
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-14 h-14 rounded-full bg-brand-700 flex items-center justify-center text-white text-xl font-bold flex-shrink-0">R</div>
            <div>
              <p className="font-bold text-white">Russell Cole</p>
              <p className="text-sm text-gray-400">Founder &amp; Connector-in-Chief</p>
              <a href="https://www.linkedin.com/in/russellcole/" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 mt-2 text-xs text-brand-400 font-semibold border border-brand-700/40 rounded-md px-3 py-1 hover:text-brand-300 transition-colors">
                LinkedIn <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
          <blockquote className="text-sm text-gray-300 leading-relaxed mb-4">
            &ldquo;I&apos;ve spent 8+ years building AgTech companies. Soil amendments, drone and satellite imaging, AI tools that help farmers get more from their data. I pitched investors, ran feedback loops with growers, built teams, handled the business admin, and lived through the highs and lows that every AgTech founder knows. Through all of it, the thing I kept coming back to was connecting people. Introducing a founder to the right investor. Getting a farmer on a call with a startup that could actually solve their problem.&rdquo;
          </blockquote>
          <blockquote className="text-sm text-gray-300 leading-relaxed mb-6">
            &ldquo;If I&apos;d had something like this platform when I was in the thick of it, I would have been way better off. Now I have the ability to build it, so that&apos;s exactly what I&apos;m doing. People are at the heart of everything and I can&apos;t wait to see where this goes.&rdquo;
          </blockquote>
          <div className="flex flex-wrap gap-2">
            {["8+ Years in AgTech", "Soil Amendments", "Drone & Satellite Imaging", "AI for Farmers", "Ecosystem Connector"].map(c => (
              <span key={c} className="text-xs px-2.5 py-1 bg-brand-900/40 border border-brand-700/30 text-brand-400 rounded-full">{c}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="text-center px-6 py-20 bg-gradient-to-b from-transparent to-brand-950/30">
        <h2 className="text-3xl font-black mb-4">The best AgTech networks aren&apos;t found.<br />They&apos;re built.</h2>
        <p className="text-gray-400 mb-8 max-w-md mx-auto">Join the founders, investors, farmers, and advisors who are building the future of agriculture together.</p>
        {isSignedIn ? (
          <Link href="/overview" className="inline-block px-10 py-4 bg-brand-600 hover:bg-brand-500 text-white text-lg font-bold rounded-xl transition-colors">
            Go to Dashboard →
          </Link>
        ) : (
          <button
            onClick={() => signIn()}
            className="px-10 py-4 bg-brand-600 hover:bg-brand-500 text-white text-lg font-bold rounded-xl transition-colors shadow-lg shadow-brand-900/50"
          >
            Get Started. It&apos;s Free. →
          </button>
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-white/5 px-6 py-6 text-center text-xs text-gray-600">
        Built by AgTech founders ·{" "}
        <a href="https://www.linkedin.com/company/founder-ops-center/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 transition-colors">
          LinkedIn
        </a>{" "}
        · © {new Date().getFullYear()} Founder Ops Center
      </div>
    </div>
  );
}
