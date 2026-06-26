# Homepage modernization plan

## Context
- Target: `homepage` (`src/app/page.tsx`).
- Request type: UI redesign / modernization of an existing marketing page.
- Register: **Brand**. Created `PRODUCT.md` with the approved strategic direction so Impeccable can read project context.
- Stack: Next.js 15 App Router, React 18, Tailwind CSS, Framer Motion, `next/image`.
- Preflight: repo has existing untracked `.pi/` and `AGENTS.md`, plus planning artifacts `PLAN-homepage-modernization.md` and `PRODUCT.md`. Planning mode forbids commits now; first implementation action should be a Git checkpoint/save of these files before UI edits.
- Secret-safety: `.env.local` and credential-like files exist but were not opened.

## Objective of the redesign
Modernize the homepage into a more **bold / luxury black-and-gold barber** experience while keeping the recognizable hero: video background, centered logo, and central statement. The page should feel premium and conversion-focused, with hair/cut/styling as the main promise and beard services mentioned proportionally, not exaggerated.

## Current UI diagnosis
- `src/app/page.tsx` is a single client component containing: price-update banner, video hero, about, services preview, reasons-to-choose, gallery, and final CTA.
- The current visual identity already has useful assets: cinematic video, black background, gold accents, real salon/service images, and Alien League display font.
- Main issues to address:
  - repeated gradient/card/hover treatments make sections feel template-like;
  - feature cards use emojis, which lowers the premium/luxury feel;
  - section heading scale and spacing can feel heavy/inconsistent on mobile;
  - CTA styles vary across sections;
  - visible/global banners have inconsistent styles and fixed positions that can overlap (`PushNotificationBanner`, `NotificationPrompt`, `AddToHomeBanner`, `CookieConsentBanner`, plus the homepage price banner);
  - copy sometimes broadens into generic barber language; it should stay hair-first and concise.
- Impeccable detector on `src/app/page.tsx` currently returns no deterministic findings, so the redesign focus is visual hierarchy and brand quality rather than a detector violation.

## Direction / Approach
- Keep the existing dark cinematic brand, but make it sharper: black surfaces, controlled gold accents, stronger contrast, fewer decorative gradients, more intentional image crops, and cleaner premium CTAs.
- Keep the hero mostly unchanged: video stays, logo stays centered, central copy stays; only small adjustments to overlay, spacing, CTA treatment, and wording if they improve readability/conversion.
- Make the homepage hair-focused: primary service language around taglio, styling, look, consulenza; beard appears as a supporting service only.
- Unify all visible banner UI into one visual language and stacking behavior so banners do not cover each other or compete with the fixed navbar.
- Avoid a from-scratch rewrite, new dependencies, auth/booking/API changes, routing changes, or business-logic changes.

## Files to modify
- `src/app/page.tsx` — primary homepage layout, homepage price banner, sections, Tailwind classes, microcopy.
- `src/components/PushNotificationBanner.tsx` — visual treatment/placement only; no notification/API logic changes.
- `src/components/NotificationPrompt.tsx` — visual treatment/placement only; no subscription/API logic changes.
- `src/components/AddToHomeBanner.tsx` — visual treatment/placement only; no install/dismiss logic changes.
- `src/components/CookieConsentBanner.tsx` — visual treatment/placement only; no consent logic changes.
- `src/app/layout.tsx` — only if needed to render global banners in a shared non-overlapping stack; no metadata, provider, routing, or security changes.
- Optional small helper: `src/components/GlobalBannerStack.tsx` if a shared fixed banner lane is cleaner than duplicating offsets in each banner.
- `PRODUCT.md` already added as a planning/context markdown artifact.

## Files / areas not to modify
- Auth files and routes (`src/app/auth/**`, auth config, session/security providers).
- Booking flow internals (`src/components/BookingForm*`, `BookingPage`, booking services, waitlist/booking modals, booking data/prices).
- Admin/dashboard/pannello routes.
- API routes, database, migrations, env files, deploy config, dependencies.
- Navbar/Footer redesign. They should remain visually as-is except for avoiding banner overlap if layout coordination is necessary.
- `src/components/BookingInfoBanner.tsx` is currently unused; leave it untouched unless it becomes part of the visible banner stack.

## Reuse
- `src/components/BookingButton.tsx` for booking CTAs linking to `/prenota`; preserve link behavior.
- Existing homepage media in `public/`: `videoLoopCompresso.mp4`, `sediaOro.webp`, `taglio1.webp`, `taglio2.webp`, `servizi-*.webp`, `prodotti.webp`.
- Existing brand font utilities from `tailwind.config.ts` and `src/styles/fonts.css` (`font-alien`).
- Existing Christmas wrapper logic: `src/components/ChristmasDecorations.tsx` and `src/config/christmas-theme` must keep working.
- Existing service truth from `src/data/booking.ts`: taglio is central; barba/taglio+barba exist but should not dominate homepage messaging.

## Implementation steps
- [ ] Preflight checkpoint: run `git status --short`; save/checkpoint current untracked `.pi/`, `AGENTS.md`, `PRODUCT.md`, and this plan before editing UI files. Do not include `.env` or credential files.
- [ ] Establish a shared banner direction: black/gold premium styling, compact language, consistent radius/borders/shadows, safe-area-aware spacing, and no blue/purple notification styling.
- [ ] Update the homepage price banner in `src/app/page.tsx` to match the new banner language while preserving the same message and `/servizi` link.
- [ ] Adjust global visible banners (`PushNotificationBanner`, `NotificationPrompt`, `AddToHomeBanner`, `CookieConsentBanner`) so they stack predictably and do not overlap each other, the navbar, or mobile safe areas. Keep their existing show/dismiss/API behavior.
- [ ] Refine the hero minimally: preserve video + centered logo + centered statement; tune overlay, CTA spacing, and microcopy for bold/luxury readability.
- [ ] Rework homepage sections for premium hierarchy: fewer repeated cards, stronger editorial rhythm, real images as the main visual material, consistent gold CTA language.
- [ ] Rebalance services preview around hair/taglio/styling; keep beard as a secondary/supporting mention, not the main narrative.
- [ ] Replace emoji-driven benefits with premium iconography or typographic markers using existing SVG/Tailwind, without adding libraries.
- [ ] Polish responsive behavior: mobile heading scales, button wrapping, no horizontal overflow, sufficient contrast, no text hidden by banners.
- [ ] Final review: ensure no forbidden files/logic were touched and prepare diff summary.

## Risks
- Banner stacking touches global UI components and may affect other pages; keep changes visual/placement-only and verify homepage plus at least one internal page.
- Multiple notification prompts currently exist (`PushNotificationBanner` and `NotificationPrompt`); do not change their business logic, only prevent visual collision.
- Christmas decorations use very high z-index for snow/lights; if active, they may still visually sit above banners by design. Avoid changing Christmas logic unless a visible overlap is directly caused by homepage/banner styling.
- `npm run lint` may be unreliable because the script uses `next lint`; record actual result if it fails due to tooling.

## Verification
- `npm run lint` if available/working in this repo.
- `npm run build` if feasible after implementation.
- `node .agents/skills/impeccable/scripts/detect.mjs --json src/app/page.tsx` after UI changes.
- Manual responsive checks at mobile, tablet, desktop widths:
  - hero video/logo/copy stay centered and readable;
  - price banner does not collide with navbar/hero;
  - global banners can appear together without overlap;
  - CTAs and links still target `/prenota`, `/servizi`, `/chi-siamo`, `/testimonianze`, `/contatti`;
  - no horizontal overflow and no clipped text.
- Manual banner-state checks by clearing relevant localStorage keys in dev only: cookie consent, add-to-home, notification prompt, push banner dismissal.
- Confirm no auth, booking logic, API, database, dependency, env, deploy, or admin files changed.

## What remains unchanged
- Hero concept: video background, centered logo, centered message.
- Booking route and booking business logic.
- Service prices/data and barber data.
- Auth/session/security behavior.
- API routes, database schema, environment files, dependencies, deploy configuration.
- Navbar/Footer overall structure and routing.
