# North Star — Founder Ops Center

**Living document.** Last updated 2026-04-20. Both Cowork-side Claude and Claude Code reference this before proposing features, priorities, or scope. Russell redlines when the picture changes. Supersedes any ad-hoc "what is this platform" framing in prior session notes.

---

## What this is, in one sentence

A curated matching + operating platform for AgTech founders and the accelerators, investors, and mentors who want to engage with them at the right moment — **not** a comprehensive directory, **not** a lead-gen funnel, **not** a startup community for everyone.

## Why it exists (the core bet)

Warm intros don't scale; cold spam wastes everyone's time. The original product DNA is **quality intros**: gatekeep access between AgTech founders and investors until the founder has progressed to a stage the investor actually wants to engage at. Everything on the platform exists to make that matching sharper, the context richer, and the relationships more trackable. Helping both sides.

## Primary customer (pays)

**Investor-style accelerators and programs in AgTech.** Small N — dozens, not thousands — each with a brand, a cohort, and a founder ecosystem to manage. They pay for branded Ecosystem Workspaces that replace Airtable, spreadsheets, and scattered tools. First targeted prospects: Startup TNT's network (via Jesse Wieb), and AIVA as Russell's own internal proof case.

**NOT primary (for now):**
- Pure ecosystem managers without investment budgets (small checks, slow sales cycles).
- Investor funds subscribing to market intel (too much competition from Pitchbook/AgFunder/CB Insights, longer sales cycle, Phase 2 work).
- Individual founders (they're audience, not customers — see below).

## Primary audience (the value inventory)

**AgTech founders, globally.** They don't pay; they're why investors and accelerators show up. Platform needs to feel polished enough that accelerators bring their cohorts here confidently. The founder experience MUST feel professional — AIVA's current hesitation to use the platform is the most important signal we have about where the polish bar actually sits.

## Revenue model (2026)

- **First paid contract:** an investor-style AgTech accelerator pays for Ecosystem Workspace SaaS. Target: before end of 2026.
- **Phase 2 (2027):** investor intel / dealflow subscriptions, if founder inventory + intro quality justify the pitch.
- **Never (or far later):** charging individual founders for basic access. Breaks the inventory model — founders are why investors and accelerators show up.

## Geographic strategy

**Global content, Canada + US outbound.** The platform accepts anyone who arrives. Russell's active recruiting effort — the handful of first paying customers he personally chases — stays in his warmest networks: Canadian AgTech via Startup TNT + AIVA, plus US AgTech adjacency. No multi-region sales motion until there's someone to hand that off to.

## Unfair advantage (what a copycat can't replicate in 6 months)

1. **Canadian AgTech network + specific relationships** — Jesse Wieb at Startup TNT, the AIVA ecosystem, and the broader AgTech operator community Russell has touched. Takes years to build from scratch.
2. **AIVA ecosystem-manager credibility** — Russell is the user he's selling to. His pitch lands differently because he's felt the pain.
3. **Solo-operator shipping speed** — changes ship in a day. A venture-funded competitor with 10 engineers is actually slower.

## Core product pillars (what the platform MUST do well)

1. **Ecosystem Workspace** — branded, functional enough that an accelerator runs their cohort on it instead of Airtable or spreadsheets. Highest stakes right now; AIVA adoption is the bar.
2. **Quality intro matching** — the original concept. Founders matched to investors only when ready. Badges / progress signals / criteria that gate introductions. This is the durable differentiator; needs a feature audit to confirm it's actually built.
3. **Curated reference hub** — market intel, investor directory, mentors directory. Russell-branded quality, not scraped quantity. Acts as the public calling card founders arrive through.
4. **Founder profile + progress tracking** — so matching has real signal, and investors trust what they're seeing before accepting an intro.

## What the platform will NOT try to be

- A Pitchbook / AgFunder / CB Insights competitor on data breadth. Lose that fight instantly.
- A general-purpose startup community (not AgTech-specific = not defensible).
- A paid founder product.
- Built for anonymous-signup volume. Quality over quantity is the filter, even if it looks slower from the outside.

## Launch sequence

- **Phase 0 (now → ~4 weeks):** Polish pass on the ecosystem-manager experience until Russell would show it to an external operator without apologizing. Russell may dogfood it on his own AIVA-style work as a QA tool, but formal AIVA org adoption is not a gate. Every bug found fast, fixed fast. No public launch pressure.
- **Phase 1 (~4-8 weeks):** Public-facing polished market intel hub + curated AgTech investor directory + mentors directory ship under Russell's brand. First soft outbound to Jesse / Startup TNT's network. Founders start arriving organically.
- **Phase 2 (~8-16 weeks):** First investor-style accelerator signs a paid Workspace contract. Case study goes public. Platform-as-product story is real.

## Success metrics

- **Phase 0 done:** Russell would show the platform to Jesse / an external ecosystem operator without apologizing. Zero blocker bugs for `ecosystem_manager` persona. Optional accelerator: Russell uses the platform for some piece of his own AIVA work to surface bugs faster (dogfooding is a tool, not a milestone).
- **Phase 1 done:** 50+ active AgTech founder accounts; outbound validation from Jesse + 2-3 other ecosystem operators; platform has been linked / shared publicly without embarrassment.
- **Phase 2 done:** First paid Workspace contract signed (any dollar value). 200+ founder accounts. Intro-matching engine demonstrably firing for at least 10 founder ↔ investor pairs.

## Current tensions to manage

- **The "would I use this for AIVA work?" gut check.** Russell can dogfood the platform on AIVA-style ecosystem-manager workflows whenever he wants — that's a useful internal QA loop, and it's available on demand. But formal AIVA-as-org adoption is NOT a required milestone. The actual polish bar is whether Russell would show the platform to Jesse / an external ecosystem operator without apologizing. Dogfooding is one tactic for hitting that bar, not the bar itself.
- **Side-build constraints.** One geography at a time for outbound. One revenue source at a time. One design partner (AIVA) at a time. Ruthless scoping is not optional — it's how this ships at all.
- **Quality vs. coverage tension.** Curated lists (investors, mentors, intel) stay small and signed. Adding rows to look comprehensive actively damages the brand and undoes the differentiator.
- **Matching-engine verification pending.** The "quality intros" concept is the core bet, but we haven't confirmed how much of it is actually built (badges, progress gating, intro-trigger logic). Next step: audit the codebase against this pillar and surface what exists vs. what's planned vs. what's missing.

## How this doc gets used

- **Cowork-side Claude:** re-reads this at the start of every session before proposing work. Flags proposals that don't serve a pillar, or that conflict with a tension.
- **Claude Code:** re-reads this before suggesting new features or larger refactors. Uses the pillars as a prioritization filter when the queue has too many options.
- **Russell:** redlines when the picture changes. When something on the platform feels off, compare it against this doc before deciding if it's a bug or a scope question.
- **Next step after this doc lands:** feature audit — walk the platform's current surfaces against each pillar, score them, produce a concrete kill / sharpen / build list.
