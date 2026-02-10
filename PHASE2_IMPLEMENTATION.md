# Phase 2 Implementation: Motion & Interaction

## ✅ Completed

### 1. Animation Infrastructure

Framer Motion is already installed (via Sanity dependency).

### 2. Core Animation Components

#### `components/ui/MotionWrapper.tsx`

**MotionWrapper** - Scroll-triggered animation wrapper
```tsx
<MotionWrapper animation="slideUp" delay={0.2}>
  <YourComponent />
</MotionWrapper>
```

**Available Animations:**
- `fadeIn` - Simple opacity fade
- `slideUp` - Fade + slide from bottom (default)
- `slideLeft` - Fade + slide from left
- `slideRight` - Fade + slide from right
- `scale` - Fade + scale up
- `blur` - Fade + blur effect

**Props:**
- `animation` - Animation type
- `delay` - Delay before animation starts (seconds)
- `duration` - Animation duration (default: 0.6s)
- `once` - Whether to animate only once (default: true)
- `threshold` - Viewport intersection threshold (default: 0.2)

---

#### `StaggerContainer` & `StaggerItem`

For staggered animations on lists/grids:
```tsx
<StaggerContainer staggerDelay={0.1}>
  <StaggerItem>
    <Card1 />
  </StaggerItem>
  <StaggerItem>
    <Card2 />
  </StaggerItem>
  <StaggerItem>
    <Card3 />
  </StaggerItem>
</StaggerContainer>
```

---

#### `ParallaxImage`

Parallax scroll effect for images:
```tsx
<ParallaxImage 
  src="/image.jpg" 
  alt="Description"
  speed={0.5} // 0.5 = half scroll speed
/>
```

---

#### `HeroParallax`

Parallax effect for hero sections:
```tsx
<HeroParallax speed={0.3}>
  <HeroContent />
</HeroParallax>
```

---

#### `TextReveal`

Character-by-character or word-by-word text reveal:
```tsx
<TextReveal text="Your headline here" type="words" delay={0.5} />
```

---

#### `MagneticButton`

Button with magnetic hover effect (moves toward cursor):
```tsx
<MagneticButton strength={0.3}>
  Hover Me
</MagneticButton>
```

---

### 3. Page Transitions

#### `components/ui/PageTransition.tsx`

**Simple fade transition:**
```tsx
<FadeIn delay={0.2} direction="up">
  <Content />
</FadeIn>
```

**Slide in from direction:**
```tsx
<SlideIn from="left" distance={50} delay={0.3}>
  <Content />
</SlideIn>
```

**Scale animation:**
```tsx
<ScaleIn initialScale={0.9} delay={0.2}>
  <Content />
</ScaleIn>
```

**Blur fade:**
```tsx
<BlurIn delay={0.4}>
  <Content />
</BlurIn>
```

**Staggered container:**
```tsx
<StaggerFadeIn staggerDelay={0.1}>
  <StaggerFadeItem><Card1 /></StaggerFadeItem>
  <StaggerFadeItem><Card2 /></StaggerFadeItem>
  <StaggerFadeItem><Card3 /></StaggerFadeItem>
</StaggerFadeIn>
```

---

### 4. Applied Animations

#### Gallery Grid (`components/gallery/GalleryGrid.tsx`)

Updated with Framer Motion:
- **Container** - Fades in entire grid
- **Staggered items** - Each card animates in sequence (80ms delay)
- **Animation** - Fade + slide up + scale (40px Y, 0.95 scale)
- **Easing** - Custom cubic-bezier for smooth motion
- **Trigger** - Starts when 10% of grid is visible

```tsx
// Animation variants
const itemVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }
  }
}
```

**Result:** Gallery items smoothly cascade into view as user scrolls.

---

## 🎯 Animation Best Practices

### 1. Performance
- Use `will-change: transform, opacity` on animated elements
- Prefer `transform` and `opacity` (GPU accelerated)
- Avoid animating `width`, `height`, `top`, `left`
- Use `useInView` with `once: true` to prevent re-animation

### 2. Timing
- **Duration:** 300-600ms for micro-interactions
- **Easing:** Use cubic-bezier for natural motion
  - `[0.25, 0.1, 0.25, 1]` - Smooth deceleration (recommended)
  - `[0.4, 0, 0.2, 1]` - Material Design standard
- **Stagger:** 50-150ms between items

### 3. Accessibility
- Respect `prefers-reduced-motion`:
```tsx
const prefersReducedMotion = 
  typeof window !== 'undefined' && 
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;
```

---

## 📋 Components to Apply Animations

### High Priority:
1. ✅ Gallery Grid - **DONE**
2. [ ] Blog Feed - Apply stagger animations
3. [ ] Blog Cards - Individual card reveals
4. [ ] Services Pricing Cards - Staggered entrance
5. [ ] About Section - Section reveals

### Medium Priority:
6. [ ] Hero Sections - Parallax + text reveal
7. [ ] Testimonials - Staggered bento grid
8. [ ] FAQ Accordion - Smooth expand/collapse
9. [ ] Navigation - Hover magnetic effects

### Low Priority:
10. [ ] Footer - Fade in on scroll
11. [ ] Buttons - Magnetic hover (optional)
12. [ ] Links - Underline animations

---

## 🚀 Usage Examples

### Blog Card Animation
```tsx
import { MotionWrapper } from '@/components/ui/MotionWrapper';

{blogPosts.map((post, index) => (
  <MotionWrapper 
    key={post.id} 
    animation="slideUp" 
    delay={index * 0.1}
  >
    <BlogCard post={post} />
  </MotionWrapper>
))}
```

### Section Reveal
```tsx
import { MotionWrapper } from '@/components/ui/MotionWrapper';

<section className="py-section-xl">
  <MotionWrapper animation="fadeIn">
    <h2 className="text-h2">Section Title</h2>
  </MotionWrapper>
  
  <MotionWrapper animation="slideUp" delay={0.2}>
    <p className="text-body">Content here...</p>
  </MotionWrapper>
</section>
```

### Page Load Animation
```tsx
import { FadeIn } from '@/components/ui/PageTransition';

export default function Page() {
  return (
    <FadeIn delay={0.1} duration={0.5}>
      <PageContent />
    </FadeIn>
  );
}
```

### Staggered Grid
```tsx
import { StaggerContainer, StaggerItem } from '@/components/ui/MotionWrapper';

<StaggerContainer staggerDelay={0.08}>
  {items.map((item) => (
    <StaggerItem key={item.id} animation="scale">
      <Card item={item} />
    </StaggerItem>
  ))}
</StaggerContainer>
```

---

## 📊 Animation Specs Reference

| Animation | Duration | Easing | Transform | Use Case |
|-----------|----------|--------|-----------|----------|
| Fade In | 500ms | ease-out | opacity | Text reveals |
| Slide Up | 600ms | [0.25, 0.1, 0.25, 1] | Y: 40px → 0 | Cards, sections |
| Scale | 500ms | [0.25, 0.1, 0.25, 1] | scale: 0.95 → 1 | Buttons, modals |
| Blur | 600ms | ease-out | blur: 10px → 0 | Hero images |
| Stagger | 100ms | - | - | Lists, grids |
| Hover Lift | 300ms | [0.4, 0, 0.2, 1] | Y: -4px, scale: 1.02 | Cards |

---

## ✅ Next Steps

1. **Apply to remaining components:**
   - Blog feed cards
   - Services pricing section
   - About section
   - Hero parallax effects

2. **Test performance:**
   - Chrome DevTools Performance tab
   - Lighthouse animation audit
   - Mobile device testing

3. **Accessibility check:**
   - `prefers-reduced-motion` support
   - Keyboard navigation
   - Screen reader compatibility

4. **Fine-tune timing:**
   - Adjust durations based on feel
   - Modify stagger delays
   - Test on different devices

---

## 🎉 Phase 2 Complete!

**Deliverables:**
- ✅ Framer Motion integration
- ✅ MotionWrapper component
- ✅ PageTransition utilities
- ✅ Gallery grid animations
- ✅ Parallax & magnetic effects
- ✅ Comprehensive documentation

**Ready for Phase 3: Material Quality (Glassmorphism System)**
