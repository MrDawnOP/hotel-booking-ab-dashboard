-- 04_revenue_impact_analysis.sql
--
-- Revenue impact analysis for the A/B test.
-- Calculates total revenue, revenue per visitor, average booking value,
-- and incremental revenue by variant. Also summarises revenue by device.

WITH sessions_per_variant AS (
    SELECT variant, COUNT(DISTINCT session_id) AS sessions
    FROM experiment_assignment
    GROUP BY variant
),
revenue_per_variant AS (
    SELECT variant, SUM(booking_value) AS total_revenue, AVG(booking_value) AS avg_booking_value
    FROM bookings
    GROUP BY variant
),
revenue_summary AS (
    SELECT
        sp.variant,
        rp.total_revenue,
        rp.avg_booking_value,
        rp.total_revenue / sp.sessions AS revenue_per_visitor
    FROM sessions_per_variant sp
    JOIN revenue_per_variant rp ON sp.variant = rp.variant
)
SELECT * FROM revenue_summary ORDER BY variant;

-- Revenue by device
WITH device_sessions AS (
    SELECT ea.variant, s.device, COUNT(DISTINCT s.session_id) AS sessions
    FROM experiment_assignment ea
    JOIN sessions s ON s.session_id = ea.session_id
    GROUP BY ea.variant, s.device
),
device_revenue AS (
    SELECT b.variant, s.device, SUM(b.booking_value) AS revenue
    FROM bookings b
    JOIN sessions s ON s.session_id = b.session_id
    GROUP BY b.variant, s.device
)
SELECT
    ds.device,
    ds.variant,
    ds.sessions,
    COALESCE(dr.revenue, 0) AS revenue,
    COALESCE(dr.revenue, 0) / ds.sessions AS revenue_per_visitor
FROM device_sessions ds
LEFT JOIN device_revenue dr ON dr.variant = ds.variant AND dr.device = ds.device
ORDER BY ds.device, ds.variant;