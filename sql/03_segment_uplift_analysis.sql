-- 03_segment_uplift_analysis.sql
--
-- Segment‑level uplift analysis for the A/B test.
-- Calculates conversion rates per variant for a given segment (e.g., device,
-- country, acquisition_channel, customer_type) and computes absolute and
-- relative uplift between Variant B and Variant A.

-- Change the ``segment_col`` variable to analyse different dimensions.
-- Example values: 'device', 'country', 'customer_type', 'acquisition_channel', 'loyalty_member'.

\set segment_col 'device'

WITH sessions_by_seg AS (
    SELECT
        ea.variant,
        s.:segment_col AS segment_value,
        COUNT(DISTINCT s.session_id) AS sessions
    FROM experiment_assignment ea
    JOIN sessions s ON s.session_id = ea.session_id
    GROUP BY ea.variant, s.:segment_col
),
bookings_by_seg AS (
    SELECT
        b.variant,
        s.:segment_col AS segment_value,
        COUNT(DISTINCT b.session_id) AS bookings
    FROM bookings b
    JOIN sessions s ON s.session_id = b.session_id
    GROUP BY b.variant, s.:segment_col
),
combined AS (
    SELECT
        sb.variant,
        sb.segment_value,
        sb.sessions,
        COALESCE(bb.bookings, 0) AS bookings,
        COALESCE(bb.bookings, 0)::NUMERIC / sb.sessions AS conversion_rate
    FROM sessions_by_seg sb
    LEFT JOIN bookings_by_seg bb ON sb.variant = bb.variant AND sb.segment_value = bb.segment_value
)
SELECT
    segment_value,
    MAX(CASE WHEN variant = 'A' THEN conversion_rate END) AS conversion_rate_A,
    MAX(CASE WHEN variant = 'B' THEN conversion_rate END) AS conversion_rate_B,
    ROUND((MAX(CASE WHEN variant = 'B' THEN conversion_rate END) -
          MAX(CASE WHEN variant = 'A' THEN conversion_rate END)), 4) AS absolute_uplift,
    ROUND((MAX(CASE WHEN variant = 'B' THEN conversion_rate END) -
          MAX(CASE WHEN variant = 'A' THEN conversion_rate END)) /
          NULLIF(MAX(CASE WHEN variant = 'A' THEN conversion_rate END), 0), 4) AS relative_uplift
FROM combined
GROUP BY segment_value
ORDER BY segment_value;