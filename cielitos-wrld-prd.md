# Cielito’s Wrld — Product Requirements Document

## 1. Overview  
**Cielito’s Wrld** is a retro-blog–style, photo-centric personal website showcasing photography, blog posts, and biographical info. It emphasizes earth-tone aesthetics, nostalgic Tumblr vibes, and seamless mobile navigation.

---

## 2. Goals & Success Metrics  
- **Showcase work**: Highlight photo galleries and video snippets.  
- **Engage visitors**: Continuous-scroll blog with threaded anonymous comments.  
- **Drive contact**: Prominent CTAs and easy-to-use contact form.  
- **Mobile first**: 80%+ sessions on mobile feel native and intuitive.

**Metrics:**  
- Gallery click-through rate ≥ 40%  
- Blog scroll depth (average session) ≥ 50%  
- Contact form submissions ≥ 5 per month  

---

## 3. Audience  
- Photography and retro-blog enthusiasts  
- Followers of Tumblr-style personal journals  
- Potential clients or collaborators seeking portfolio insight  

---

## 4. Branding & Visual Guidelines

### 4.1 Color Palette (Earth Tones)  
| Name   | Hex       | Usage                   |
|:------:|:---------:|:-----------------------:|
| Sage   | `#33361c` | Background, accents     |
| Mud    | `#371d13` | Text, headers           |
| Orange | `#822c01` | CTAs, highlights        |
| Moss   | `#2c3325` | Borders, hover states   |

### 4.2 Typography  
- **Headings**: Fitzgerald Bold Italic (contrast-aware color)  
- **Subtitles**: Fitzgerald Regular (contrast-aware color)  
- **Body**: Inter Regular (high readability)

### 4.3 Theme & Style  
- **Theme**: Photocentric → images are primary  
- **Style**: Retro Blog (Tumblr-inspired)  
- **Layout Notes**:
  - Text sections: images placed around outer perimeter  
  - Lightbox modal for gallery items  
  - Bottom navigation bar on mobile only  

---

## 5. Technical Requirements  
- **Framework**: Next.js with TypeScript  
- **Styling**: Tailwind CSS (mobile-first, utility-driven)  
- **Lightbox**: Accessible JS lightbox plugin with swipe support  
- **Comments**: Embedded anonymous thread (e.g., Disqus Anonymous or custom script)  
- **Form Handling**: Serverless email-forwarding (no database)  
- **Build & Deploy**: Vercel platform with CI/CD on git push  

---

## 6. Page Specifications

### 6.1 Home  
1. **Hero Section**  
   - Full-width video background on mobile; static image fallback on desktop  
   - Overlay title “Cielito’s Wrld” in Fitzgerald Bold Italic  
2. **About Me Snippet**  
   - 2–3 sentence intro  
   - Circular portrait thumbnail  
3. **Gallery Snippet**  
   - 4–6 clickable thumbnails (masonry crop)  
   - “View Gallery” CTA button in Orange  
4. **Video Snippet**  
   - Embedded YouTube or self-hosted reel  
5. **Reviews (optional)**  
   - Carousel of testimonials  
6. **CTA Section**  
   - “Contact Me” button anchored to Contact page  

### 6.2 Gallery  
- **Layout**: Masonry grid with mixed aspect ratios  
  - Ratios: 2:3, 16:9, 1:1, 3:2, 4:5, 5:4  
- **Item Card**:  
  - Hover: slight scale-up + Mud border  
  - Caption below each image  
- **Lightbox**:  
  - Next/Prev arrows, close “×” button  
- **Tabs**:  
  - “Photos” | “Videos”  
  - Video items embed YouTube links  

### 6.3 Blog  
- **Style**: Single-column, continuous scroll (Tumblr feed)  
- **Post Preview**:  
  - Title (Fitzgerald Bold Italic)  
  - Date & “Read more” link  
  - Excerpt + featured image  
- **Comments**: Threaded, anonymous (no login)  
- **Retro UI touches**:  
  - Pixel–style dividers, soft vignette edges  

### 6.4 About Me  
- **Header Image**: Stylized “R2” portrait  
- **Bio**: One-paragraph history, wrapped around portrait  
- **Layout**: Text on left or right, image opposite  

### 6.5 Contact  
- **Contact Info**:
  - Email, phone, location text  
  - Social icons: Instagram & Threads  
- **Contact Form**:
  - Fields: Name, Email, Message  
  - On submit: sends email to site owner (serverless)  

---

## 7. Mobile-Only Features  
- **Bottom Navbar**:
  - Icons: Home, Gallery, Blog, About, Contact  
  - Sticky at viewport bottom  
- **Gallery**:  
  - Instagram-style grid (3 columns)  
  - Tap to open lightbox  
- **Blog**:  
  - Tumblr-style infinite scroll  
  - “Back to top” floating button  
- **Hero**:  
  - Fullscreen muted video background (autoplay loop)  

---

## 8. Accessibility & Performance  
- **Contrast**: WCAG AA compliance on text  
- **Lazy-load**: Images/videos below the fold  
- **ARIA**: Lightbox and nav accessible  
- **SEO**: Semantic HTML, page titles, meta descriptions  

---

## 9. Deployment & Hosting  
- **Hosting**: Vercel (Next.js optimized)  
- **CI/CD**: Automatic on merge to main  
- **SSL**: Managed via Let’s Encrypt  

---

## 10. Future Enhancements  
- Portfolio filter by category  
- Dark mode toggle  
- Newsletter signup integration  
