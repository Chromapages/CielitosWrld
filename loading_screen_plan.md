# LoadingScreen.tsx Redesign — Implementation Plan

## Context

The loading screen is the **first impression** of Cielito's Wrld. It currently has 7 design/functionality issues that undermine the cinematic photography brand. This plan fixes every issue while elevating the component to match the site's premium aesthetic.

---

## Visual Overview

### Before → After Wireframe
![Before/After wireframe comparison showing all 7 fixes](loading_wireframe_before_after_1773602441354.png)

### Concept Mockups

````carousel
![Mobile concept — cinematic loading screen with script logo and orange progress bar](loading_mobile_concept_1773602394725.png)
<!-- slide -->
![Desktop concept — wider layout with centered ring and responsive progress bar](loading_desktop_concept_1773602408627.png)
````

---

## Issue Breakdown & Fixes

| # | Issue | Severity | Fix |
|---|-------|----------|-----|
| 1 | `font-space` class is undefined — status text falls back to default sans | **High** | Switch to `font-archivo` (exists in tailwind config) |
| 2 | Brand name "CIELITOSWRLD" in `font-archivo` doesn't match site identity "Cielito's Wrld" in `font-pattaya` | **Medium** | Use `font-pattaya` with proper brand spelling |
| 3 | SVG circle strokeWidth `0.5` is nearly invisible on mobile/OLED | **Medium** | Increase to `1.5` + add dim guide track ring |
| 4 | No responsive sizing — fixed `width="120"` SVG and fixed `w-48` progress bar | **Medium** | Use Tailwind responsive classes (`w-20 md:w-[120px]`) |
| 5 | No `prefers-reduced-motion` — animation plays even for motion-sensitive users | **High** | Add `useReducedMotion()` hook; disable all animations when active |
| 6 | No ARIA/accessibility — screen readers see nothing meaningful | **Medium** | Add `role="status"`, `aria-live`, `aria-label`, `sr-only` text |
| 7 | Plain white progress bar has no brand personality | **Low** | Orange gradient fill with subtle amber glow/bloom effect |

---

## Proposed Changes

### [MODIFY] [LoadingScreen.tsx](file:///Volumes/MiDRIVE/WORK/A-C/CIELITOSWRLD/web/CielitosWrld/components/LoadingScreen.tsx)

#### Fix 1: Replace `font-space` with `font-archivo`
```diff
- className="mt-4 font-space text-[10px] uppercase tracking-widest text-white/50"
+ className="mt-4 font-archivo text-[10px] uppercase tracking-widest text-white/50"
```

#### Fix 2: Use brand script logo instead of editorial treatment
```diff
- className="font-archivo text-2xl font-light tracking-[0.2em] text-white"
+ className="font-pattaya text-3xl md:text-4xl text-amber-500"
  ...
- CIELITOSWRLD
+ Cielito's Wrld
```

#### Fix 3: Thicker SVG stroke + guide track ring
```diff
+ {/* Guide track (dim background ring) */}
+ <circle cx="50" cy="50" r="45" stroke="white" strokeOpacity="0.1" strokeWidth="1.5" />
+ {/* Animated progress ring */}
  <motion.circle
    cx="50" cy="50" r="45"
-   stroke="white" strokeWidth="0.5"
+   stroke="white" strokeWidth="1.5" strokeLinecap="round"
    initial={{ pathLength: 0, rotate: -90 }}
    animate={{ pathLength: 1 }}
```

#### Fix 4: Responsive sizing
```diff
  <svg
-   width="120" height="120"
+   className="w-20 h-20 md:w-[120px] md:h-[120px]"
    viewBox="0 0 100 100"

  {/* Progress bar */}
- <div className="h-[1px] w-48 overflow-hidden bg-white/10">
+ <div className="h-[2px] w-3/4 max-w-xs md:max-w-sm overflow-hidden rounded-full bg-white/10">
```

#### Fix 5: `prefers-reduced-motion` support
Add a `useReducedMotion` check via `framer-motion`:
```tsx
import { useReducedMotion } from "framer-motion";

const prefersReducedMotion = useReducedMotion();

// Skip all animations when reduced motion is preferred
<motion.circle
  animate={prefersReducedMotion ? { pathLength: 1 } : { pathLength: 1 }}
  transition={prefersReducedMotion ? { duration: 0 } : { duration: 2, ease: "easeInOut" }}
/>
```

When `prefersReducedMotion` is true:
- All `transition.duration` → `0`
- Exit `clipPath` animation → instant opacity fade
- Progress bar fills instantly

#### Fix 6: ARIA accessibility
```diff
  <motion.div
+   role="status"
+   aria-live="polite"
+   aria-label={`Loading Cielito's Wrld — ${progress}% complete`}
    className="fixed inset-0 z-[9999] ..."
  >
+   <span className="sr-only">Loading Cielito's Wrld, {progress} percent complete</span>
```

#### Fix 7: Orange-branded progress bar with glow
```diff
- <motion.div className="h-full bg-white" .../>
+ <motion.div
+   className="h-full rounded-full bg-gradient-to-r from-amber-600 via-orange-500 to-amber-500"
+   style={{ boxShadow: "0 0 12px rgba(217, 119, 6, 0.5)" }}
+   ...
+ />
```

---

## Desktop vs Mobile Differences

| Aspect | Mobile (< 768px) | Desktop (≥ 768px) |
|--------|-------------------|---------------------|
| SVG ring | 80×80px | 120×120px |
| Brand text | `text-3xl` | `text-4xl` |
| Progress bar | `w-3/4` (≈ 75% vw) | `max-w-sm` (384px) |
| Status text | `text-[10px]` | `text-xs` |
| Exit animation | Opacity fade (faster) | ClipPath wipe (cinematic) |

---

## Verification Plan

### Automated
- `npm run build` — verify no TypeScript errors
- Grep for `font-space` — confirm zero remaining references

### Manual
- **Desktop**: Verify ring thickness, responsive bar width, brand script font, orange glow
- **Mobile (375px)**: Verify smaller ring, proportional bar, readable status text
- **Reduced motion**: Enable `prefers-reduced-motion: reduce` in browser DevTools → all animations should be instant
- **Screen reader**: Run VoiceOver on the loading screen → should announce "Loading Cielito's Wrld, X percent complete"
- **OLED**: Check ring visibility at minimum brightness

---

## Summary

Single file change to [LoadingScreen.tsx](file:///Volumes/MiDRIVE/WORK/A-C/CIELITOSWRLD/web/CielitosWrld/components/LoadingScreen.tsx). No new dependencies (uses existing `framer-motion` API). All 7 audit issues resolved. Brand identity aligned with the rest of the site.
