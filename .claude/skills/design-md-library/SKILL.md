---
name: design-md-library
description: Library of 84 ready-made DESIGN.md design-system analyses of real websites (Stripe, Linear, Vercel, Apple, Airbnb, Notion, Supabase, Claude, Revolut, Wise, Spotify, Uber, etc.) from VoltAgent/awesome-design-md — colors, typography, spacing, components and tone as tokens. Use when the user wants a page or UI to "look like" a known site, wants a design reference or a DESIGN.md for their project, or asks for inspiration for a visual direction.
license: MIT
---

# DESIGN.md library

`library/<site>/DESIGN.md` holds a plain-text design system extracted from a real website (front-matter
tokens for colors, type, spacing, radii, plus rules for components and layout). List the folders to see
what is available; do not read them all.

## How to use

1. Pick 1-3 candidate sites whose feel matches the brief (e.g. calm fintech → `wise`, `mercury`,
   `revolut`; dev tool → `linear.app`, `vercel`, `supabase`; warm editorial → `claude`, `notion`).
   Read only those DESIGN.md files.
2. Use them as **reference for structure and quality** (scale, spacing rhythm, token naming, how
   components are specified), then write the project's own `DESIGN.md` at the project root with its own
   colors, type and voice.
3. Do not clone a brand: never copy another company's logo, name, wordmark, exact palette + typeface
   combination or product imagery into a site for a different business.
4. If the `taste-skill` (design-taste-frontend) is also in use, its house rules and its dealt direction
   win; use this library only for reference on tokens and component detail.
