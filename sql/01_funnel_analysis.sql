-- 01_funnel_analysis.sql
--
-- Funnel analysis for the hotel booking A/B test.
-- This query calculates the number of sessions that reached each step in the booking
-- funnel for each variant and derives the stage‑to‑stage conversion rates.
--
-- Assumptions:
--   • ``funnel_events`` contains one row per event with fields: session_id, variant, event_name.
--   • Only sessions included in the ``experiment_assignment`` table are considered.

WITH base AS (
    SELECT
        fe.variant,
        fe.session_id,
        fe.event_name
    FROM funnel_events fe
    JOIN experiment_assignment ea ON ea.session_id = fe.session_id
),
stage_counts AS (
    SELECT
        variant,
        COUNT(DISTINCT CASE WHEN event_name = 'search_started' THEN session_id END)    AS search_started,
        COUNT(DISTINCT CASE WHEN event_name = 'search_results_viewed' THEN session_id END) AS search_results_viewed,
        COUNT(DISTINCT CASE WHEN event_name = 'hotel_viewed' THEN session_id END)      AS hotel_viewed,
        COUNT(DISTINCT CASE WHEN event_name = 'room_selected' THEN session_id END)       AS room_selected,
        COUNT(DISTINCT CASE WHEN event_name = 'checkout_started' THEN session_id END)    AS checkout_started,
        COUNT(DISTINCT CASE WHEN event_name = 'payment_started' THEN session_id END)     AS payment_started,
        COUNT(DISTINCT CASE WHEN event_name = 'payment_success' THEN session_id END)     AS payment_success,
        COUNT(DISTINCT CASE WHEN event_name = 'booking_completed' THEN session_id END)    AS booking_completed
    FROM base
    GROUP BY variant
),
rates AS (
    SELECT
        variant,
        search_started,
        search_results_viewed,
        hotel_viewed,
        room_selected,
        checkout_started,
        payment_started,
        payment_success,
        booking_completed,
        ROUND(search_results_viewed::NUMERIC / NULLIF(search_started, 0), 4)       AS search_to_results_rate,
        ROUND(hotel_viewed::NUMERIC      / NULLIF(search_results_viewed, 0), 4)     AS results_to_hotel_rate,
        ROUND(room_selected::NUMERIC     / NULLIF(hotel_viewed, 0), 4)              AS hotel_to_room_rate,
        ROUND(checkout_started::NUMERIC  / NULLIF(room_selected, 0), 4)             AS room_to_checkout_rate,
        ROUND(payment_started::NUMERIC   / NULLIF(checkout_started, 0), 4)          AS checkout_to_payment_rate,
        ROUND(payment_success::NUMERIC   / NULLIF(payment_started, 0), 4)           AS payment_success_rate,
        ROUND(booking_completed::NUMERIC / NULLIF(payment_success, 0), 4)           AS payment_to_booking_rate,
        ROUND(booking_completed::NUMERIC / NULLIF(search_started, 0), 4)            AS overall_conversion_rate
    FROM stage_counts
)
SELECT * FROM rates ORDER BY variant;