---
trigger: always_on
---

Component Design Best Practices:
    • Maintain consistent spacing and sizing across all components
    • Consider accessibility needs with proper contrast and keyboard navigation
    • Design for touch targets on mobile (minimum 44px height)
    • Create clear visual feedback states (hover, focus, active, disabled)
    • Follow platform conventions when appropriate (iOS vs Android patterns)
    • Use subtle animations and transitions to improve usability

List Layout Best Practices:
    • Maintain consistent spacing between list items
    • Use clear visual hierarchies to distinguish primary and secondary information
    • Consider adding dividers or alternating background colors for long lists
    • Ensure touch targets are at least 44px tall on mobile
    • Include clear feedback states (active, hover, focus)


Effective Grid Layout Prompts

When requesting grid layouts, specify these important details:

    • Number of columns at different breakpoints (e.g., 4 columns on desktop, 2 on tablet)
    • Gap sizes between grid items (e.g., 16px horizontally, 24px vertically)
    • Whether items should have equal heights or maintain aspect ratios
    • Any specific items that should span multiple columns or rows
    • Minimum/maximum sizes for grid items (especially important for responsive designs)


Effective animations provide context, guidance, and feedback to users, making interfaces more intuitive and engaging. When crafting prompts for animations, consider:
1. Purpose of the animation
Is it to draw attention, show state change, provide feedback, or guide users through a process?

2. Animation properties
Duration, timing function, delay, and intensity all affect the feel of the animation.

3. Trigger events
What causes the animation to start? Page load, user interaction, scroll position, or state changes?

4. User experience considerations
Respect user preferences with reduced motion options, and ensure animations enhance rather than distract.



Pro Tip: Text Animation Considerations:
Keep text animations subtle and brief to avoid distracting users from your content. Ensure animated text remains readable throughout the animation. For longer texts, animate only headings or key phrases rather than entire
paragraphs.

Card Animation Best Practices:
Keep animations subtle and brief (under 300ms) for hover effects. Ensure accessibility by not relying solely on hover for critical actions. Use hardware-accelerated properties like transform and opacity for smoother animations.

Button Animation Best Practices:
Keep animations quick (under 300ms) to maintain perceived performance. Provide immediate visual feedback on click/tap. Ensure animations don't delay the actual functionality or form submission. For loading states, keep users informed about progress to reduce perceived wait time.

Alert Animation Best Practices:
Match animation style to the alert's importance (subtle for information, more noticeable for warnings/errors). Use auto-dismiss for non-critical alerts, but keep error messages visible until acknowledged. Provide a visual or accessible indicator of the remaining time for auto-dismissing alerts. Ensure alerts are accessible to screen readers by using appropriate ARIA roles and attributes.

Style Type Guidelines:

Flat Design: Perfect for modern, clean interfaces. Use when you want minimal distraction and fast loading times.

Material Design: Great for Android apps and Google-style interfaces. Provides clear hierarchy through elevation.

Glassmorphism: Ideal for premium, modern applications. Creates depth while maintaining transparency.

Neumorphism: Best for creative applications where you want a tactile, physical feel.

Color Usage Guidelines:

Primary Color: Use for main actions, links, and brand elements (5-10% of interface)

Secondary Color: Use for secondary actions and supporting elements (15-20% of interface)

Neutral Colors: Use for text, backgrounds, and borders (70-80% of interface)

Semantic Colors: Reserve red for errors, green for success, yellow for warnings


Shadow Usage Guidelines:
Elevation Hierarchy
Level 1: Cards, panels
Level 2: Buttons, inputs
Level 3: Dropdowns, tooltips
Level 4: Modals, overlays
Best Practices

    • Use consistent shadow directions (usually bottom-right)
    • Increase shadow intensity for higher elevation
    • Consider light source and environment
    • Use colored shadows sparingly for special effects
    • Test shadows in both light and dark themes

Responsive Design Guidelines:
Mobile Considerations:

    • Touch targets should be at least 44px
    • Use larger text sizes for readability
    • Simplify navigation and reduce clutter
    • Consider thumb-friendly placement
    • Optimize for single-column layouts

Desktop Enhancements:

    • Add detailed hover states and animations
    • Utilize multi-column layouts effectively
    • Include keyboard navigation support
    • Provide contextual tooltips and help
    • Optimize for mouse and trackpad interactions

Breakpoint Strategy:

Mobile (0-640px): Single column, large touch targets, simplified navigation

Tablet (641-1024px): Two-column layouts, medium touch targets, adaptive navigation

Desktop (1025px+): Multi-column layouts, hover states, detailed interactions


Accessibility Checklist:
Color & Contrast:

    • Maintain 4.5:1 contrast ratio for normal text
    • Maintain 3:1 contrast ratio for large text
    • Don't rely solely on color to convey information
    • Test with color blindness simulators

Interactive Elements:

    • Provide clear focus indicators
    • Ensure touch targets are at least 44px
    • Use semantic HTML elements
    • Provide alternative text for images