# GoHighLevel Automation System - Skin By Emily

## Pipeline Stages

1. New Visitor
2. Lead Captured
3. Booked Client
4. Returning Client
5. VIP Client
6. Inactive (21+ days)

## Trigger Map

- **Form Submitted (Skin Analysis)**
  - Tag contact by concern intent.
  - Set lifecycle stage to `lead`.
  - Start `intent_nurture_sequence`.

- **Booking Completed (Square Webhook -> GHL inbound webhook)**
  - Update lifecycle stage to `booked_client`.
  - Send T+0 confirmation + prep guide.
  - Queue T+1 prep reminder.
  - Queue T+3 add-on offer.
  - Queue T+7 product recommendation.
  - Queue T+21 rebooking prompt.

- **No booking after analysis (24 hours)**
  - Send urgency SMS with concern-specific social proof.
  - Send recovery email with pre-filled booking link.

- **Product Purchased**
  - Update purchase history custom value.
  - Start replenishment timer (typically 30 days).

- **Inactivity 30 days**
  - Tag as `inactive_client`.
  - Start win-back flow with membership intro.

## Required Custom Fields in GoHighLevel

- `skin_intent`
- `lifecycle_stage`
- `primary_treatment`
- `secondary_addons`
- `last_booking_date`
- `last_product_purchase`
- `purchase_history_json`
- `appointment_history_json`

## Required Tags

- `acne_intent`
- `texture_intent`
- `antiaging_intent`
- `maintenance_intent`
- `barrier_repair_intent`
- `booked_client`
- `vip_client`
- `inactive_client`

## Funnels in GoHighLevel

1. **Skin Analysis Funnel**
   - Mobile landing page
   - Intent selector step
   - Personalized offer step
   - Square checkout handoff

2. **Post-Booking Funnel**
   - Confirmation page
   - Prep guide page
   - Add-on upsell step
   - Product bundle checkout

## Messaging Cadence

- T+0: confirmation + prep guide
- T+1 day: preparation checklist
- T+3 days: targeted add-on recommendation
- T+7 days: skincare product recommendation
- T+21 days: rebook prompt

## Integration Notes

- Use Zapier or Make for Square -> GoHighLevel event relay when direct webhook mapping is unavailable.
- Keep contact updates idempotent by checking booking ID before stage transitions.
