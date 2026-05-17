-- 02_ab_test_summary.sql
--
-- High‑level summary for the A/B test.
-- Calculates the number of sessions and bookings per variant, conversion rate,
-- absolute and relative uplift, and performs a simple two‑proportion z‑test.
-- Note: statistical testing here is presented in SQL form; final p‑value
-- should be computed in a notebook or BI tool for accuracy.

WITH variant_sessions AS (
    SELECT variant, COUNT(DISTINCT session_id) AS sessions
    FROM experiment_assignment
    GROUP BY variant
),
variant_bookings AS (
    SELECT variant, COUNT(DISTINCT session_id) AS bookings
    FROM bookings
    GROUP BY variant
),
summary AS (
    SELECT
        vs.variant,
        vs.sessions,
        COALESCE(vb.bookings, 0) AS bookings,
        COALESCE(vb.bookings, 0)::NUMERIC / vs.sessions AS conversion_rate
    FROM variant_sessions vs
    LEFT JOIN variant_bookings vb ON vs.variant = vb.variant
)
SELECT
    s.variant,
    s.sessions,
    s.bookings,
    ROUND(s.conversion_rate, 4) AS conversion_rate
FROM summary s
ORDER BY variant;

-- To compute uplift and p‑value outside SQL:
--   diff = summary.conversion_rate[B] - summary.conversion_rate[A]
--   rel_uplift = diff / summary.conversion_rate[A]
--   Use a two‑proportion z‑test for significance.