# Booking.com‑Style Hotel Booking Funnel A/B Testing & Revenue Uplift Analysis

> **Disclaimer:** This simulated project is inspired by hotel booking platforms. It uses synthetic data and does not contain any official Booking.com branding, logos or proprietary information. Refer to it as a *hotel booking platform‑style* case study.

## 📈 Business Problem

A product team redesigned the hotel booking checkout journey to reduce friction and increase completed bookings. Leadership needs to know whether the new version of the checkout (Variant B) improves conversion, revenue per visitor and other key KPIs relative to the existing checkout (Variant A). Should the new funnel be rolled out to all users?

## 🧪 Experiment Design

| Item             | Description |
| ---------------- | ----------- |
| Variants         | **A:** existing checkout journey, **B:** simplified checkout with clearer pricing, fewer steps, improved urgency messaging and enhanced payment flow |
| Assignment       | Random 50/50 split of sessions over a 21‑day experiment period |
| Primary KPI      | Booking conversion rate (completed bookings ÷ sessions) |
| Secondary KPIs   | Revenue per visitor, average booking value, checkout abandonment rate, payment success rate, mobile conversion rate, segment‑level uplift |
| Guardrail KPIs   | Payment failure rate, cancellation proxy, drop‑off at payment stage |

The experiment ran from **25 April – 15 May 2026** and tracked 60,000+ sessions and 250,000+ funnel events.

## 🗃️ Dataset Overview

All data is synthetic and lives in the `data/` directory:

| File                       | Rows      | Description |
| -------------------------- | --------- | ----------- |
| `users.csv`               | 25,000+   | User attributes: age group, gender, country, device, customer type, acquisition channel, loyalty membership, signup date |
| `sessions.csv`            | 60,000+   | Session‑level metadata: date, device, country, channel, duration |
| `experiment_assignment.csv` | 60,000+   | Variant assignment per session with session/user attributes |
| `funnel_events.csv`       | 240,000+  | Funnel event stream per session (search, selection, checkout, payment) |
| `bookings.csv`            | 3,000+    | Completed bookings with value, nights, guests, room type, cancellation flag |
| `hotels.csv`              | 500       | Hotel metadata: city, category, nightly rate, rating, margin rate |

## 📊 KPIs Analysed

- **Funnel metrics:** search→results, results→hotel view, hotel→room selection, room→checkout, checkout→payment, payment→booking and overall booking conversion.
- **A/B testing:** conversion rate per variant, absolute & relative uplift, two‑proportion z‑test, p‑value, confidence interval, sample size.
- **Revenue:** total revenue by variant, revenue per visitor, average booking value, incremental revenue, revenue by device and channel.
- **Segments:** device, country, customer type, acquisition channel, loyalty membership, hotel category and room type.

## 🧠 Methodology

1. **Data generation:** realistic synthetic data was created for users, sessions, assignments, funnel events, bookings and hotels. Variant B has a slightly higher conversion probability than Variant A.
2. **Event tracking:** funnel events trace user progress from search through payment. Drop‑offs at each stage reveal friction points.
3. **Conversion analysis:** conversion rates were computed per variant and per segment. A two‑proportion z‑test assessed statistical significance of the uplift.
4. **Revenue analysis:** booking values were aggregated to calculate revenue per visitor and average booking value. Incremental revenue per visitor and total uplift were estimated.
5. **Segment analysis:** conversion and revenue metrics were broken down by device, customer type, acquisition channel and loyalty membership to identify high‑impact segments.
6. **Dashboard:** a React + Vite + Tailwind CSS dashboard visualises the results. Dark/light mode and responsive design are included.

## 🔍 Key Insights

- **Variant B wins:** Conversion increased from **4.72%** (Variant A) to **5.81%** (Variant B), an absolute uplift of **1.08 percentage points** (relative **+23%**). The p‑value ≈ 2.7 × 10⁻⁹ indicates strong statistical significance.
- **Funnel drop‑offs reduced:** Variant B improved progression at every stage—checkout starts, payments and completed bookings—indicating a smoother flow.
- **Revenue uplift:** Revenue per visitor rose from **$20.59** (A) to **$25.62** (B), adding ≈ **$5 per visitor** and ~**$302k** incremental revenue over the experiment period.
- **Segments:** Desktop and tablet users showed the largest uplift (> +1.1 pp); mobile users also improved. Returning customers and loyalty members delivered higher revenue uplift than new customers. Paid search traffic generated strong incremental bookings.

## ✅ Final Recommendation

Roll out the simplified checkout (Variant B) to all users, starting with mobile and returning customers. Continue monitoring payment failures and cancellations. Invest further in paid search and loyalty programs given their high uplift. Iterate on messaging and pricing transparency for further gains.

## 🧰 Folder Structure

```
booking-funnel-ab-testing/
├── data/                # CSV files for users, sessions, assignments, events, bookings, hotels
├── notebooks/           # Jupyter notebook with full analysis
├── sql/                 # SQL scripts for funnel analysis, A/B test summary, segment uplift & revenue impact
├── src/                 # React source code (App.jsx, main.jsx, index.css)
├── public/              # Static assets
├── index.html           # HTML entry point
├── package.json         # Project configuration & dependencies
├── tailwind.config.js   # Tailwind CSS configuration
├── vite.config.js       # Vite build configuration
└── README.md            # Project documentation (this file)
```

## 🚀 How to Run Locally

1. **Install dependencies** (requires Node.js ≥ 14 and npm installed):

   ```bash
   cd booking-funnel-ab-testing
   npm install
   ```

2. **Start the development server:**

   ```bash
   npm run dev
   ```

   Navigate to <http://localhost:5173> to view the dashboard. Hot reloading is enabled.

3. **Build for production:**

   ```bash
   npm run build
   ```

   The production‑ready files will be output to the `dist/` directory.

## ☁️ Deploy on Vercel

You can deploy this project to [Vercel](https://vercel.com/) in a few steps:

1. Push the repository to GitHub.
2. Sign in to Vercel and select **Import Project** → **From Git Repository**.
3. Pick the repo and accept the default settings (Vercel auto‑detects Vite/React projects). Ensure the build command is `npm run build` and output directory is `dist`.
4. Click **Deploy**. Your dashboard will be live on a Vercel domain.

## 💡 Portfolio Bullet Points

- Developed a **hotel booking funnel A/B testing dashboard** analysing **60k+ sessions** and **240k+ funnel events** using a modern React + Vite stack.
- Measured conversion uplift, p‑value, confidence interval, revenue per visitor and incremental revenue across control and treatment variants.
- Identified strongest uplift across **mobile vs desktop vs tablet**, **new vs returning customers** and **paid search traffic**, informing segment‑specific rollout strategies.
- Delivered clear rollout recommendations supported by funnel analysis, statistical testing and revenue impact assessment.

## 🗣️ Interview Talking Points

- **Experiment Design:** How I defined primary/secondary KPIs, guardrails and randomised variant assignment over a fixed time window.
- **Choice of Primary KPI:** Booking conversion rate directly ties to business value and reflects user success in the funnel.
- **Statistical Significance:** Use of a two‑proportion z‑test, p‑value and confidence interval to determine whether the observed uplift is not due to chance.
- **Segment Analysis:** Breaking down conversion and revenue metrics by device, customer type, channel and loyalty membership to uncover where the redesign had the most impact.
- **Connecting Product Changes to Revenue:** Translating conversion improvements into incremental revenue per visitor and total uplift to inform business decisions.
- **Recommendations:** Why I recommend rolling out Variant B and what guardrails and further experiments should be monitored post‑launch.

---

Built with ❤️ using React, Vite, Tailwind CSS, SQL and Python.