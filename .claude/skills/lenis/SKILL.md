---
name: lenis
description: Smooth scrolling with Lenis (darkroom.engineering) — setup in vanilla JS, React/Next.js (lenis/react), Vue, snap; integration with GSAP ScrollTrigger; settings, methods, events, nested scroll, anchor links, reduced motion and troubleshooting. Use when the user asks for smooth scroll, inertia scrolling, Lenis, or scroll that feels "premium/fluid", or when wiring Lenis together with GSAP ScrollTrigger.
license: MIT
---

# Lenis

Lenis is a lightweight smooth-scroll library. This skill packages its official documentation
(github.com/darkroomengineering/lenis) as references. It is a library, not a tool: install it in the
project with the package manager (`npm i lenis`).

## Which reference to read

| Need | File |
| --- | --- |
| Install, basic setup, recommended CSS, settings, methods, events, nested scroll, anchors, reduced motion, limitations, troubleshooting | `references/lenis.md` |
| React / Next.js (`ReactLenis`, `useLenis`, GSAP and Framer Motion integration) | `references/lenis-react.md` |
| Vue / Nuxt | `references/lenis-vue.md` |
| Scroll snapping (`lenis/snap`) | `references/lenis-snap.md` |

## Rules of thumb

- Always add the recommended Lenis CSS (see `references/lenis.md`, "Recommended CSS").
- With GSAP ScrollTrigger, drive Lenis from `gsap.ticker` and call `ScrollTrigger.update` on Lenis'
  `scroll` event, exactly as in the "GSAP ScrollTrigger" section; do not run two raf loops.
- Respect `prefers-reduced-motion`: disable smoothing (or don't start Lenis) for those users.
- Mark nested scrollable areas (modals, dropdowns, code blocks) with `data-lenis-prevent`.
- Destroy the instance on unmount in SPAs (`lenis.destroy()`), or use `ReactLenis`, which does it for you.
- Smooth scroll is optional polish: never let it block content or reading on mobile.
