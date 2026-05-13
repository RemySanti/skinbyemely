# Skin Experience Operating System - SaaS Blueprint

## Frontend Module (Next.js PWA)

- Mobile-first personalized interface
- Intent-driven dynamic recommendations
- Embedded Square booking CTA
- Product and add-on upsell states

## Clinic Engine

- Lifecycle state machine:
  - new_visitor
  - lead
  - booked_client
  - returning_client
  - vip_client
  - inactive_client
- Recommendation logic input:
  - skin concern
  - purchase history
  - service history
- Output:
  - primary treatment
  - add-on options
  - at-home products

## Booking Engine

- Square service mapping table
- Intent-to-service prefill handoff
- Minimal friction conversion path

## Commerce Engine

- Product bundles mapped by skin target
- Stripe checkout compatibility for retail kits
- Subscription-ready architecture for future memberships

## Automation Engine

- Trigger-based journeys for booking, inactivity, and product events
- Email + SMS channels
- Optional push notifications later

## Simplified Data Model

### User

- id
- skin_intent
- lifecycle_stage
- appointment_history
- purchase_history

### Service

- id
- name
- concern_type
- duration
- price
- add_ons

### Product

- id
- category
- skin_target
- bundle_affinity
