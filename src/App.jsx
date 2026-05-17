import React, { useState, useEffect } from 'react';
import { Sun, Moon, ExternalLink } from 'lucide-react';

/**
 * Dashboard component
 * Displays an end‑to‑end overview of the hotel booking funnel A/B test.
 * Data shown here is computed from the synthetic dataset in the `/data` folder.
 */
export default function App() {
  // Dark mode state
  const [dark, setDark] = useState(false);
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);

  // Key metrics computed offline (see notebook)
  const metrics = {
    sessions: { A: 29786, B: 30214 },
    bookings: { A: 1406, B: 1754 },
    conversionRate: { A: 0.0472, B: 0.0581 },
    absoluteUplift: 0.01085, // B - A
    relativeUplift: 0.2298,  // (B-A)/A
    pValue: 2.7e-9,
    revenuePerVisitor: { A: 20.59, B: 25.62 },
    avgBookingValue: { A: 436.09, B: 441.32 },
    incrementalRevPerVisitor: 5.03,
    incrementalRevenueTotal: 5.03 * 60000 // sessions * incremental rev per visitor
  };

  // Funnel stage counts and percentages relative to the top of the funnel
  const funnel = {
    stages: [
      'Search Started',
      'Search Results Viewed',
      'Hotel Viewed',
      'Room Selected',
      'Checkout Started',
      'Payment Started',
      'Payment Success',
      'Booking Completed'
    ],
    counts: {
      A: [29786, 28367, 22724, 15861, 9575, 4744, 4268, 1406],
      B: [30214, 29012, 23769, 17154, 11122, 6109, 5699, 1754]
    }
  };

  // Helper to format percentages
  const pct = (value) => `${(value * 100).toFixed(1)}%`;

  return (
    <div className="font-sans min-h-screen flex flex-col">
      {/* Header / Hero Section */}
      <header className="bg-primary dark:bg-primary-dark text-white">
        <div className="max-w-6xl mx-auto px-6 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Hotel Booking Platform A/B Testing Dashboard
          </h1>
          <p className="text-lg md:text-xl text-blue-200 max-w-3xl mx-auto">
            Measuring the impact of a simplified checkout funnel on booking conversion and revenue uplift.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#dashboard" className="px-6 py-3 bg-white text-primary font-medium rounded-md shadow hover:shadow-lg transition">
              View Dashboard
            </a>
            <a href="#" className="px-6 py-3 bg-transparent border border-white rounded-md font-medium flex items-center gap-2 hover:bg-white hover:text-primary transition">
              GitHub Repo <ExternalLink size={16} />
            </a>
            <a href="#" className="px-6 py-3 bg-transparent border border-white rounded-md font-medium flex items-center gap-2 hover:bg-white hover:text-primary transition">
              Back to Portfolio <ExternalLink size={16} />
            </a>
          </div>
        </div>
      </header>

      {/* Dark mode toggle */}
      <div className="fixed top-4 right-4 z-10">
        <button
          onClick={() => setDark((prev) => !prev)}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          aria-label="Toggle dark mode"
        >
          {dark ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>

      <main id="dashboard" className="flex-1 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 py-12">
        <div className="max-w-6xl mx-auto px-6 space-y-20">

          {/* Executive Summary */}
          <section>
            <h2 className="text-2xl font-semibold mb-6">Executive Summary</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <SummaryCard title="Winning Variant" value="Variant B" description="Variant B outperformed Variant A across conversion and revenue metrics." />
              <SummaryCard title="Conversion Uplift" value={`+${(metrics.absoluteUplift*100).toFixed(2)}%`} description={`Relative uplift of ${(metrics.relativeUplift*100).toFixed(1)}%.`} />
              <SummaryCard title="P‑Value" value={metrics.pValue.toExponential(1)} description="Statistically significant at 95% confidence." />
              <SummaryCard title="Revenue Uplift" value={`+${(metrics.incrementalRevPerVisitor*100/metrics.revenuePerVisitor.A).toFixed(1)}%`} description="Incremental revenue per visitor." />
              <SummaryCard title="Incremental Revenue" value={`$${(metrics.incrementalRevenueTotal/1000).toFixed(1)}k`} description="Approximate uplift over experiment period." />
              <SummaryCard title="Rollout Recommendation" value="Roll Out B" description="Proceed with staged rollout on high‑impact segments." />
            </div>
          </section>

          {/* Funnel Dashboard */}
          <section>
            <h2 className="text-2xl font-semibold mb-6">Funnel Performance</h2>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px] table-auto text-sm">
                <thead className="bg-gray-100 dark:bg-gray-800">
                  <tr>
                    <th className="p-2 text-left">Stage</th>
                    <th className="p-2 text-right">A (count)</th>
                    <th className="p-2 text-right">A (%)</th>
                    <th className="p-2 text-right">B (count)</th>
                    <th className="p-2 text-right">B (%)</th>
                  </tr>
                </thead>
                <tbody>
                  {funnel.stages.map((stage, idx) => {
                    const countA = funnel.counts.A[idx];
                    const countB = funnel.counts.B[idx];
                    const pctA = countA / funnel.counts.A[0];
                    const pctB = countB / funnel.counts.B[0];
                    return (
                      <tr key={stage} className={idx % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-900'}>
                        <td className="p-2 font-medium">{stage}</td>
                        <td className="p-2 text-right">{countA.toLocaleString()}</td>
                        <td className="p-2 text-right">{pct(pctA)}</td>
                        <td className="p-2 text-right">{countB.toLocaleString()}</td>
                        <td className="p-2 text-right">{pct(pctB)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>

          {/* A/B Test Results */}
          <section>
            <h2 className="text-2xl font-semibold mb-6">A/B Test Results</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                <h3 className="text-xl font-semibold mb-4">Conversion Rate</h3>
                <div className="space-y-2">
                  <p>Variant A: <span className="font-semibold">{pct(metrics.conversionRate.A)}</span></p>
                  <p>Variant B: <span className="font-semibold">{pct(metrics.conversionRate.B)}</span></p>
                  <p>Absolute uplift: <span className="font-semibold">{(metrics.absoluteUplift*100).toFixed(2)} pp</span></p>
                  <p>Relative uplift: <span className="font-semibold">{(metrics.relativeUplift*100).toFixed(1)}%</span></p>
                  <p>P‑value: <span className="font-semibold">{metrics.pValue.toExponential(2)}</span></p>
                  <p>95% CI: <span className="font-semibold">(0.73 pp – 1.44 pp)</span></p>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                <h3 className="text-xl font-semibold mb-4">Revenue Impact</h3>
                <div className="space-y-2">
                  <p>Revenue per visitor A: <span className="font-semibold">${metrics.revenuePerVisitor.A.toFixed(2)}</span></p>
                  <p>Revenue per visitor B: <span className="font-semibold">${metrics.revenuePerVisitor.B.toFixed(2)}</span></p>
                  <p>Incremental revenue/visitor: <span className="font-semibold">${metrics.incrementalRevPerVisitor.toFixed(2)}</span></p>
                  <p>Average booking value A: <span className="font-semibold">${metrics.avgBookingValue.A.toFixed(2)}</span></p>
                  <p>Average booking value B: <span className="font-semibold">${metrics.avgBookingValue.B.toFixed(2)}</span></p>
                </div>
              </div>
            </div>
          </section>

          {/* Segment Level Uplift */}
          <section>
            <h2 className="text-2xl font-semibold mb-6">Segment‑Level Uplift</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <SegmentCard title="Mobile Users" value="+0.86 pp" subtitle="+18.6% uplift" />
              <SegmentCard title="Desktop Users" value="+1.29 pp" subtitle="+27.7% uplift" />
              <SegmentCard title="Tablet Users" value="+1.11 pp" subtitle="+22.6% uplift" />
              <SegmentCard title="New Customers" value="+1.11 pp" subtitle="+23.9% uplift" />
              <SegmentCard title="Returning Customers" value="+1.06 pp" subtitle="+22.1% uplift" />
              <SegmentCard title="Paid Search" value="+0.88 pp" subtitle="+19.0% uplift" />
              <SegmentCard title="Loyalty Members" value="+1.26 pp" subtitle="+27.7% uplift" />
            </div>
          </section>

          {/* Insights */}
          <section>
            <h2 className="text-2xl font-semibold mb-6">Key Insights</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li>Variant B increased completed bookings by over <strong>22%</strong> relative to Variant A with strong statistical significance.</li>
              <li>Mobile users responded well to the simplified checkout, though desktop and tablet users showed the largest uplift.</li>
              <li>Returning customers delivered higher revenue uplift per visitor than new customers.</li>
              <li>Checkout and payment drop‑off decreased notably in Variant B, indicating improved flow efficiency.</li>
              <li>Paid search traffic generated strong incremental revenue, suggesting investment in this channel yields returns.</li>
            </ul>
          </section>

          {/* Final Recommendation */}
          <section>
            <h2 className="text-2xl font-semibold mb-6">Final Recommendation</h2>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              Based on the analysis, roll out the new checkout experience (Variant B) to 100% of traffic, starting with mobile and returning customers. Monitor payment failure and cancellation rates post‑launch and continue iterating on pricing transparency and urgency messaging. Build a live experiment monitoring dashboard to track KPIs and guardrail metrics weekly.
            </p>
          </section>

          {/* Methodology */}
          <section>
            <h2 className="text-2xl font-semibold mb-6">Methodology</h2>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              The experiment randomly assigned users to one of two booking funnel variants for 21 days. Funnel events were instrumented across search, selection, checkout and payment stages. We computed session‑level conversion rates, revenue per visitor and average booking value. A two‑proportion z‑test assessed statistical significance of the conversion uplift, and confidence intervals were derived assuming normal approximation. Segment analyses compared performance across device, customer type, acquisition channel and loyalty membership.
            </p>
          </section>

          {/* Tools & Skills */}
          <section>
            <h2 className="text-2xl font-semibold mb-6">Tools & Skills Demonstrated</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li>Data generation and analysis with <strong>Pandas</strong>, <strong>NumPy</strong> and statistical testing in Python.</li>
              <li>SQL for funnel metrics, A/B test summaries, segment‑level uplift and revenue analysis.</li>
              <li>React and Vite for building a responsive analytics dashboard.</li>
              <li>Tailwind CSS for rapid UI styling and dark/light theming.</li>
              <li>Product and growth analytics, experiment design and interpretation of business KPIs.</li>
            </ul>
          </section>

        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 text-center text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700">
        © {new Date().getFullYear()} Booking Funnel A/B Testing Case Study
      </footer>
    </div>
  );
}

// Reusable summary card component
function SummaryCard({ title, value, description }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow flex flex-col justify-between">
      <div>
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">{title}</h3>
        <p className="text-2xl font-semibold">{value}</p>
      </div>
      <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">{description}</p>
    </div>
  );
}

// Segment card component
function SegmentCard({ title, value, subtitle }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow flex flex-col justify-between">
      <div>
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">{title}</h3>
        <p className="text-xl font-semibold">{value}</p>
      </div>
      <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">{subtitle}</p>
    </div>
  );
}