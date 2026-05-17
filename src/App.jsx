import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowUpRight,
  BarChart3,
  CheckCircle2,
  ChevronRight,
  Database,
  ExternalLink,
  Gauge,
  GitBranch,
  LineChart,
  Moon,
  Rocket,
  ShieldCheck,
  Sparkles,
  Sun,
  Target,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react';

// visual-patch: variant-a-orange-v3
const repoLink = 'https://github.com/MrDawnOP/hotel-booking-ab-dashboard';
const portfolioLink = 'PASTE_YOUR_PORTFOLIO_LINK_HERE';

const navItems = [
  { label: 'Overview', href: '#overview' },
  { label: 'Variant Battle', href: '#variant-battle' },
  { label: 'Funnel', href: '#funnel' },
  { label: 'Methodology', href: '#methodology' },
  { label: 'Insights', href: '#insights' },
];

const heroMetrics = [
  {
    label: 'Sessions Analysed',
    value: '60,000+',
    detail: '21-day experiment',
    icon: Users,
  },
  {
    label: 'Funnel Events',
    value: '240k+',
    detail: 'Search to booking',
    icon: Database,
  },
  {
    label: 'Conversion Uplift',
    value: '+23.0%',
    detail: 'Variant B vs A',
    icon: TrendingUp,
  },
  {
    label: 'P-Value',
    value: '2.7e-9',
    detail: 'Statistically significant',
    icon: Target,
  },
];

const executiveCards = [
  {
    label: 'Winning Variant',
    value: 'Variant B',
    note: 'Simplified checkout journey wins.',
    accent: 'from-cyan-400 to-blue-500',
  },
  {
    label: 'Variant A CVR',
    value: '4.72%',
    note: 'Existing checkout journey.',
    accent: 'from-slate-400 to-slate-600',
  },
  {
    label: 'Variant B CVR',
    value: '5.81%',
    note: 'Improved checkout journey.',
    accent: 'from-cyan-400 to-emerald-400',
  },
  {
    label: 'Revenue / Visitor',
    value: '$25.62',
    note: 'Variant B revenue per visitor.',
    accent: 'from-blue-400 to-cyan-400',
  },
  {
    label: 'Incremental Revenue',
    value: '$302k',
    note: 'Estimated experiment uplift.',
    accent: 'from-emerald-400 to-cyan-400',
  },
  {
    label: 'Decision',
    value: 'Roll Out',
    note: 'Launch with guardrail monitoring.',
    accent: 'from-violet-400 to-cyan-400',
  },
];

const comparisonBars = [
  {
    label: 'Booking Conversion',
    variantA: 4.72,
    variantB: 5.81,
    suffix: '%',
    insight: '+1.09 percentage points',
  },
  {
    label: 'Revenue / Visitor',
    variantA: 20.59,
    variantB: 25.62,
    suffix: '$',
    insight: '+$5.03 per visitor',
  },
  {
    label: 'Payment Success Stage',
    variantA: 14.3,
    variantB: 18.9,
    suffix: '%',
    insight: '+4.6 percentage points',
  },
  {
    label: 'Checkout Started',
    variantA: 32.1,
    variantB: 36.8,
    suffix: '%',
    insight: '+4.7 percentage points',
  },
];

const funnel = [
  { stage: 'Search Started', a: 29786, b: 30214, aPct: 100.0, bPct: 100.0 },
  { stage: 'Search Results Viewed', a: 28367, b: 29012, aPct: 95.2, bPct: 96.0 },
  { stage: 'Hotel Viewed', a: 22724, b: 23769, aPct: 76.3, bPct: 78.7 },
  { stage: 'Room Selected', a: 15861, b: 17154, aPct: 53.2, bPct: 56.8 },
  { stage: 'Checkout Started', a: 9575, b: 11122, aPct: 32.1, bPct: 36.8 },
  { stage: 'Payment Started', a: 4744, b: 6109, aPct: 15.9, bPct: 20.2 },
  { stage: 'Payment Success', a: 4268, b: 5699, aPct: 14.3, bPct: 18.9 },
  { stage: 'Booking Completed', a: 1406, b: 1754, aPct: 4.7, bPct: 5.8 },
];

const timeline = [
  {
    step: '01',
    title: 'Hypothesis',
    text: 'A simplified checkout journey should reduce friction and improve booking completion.',
    icon: Sparkles,
  },
  {
    step: '02',
    title: 'Randomisation',
    text: 'Sessions were split between Variant A and Variant B across a 21-day test window.',
    icon: GitBranch,
  },
  {
    step: '03',
    title: 'Measurement',
    text: 'Tracked funnel progression, payment success, revenue per visitor and abandonment.',
    icon: Gauge,
  },
  {
    step: '04',
    title: 'Decision',
    text: 'Variant B delivered significant uplift and is recommended for gradual rollout.',
    icon: Rocket,
  },
];

const segmentCards = [
  { label: 'Mobile Users', uplift: '+0.86 pp', detail: '+18.6% uplift' },
  { label: 'Desktop Users', uplift: '+1.29 pp', detail: '+27.7% uplift' },
  { label: 'Tablet Users', uplift: '+1.11 pp', detail: '+22.6% uplift' },
  { label: 'New Customers', uplift: '+1.11 pp', detail: '+23.9% uplift' },
  { label: 'Returning Customers', uplift: '+1.06 pp', detail: '+22.1% uplift' },
  { label: 'Loyalty Members', uplift: '+1.26 pp', detail: '+27.7% uplift' },
];

const insights = [
  'Variant B increased final booking conversion from 4.72% to 5.81%.',
  'The redesigned checkout improved progression from checkout start to payment success.',
  'Revenue per visitor increased from $20.59 to $25.62.',
  'Loyalty members and returning customers are strong rollout segments.',
  'The rollout should monitor payment failures, cancellations and post-launch conversion stability.',
];

const tools = [
  'SQL',
  'Python',
  'Pandas',
  'React',
  'Vite',
  'Tailwind CSS',
  'A/B Testing',
  'Funnel Analysis',
  'Product Analytics',
  'Growth Analytics',
  'Revenue Analysis',
  'Statistical Testing',
];

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    const root = document.documentElement;

    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    localStorage.setItem('theme', theme);
  }, [theme]);

  const rolloutScore = useMemo(() => 96, []);

  return (
    <div className="min-h-screen overflow-x-hidden bg-slate-50 text-slate-950 transition-colors duration-300 dark:bg-slate-950 dark:text-white">
      <AnimatedStyles />

      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="orb absolute left-[-12rem] top-[-12rem] h-[36rem] w-[36rem] rounded-full bg-cyan-400/20 blur-3xl dark:bg-cyan-400/10" />
        <div className="orb-delay absolute right-[-14rem] top-[15rem] h-[38rem] w-[38rem] rounded-full bg-blue-500/20 blur-3xl dark:bg-blue-500/10" />
        <div className="pulse-glow absolute bottom-[-14rem] left-[30%] h-[32rem] w-[32rem] rounded-full bg-violet-500/10 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.10),transparent_32%),linear-gradient(to_bottom,transparent,rgba(15,23,42,0.05))]" />
      </div>

      <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-2xl dark:border-white/10 dark:bg-slate-950/80">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <a href="#home" className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-500/20">
              <BarChart3 size={20} />
            </span>
            <span>
              <span className="block text-sm font-black tracking-tight text-slate-950 dark:text-white">
                Booking Funnel
              </span>
              <span className="block text-xs font-bold text-slate-500 dark:text-slate-400">
                A/B Testing Dashboard
              </span>
            </span>
          </a>

          <div className="hidden items-center gap-7 text-sm font-bold text-slate-600 dark:text-slate-300 lg:flex">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="transition hover:text-cyan-700 dark:hover:text-cyan-200">
                {item.label}
              </a>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-black text-slate-900 transition hover:-translate-y-0.5 dark:border-white/10 dark:bg-white/[0.04] dark:text-white"
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            {theme === 'dark' ? 'Light' : 'Dark'}
          </button>
        </div>
      </nav>

      <main className="relative z-10">
        <Hero />

        <section id="overview" className="mx-auto max-w-7xl px-6 py-20">
          <SectionHeader
            eyebrow="Executive Summary"
            title="Variant B wins with stronger conversion and revenue."
            text="A simplified checkout journey outperformed the existing flow across booking conversion, payment progression and revenue per visitor."
          />

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {executiveCards.map((card) => (
              <ExecutiveCard key={card.label} {...card} />
            ))}
          </div>
        </section>

        <section id="variant-battle" className="mx-auto max-w-7xl px-6 py-20">
          <SectionHeader
            eyebrow="Variant Battle"
            title="A cleaner visual readout of why Variant B wins."
            text="Recruiters should understand the experiment result within seconds. This section turns the numbers into decision-ready evidence."
          />

          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-7 shadow-xl shadow-cyan-900/5 dark:border-white/10 dark:bg-white/[0.035] dark:shadow-cyan-950/20">
              <div className="absolute right-[-6rem] top-[-6rem] h-56 w-56 rounded-full bg-cyan-400/20 blur-3xl" />

              <p className="text-sm font-black uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
                Rollout Confidence
              </p>

              <div className="mt-6 flex items-end gap-3">
                <h3 className="text-6xl font-black tracking-tight text-slate-950 dark:text-white">
                  {rolloutScore}%
                </h3>
                <p className="pb-2 text-sm font-bold text-slate-500 dark:text-slate-400">
                  confidence score
                </p>
              </div>

              <p className="mt-5 max-w-xl leading-7 text-slate-600 dark:text-slate-300">
                Variant B shows a statistically significant lift across conversion and revenue metrics.
                The safest recommendation is a gradual rollout with guardrails for payment failures and cancellations.
              </p>

              <div className="mt-7 rounded-3xl border border-cyan-500/20 bg-cyan-500/10 p-5">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="text-cyan-700 dark:text-cyan-300" size={22} />
                  <p className="font-black text-slate-950 dark:text-white">
                    Decision: Roll out Variant B
                  </p>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  Start with high-value traffic and monitor payment-stage drop-off weekly.
                </p>
              </div>

              <div className="relative mt-8 h-3 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                <div className="h-full w-[96%] rounded-full bg-cyan-400" />
                <div className="shimmer absolute inset-y-0 left-0 w-28 bg-white/50" />
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-xl shadow-cyan-900/5 dark:border-white/10 dark:bg-white/[0.035]">
              <div className="space-y-7">
                {comparisonBars.map((item) => (
                  <ComparisonBar key={item.label} {...item} />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="funnel" className="mx-auto max-w-7xl px-6 py-20">
          <SectionHeader
            eyebrow="Funnel Dashboard"
            title="Variant B carries more users through checkout."
            text="The funnel reveals where users drop off and where the new checkout journey creates measurable improvement."
          />

          <div className="grid gap-5 lg:grid-cols-4">
            {funnel.map((row, index) => (
              <FunnelCard key={row.stage} row={row} index={index} />
            ))}
          </div>
        </section>

        <section id="methodology" className="mx-auto max-w-7xl px-6 py-20">
          <SectionHeader
            eyebrow="Experiment Story"
            title="From hypothesis to product decision."
            text="This makes the dashboard feel like a real analytics case study, not just a collection of charts."
          />

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {timeline.map((item) => (
              <TimelineCard key={item.step} {...item} />
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-20">
          <SectionHeader
            eyebrow="Segment-Level Uplift"
            title="Where the redesign performed best."
            text="Segment analysis turns the result into a rollout strategy instead of a simple yes/no decision."
          />

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {segmentCards.map((card) => (
              <div key={card.label} className="group rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-cyan-900/10 dark:border-white/10 dark:bg-white/[0.035]">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-400/15 text-cyan-700 dark:text-cyan-300">
                  <Zap size={22} />
                </div>
                <p className="text-sm font-bold text-slate-500 dark:text-slate-400">{card.label}</p>
                <p className="mt-3 text-3xl font-black text-slate-950 dark:text-white">{card.uplift}</p>
                <p className="mt-2 text-sm font-bold text-cyan-700 dark:text-cyan-300">{card.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="insights" className="mx-auto max-w-7xl px-6 py-20">
          <SectionHeader
            eyebrow="Insights"
            title="The business answer hidden inside the experiment."
            text="The final recommendation is based on conversion, statistical confidence, revenue uplift and guardrail logic."
          />

          <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="space-y-4">
              {insights.map((insight) => (
                <div key={insight} className="group flex gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-cyan-400/60 dark:border-white/10 dark:bg-white/[0.035]">
                  <CheckCircle2 className="mt-1 shrink-0 text-cyan-700 dark:text-cyan-300" size={21} />
                  <p className="leading-7 text-slate-700 dark:text-slate-300">{insight}</p>
                </div>
              ))}
            </div>

            <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-950 p-7 text-white shadow-2xl shadow-slate-950/20 dark:border-white/10">
              <div className="absolute right-[-4rem] top-[-4rem] h-40 w-40 rounded-full bg-cyan-400/20 blur-3xl" />
              <LineChart className="text-cyan-300" size={32} />
              <h3 className="mt-6 text-3xl font-black">Final Recommendation</h3>
              <p className="mt-4 leading-7 text-slate-300">
                Roll out Variant B gradually, starting with high-intent and returning customer traffic.
                Keep payment failure rate, cancellation proxy and payment-stage drop-off as weekly guardrail KPIs.
              </p>

              <div className="mt-7 grid gap-3">
                {['Launch staged rollout', 'Monitor guardrails', 'Continue pricing transparency tests'].map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                    <ChevronRight size={18} className="text-cyan-300" />
                    <span className="font-bold text-slate-100">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="tools" className="mx-auto max-w-7xl px-6 py-20">
          <SectionHeader
            eyebrow="Tools & Skills"
            title="Built for product analytics and business intelligence roles."
            text="The project demonstrates experiment design, SQL logic, statistical testing, revenue analysis and dashboard storytelling."
          />

          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/[0.035]">
            <div className="flex flex-wrap gap-3">
              {tools.map((tool) => (
                <span key={tool} className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-black text-slate-700 transition hover:-translate-y-1 hover:border-cyan-400 hover:text-cyan-700 dark:border-white/10 dark:bg-slate-950/70 dark:text-slate-300 dark:hover:text-cyan-300">
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-slate-200 px-6 py-8 text-center text-sm font-bold text-slate-500 dark:border-white/10 dark:text-slate-500">
        Hotel Booking Funnel A/B Testing & Revenue Uplift Analysis © 2026
      </footer>
    </div>
  );
}

function Hero() {
  return (
    <section id="home" className="mx-auto max-w-7xl px-6 py-24 md:py-32">
      <div className="grid gap-12 lg:grid-cols-[1.12fr_0.88fr] lg:items-center">
        <div>
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-cyan-700 dark:text-cyan-200">
            <Sparkles size={15} />
            Product Analytics Case Study
          </p>

          <h1 className="max-w-5xl text-4xl font-black leading-[1.04] tracking-tight text-slate-950 dark:text-white md:text-6xl">
            Hotel Booking Funnel A/B Testing & Revenue Uplift Analysis
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-300">
            A hotel booking platform-style experimentation dashboard analysing checkout conversion uplift,
            funnel drop-off, p-value, confidence interval, payment success and revenue per visitor.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <ExternalButton href={repoLink} primary>
              <ExternalLink size={17} />
              GitHub Repo
            </ExternalButton>

            <ExternalButton href={portfolioLink}>
              <ArrowUpRight size={17} />
              Back to Portfolio
            </ExternalButton>
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {heroMetrics.map((metric) => {
              const Icon = metric.icon;

              return (
                <div key={metric.label} className="group rounded-[1.5rem] border border-slate-200 bg-white p-4 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-cyan-900/10 dark:border-white/10 dark:bg-white/[0.035]">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-400/15 text-cyan-700 dark:text-cyan-300">
                    <Icon size={20} />
                  </div>
                  <p className="mt-5 text-2xl font-black text-slate-950 dark:text-white">{metric.value}</p>
                  <p className="mt-1 text-sm font-bold text-slate-500 dark:text-slate-400">{metric.label}</p>
                  <p className="mt-1 text-xs font-semibold text-cyan-700 dark:text-cyan-300">{metric.detail}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 rotate-6 rounded-[2.2rem] bg-cyan-400/20 blur-2xl" />
          <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-6 shadow-2xl shadow-cyan-900/10 dark:border-white/10 dark:bg-white/[0.045] dark:shadow-cyan-950/30">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-slate-500 dark:text-slate-400">Experiment Cockpit</p>
                <h2 className="mt-1 text-2xl font-black text-slate-950 dark:text-white">Live Readout</h2>
              </div>
              <div className="rounded-2xl bg-cyan-400 p-3 text-slate-950">
                <Gauge size={24} />
              </div>
            </div>

            <div className="space-y-4">
              <MiniReadout label="Primary KPI" value="Booking Conversion Rate" />
              <MiniReadout label="Winning Variant" value="Variant B" />
              <MiniReadout label="Statistical Result" value="Significant at 95% confidence" />
              <MiniReadout label="Business Action" value="Gradual rollout recommended" />
            </div>

            <div className="mt-7 rounded-3xl border border-cyan-500/20 bg-cyan-500/10 p-5">
              <p className="text-sm font-black uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
                Why it matters
              </p>
              <p className="mt-3 text-sm leading-7 text-slate-700 dark:text-slate-300">
                The redesigned checkout does not just look better. It moves more users through payment,
                increases completed bookings and improves revenue per visitor.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ExternalButton({ href, children, primary = false }) {
  const valid = href && href.startsWith('https://');

  const className = primary
    ? 'inline-flex items-center justify-center gap-2 rounded-2xl bg-cyan-400 px-5 py-3 text-sm font-black text-slate-950 transition duration-300 hover:-translate-y-1 hover:bg-cyan-300 hover:shadow-xl hover:shadow-cyan-500/20'
    : 'inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-black text-slate-900 transition duration-300 hover:-translate-y-1 hover:border-cyan-500 hover:text-cyan-700 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-100 dark:hover:border-cyan-300 dark:hover:text-cyan-200';

  if (!valid) {
    return (
      <span className="inline-flex cursor-not-allowed items-center justify-center gap-2 rounded-2xl border border-slate-300 px-5 py-3 text-sm font-black text-slate-400 dark:border-white/10 dark:text-slate-500">
        {children}
      </span>
    );
  }

  return (
    <a href={href} target="_blank" rel="noreferrer" className={className}>
      {children}
    </a>
  );
}

function SectionHeader({ eyebrow, title, text }) {
  return (
    <div className="mb-10 max-w-3xl">
      <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-cyan-700 dark:text-cyan-200">
        <Sparkles size={14} />
        {eyebrow}
      </p>
      <h2 className="text-3xl font-black tracking-tight text-slate-950 dark:text-white md:text-4xl">
        {title}
      </h2>
      <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-300">
        {text}
      </p>
    </div>
  );
}

function ExecutiveCard({ label, value, note, accent }) {
  return (
    <div className="group relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-cyan-900/10 dark:border-white/10 dark:bg-white/[0.035]">
      <div className={`absolute right-[-3rem] top-[-3rem] h-28 w-28 rounded-full bg-gradient-to-br ${accent} opacity-20 blur-2xl transition duration-300 group-hover:opacity-40`} />
      <p className="text-sm font-bold text-slate-500 dark:text-slate-400">{label}</p>
      <p className="mt-3 text-3xl font-black text-slate-950 dark:text-white">{value}</p>
      <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{note}</p>
    </div>
  );
}

function ComparisonBar({ label, variantA, variantB, suffix, insight }) {
  const max = Math.max(variantA, variantB);
  const aWidth = `${(variantA / max) * 100}%`;
  const bWidth = `${(variantB / max) * 100}%`;

  const format = (value) => {
    if (suffix === '$') return `$${value}`;
    return `${value}${suffix}`;
  };

  return (
    <div>
      <div className="mb-3 flex items-center justify-between gap-4">
        <div>
          <p className="font-black text-slate-950 dark:text-white">{label}</p>
          <p className="mt-1 text-xs font-bold text-cyan-700 dark:text-cyan-300">{insight}</p>
        </div>
        <span className="rounded-full bg-cyan-400/15 px-3 py-1 text-xs font-black text-cyan-700 dark:text-cyan-300">
          B wins
        </span>
      </div>

      <div className="space-y-3">
        <div>
          <div className="mb-1 flex justify-between text-xs font-bold text-slate-500 dark:text-slate-400">
            <span>Variant A</span>
            <span>{format(variantA)}</span>
          </div>
          <div className="h-3 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
            <div style={{ width: aWidth, backgroundColor: "#f97316", boxShadow: "0 0 14px rgba(249,115,22,0.55)" }} className="h-full rounded-full" />
          </div>
        </div>

        <div>
          <div className="mb-1 flex justify-between text-xs font-bold text-slate-500 dark:text-slate-400">
            <span>Variant B</span>
            <span>{format(variantB)}</span>
          </div>
          <div className="h-3 overflow-hidden rounded-full bg-cyan-500/10">
            <div style={{ width: bWidth }} className="h-full rounded-full bg-cyan-400" />
          </div>
        </div>
      </div>
    </div>
  );
}

function FunnelCard({ row, index }) {
  const isFinal = row.stage === 'Booking Completed';

  return (
    <div className={`group rounded-[2rem] border p-5 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-cyan-900/10 ${
      isFinal
        ? 'border-cyan-400/40 bg-cyan-500/10'
        : 'border-slate-200 bg-white dark:border-white/10 dark:bg-white/[0.035]'
    }`}>
      <div className="mb-5 flex items-center justify-between">
        <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-slate-100 text-sm font-black text-slate-600 dark:bg-slate-900 dark:text-slate-300">
          {index + 1}
        </span>
        {isFinal && <Rocket size={18} className="text-cyan-700 dark:text-cyan-300" />}
      </div>

      <p className="min-h-[3rem] text-base font-black leading-6 text-slate-950 dark:text-white">
        {row.stage}
      </p>

      <div className="mt-5 space-y-4">
        <div>
          <div className="mb-1 flex justify-between text-xs font-bold text-slate-500 dark:text-slate-400">
            <span>A</span>
            <span>{row.aPct.toFixed(1)}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
            <div style={{ width: `${row.aPct}%`, backgroundColor: "#f97316", boxShadow: "0 0 14px rgba(249,115,22,0.55)" }} className="h-full rounded-full" />
          </div>
        </div>

        <div>
          <div className="mb-1 flex justify-between text-xs font-bold text-slate-500 dark:text-slate-400">
            <span>B</span>
            <span>{row.bPct.toFixed(1)}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-cyan-500/10">
            <div style={{ width: `${row.bPct}%` }} className="h-full rounded-full bg-cyan-400" />
          </div>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 text-xs font-bold text-slate-500 dark:text-slate-400">
        <div className="rounded-2xl bg-amber-400/10 p-3 dark:bg-amber-400/10">
          <p className="text-amber-700 dark:text-amber-300">A Count</p>
          <p className="mt-1 text-sm font-black text-amber-700 dark:text-amber-300">{row.a.toLocaleString()}</p>
        </div>
        <div className="rounded-2xl bg-cyan-400/10 p-3">
          <p>B Count</p>
          <p className="mt-1 text-sm font-black text-cyan-700 dark:text-cyan-300">{row.b.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}

function TimelineCard({ step, title, text, icon: Icon }) {
  return (
    <div className="group relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-cyan-900/10 dark:border-white/10 dark:bg-white/[0.035]">
      <div className="absolute right-[-2rem] top-[-2rem] h-28 w-28 rounded-full bg-cyan-400/20 blur-2xl transition group-hover:bg-cyan-400/30" />
      <p className="text-5xl font-black text-slate-100 dark:text-white/10">{step}</p>
      <div className="mt-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-400 text-slate-950">
        <Icon size={22} />
      </div>
      <h3 className="mt-5 text-xl font-black text-slate-950 dark:text-white">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{text}</p>
    </div>
  );
}

function MiniReadout({ label, value }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-slate-900/80">
      <p className="text-xs font-black uppercase tracking-[0.16em] text-cyan-700 dark:text-cyan-300">{label}</p>
      <p className="mt-2 text-sm font-bold leading-6 text-slate-700 dark:text-slate-300">{value}</p>
    </div>
  );
}

function AnimatedStyles() {
  return (
    <style>
      {`
        @keyframes floatOrb {
          0%, 100% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          50% {
            transform: translate3d(28px, -22px, 0) scale(1.08);
          }
        }

        @keyframes floatOrbDelay {
          0%, 100% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          50% {
            transform: translate3d(-24px, 18px, 0) scale(1.06);
          }
        }

        @keyframes pulseGlow {
          0%, 100% {
            opacity: 0.45;
          }
          50% {
            opacity: 0.95;
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-120%);
          }
          100% {
            transform: translateX(420%);
          }
        }

        .orb {
          animation: floatOrb 10s ease-in-out infinite;
        }

        .orb-delay {
          animation: floatOrbDelay 12s ease-in-out infinite;
        }

        .pulse-glow {
          animation: pulseGlow 4s ease-in-out infinite;
        }

        .shimmer {
          animation: shimmer 2.8s ease-in-out infinite;
        }
      `}
    </style>
  );
}

export default App;