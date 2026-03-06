# Portfolio Conversion Plan — React + Vite + TypeScript + GSAP + Tailwind

## Overview

Convert Koladele Olaitan's static HTML portfolio into a modern, immersive React application with tour-like GSAP animations, Tailwind CSS styling, and comprehensive SEO. The site should feel like a cinematic journey through Koladele's career — not a typical scrolling website.

---

## Design Philosophy

- **Black & White only** — shades of black (#000, #0a0a0a, #111, #1a1a1a, #222, #333, #444, #555, #666, #777, #888, #999) and white (#fff, #fafafa, #f5f5f5, #eee, #ddd, #ccc)
- **No gradients** — use solid colors, borders, typography contrast, and whitespace
- **Fonts**: Ubuntu (body) + Varguina (headings/display)
- **Immersive tour feel** — full-screen sections, GSAP ScrollTrigger pinning, horizontal scrolls, text reveals, smooth transitions between "chapters"
- **Dark/Light mode** toggle preserved

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| React 18+ | UI framework |
| Vite | Build tool |
| TypeScript | Type safety |
| React Router v6 | Routing |
| GSAP + ScrollTrigger | Animations, scroll-driven storytelling |
| Tailwind CSS v3 | Utility-first styling |
| React Helmet Async | SEO meta tags, structured data |
| Sitemap + robots.txt | SEO crawlability |

---

## Pages & Sections

### 1. Home (`/`)
The main experience — a full tour through Koladele's world.

**Sections (each full-screen, scroll-triggered):**

1. **Intro/Landing** — Name reveal animation. "Koladele Olaitan" in massive Varguina font, letters animate in one by one. Role text ("Senior Frontend Engineer · Technical Lead") fades in below. Scroll indicator pulses at bottom.

2. **About** — Split screen. Left: portrait image with parallax. Right: bio text that types/reveals line by line as user scrolls. Key stats counter-animate (6+ years, 50+ enterprise clients, 50+ countries).

3. **Skills Marquee** — Horizontal infinite scroll of skills (like original but elevated). Skills float in 3D space. On scroll, they reorganize into categorized columns momentarily before resuming flow.

4. **Experience Timeline** — Horizontal scroll section (pinned). Each role is a "chapter card" that slides in from the right. Company name in massive type, role details animate in. Timeline line draws between cards.

5. **Projects Showcase** — Stacked cards that fan out on scroll. Each project card expands on hover/click to show details. Custom cursor preserved but elevated.

6. **Open Source** — Contribution graph visualization (styled, not GitHub embed). Repos listed with merge counts.

7. **Contact** — Full-screen with the name repeated as a huge watermark background. Form floats center. Social links orbit around the form on desktop.

### 2. Project Detail Pages (`/projects/:slug`)
- Individual project pages with full case study layout
- Hero image, tech stack, description, links
- Back navigation with page transition

### 3. 404 Page
- Creative "lost in the void" themed page
- Animated floating elements

---

## Animation Strategy (GSAP)

### Global
- **Page transitions**: Overlay wipe animation between routes
- **Smooth scroll**: GSAP ScrollSmoother or native smooth with ScrollTrigger
- **Custom cursor**: Follows mouse, changes state on interactive elements

### Section-specific
- **Intro**: `SplitText`-style letter animation on name, staggered fade for subtitle
- **About**: `scrub`-based text reveal, counter animation with `ScrollTrigger`
- **Skills**: CSS animation for marquee (performant), GSAP for reorganize effect
- **Experience**: Horizontal scroll via `ScrollTrigger.pin()` with `scrub: true`
- **Projects**: Cards use `ScrollTrigger` batch animations, stagger entry
- **Contact**: Parallax watermark text, form elements slide up on entry

---

## Project Structure

```
src/
├── assets/
│   ├── fonts/
│   │   └── Varguina/
│   └── images/
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── PageTransition.tsx
│   │   └── CustomCursor.tsx
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── SectionHeading.tsx
│   │   ├── ThemeToggle.tsx
│   │   └── ScrollIndicator.tsx
│   └── sections/
│       ├── Hero.tsx
│       ├── About.tsx
│       ├── Skills.tsx
│       ├── Experience.tsx
│       ├── Projects.tsx
│       ├── OpenSource.tsx
│       └── Contact.tsx
├── pages/
│   ├── Home.tsx
│   ├── ProjectDetail.tsx
│   └── NotFound.tsx
├── hooks/
│   ├── useGSAP.ts
│   ├── useTheme.ts
│   └── useMediaQuery.ts
├── context/
│   └── ThemeContext.tsx
├── data/
│   ├── experience.ts
│   ├── projects.ts
│   ├── skills.ts
│   └── seo.ts
├── types/
│   └── index.ts
├── utils/
│   └── animations.ts
├── styles/
│   └── fonts.css
├── App.tsx
├── main.tsx
└── robots.ts
public/
├── robots.txt
├── sitemap.xml
├── favicon.png
└── og-image.png
```

---

## SEO Strategy

### Structured Data (JSON-LD schemas on all pages)
- **Home**: `Person` + `WebSite` + `ProfilePage`
- **Projects**: `CreativeWork` for each project
- **404**: `WebPage`

### Meta Tags (via React Helmet Async)
- Open Graph tags
- Twitter Card tags
- Canonical URLs
- Description per page

### robots.txt
- Allow all crawlers
- Sitemap reference
- LLM-specific directives (ai.txt convention)

### Performance
- Image optimization (WebP, lazy loading)
- Code splitting per route
- Font preloading
- Lighthouse target: 90+ all categories

---

## Task Delegation

### Agent 1: Project Scaffolding & Config
- Initialize Vite + React + TypeScript
- Install all dependencies
- Configure Tailwind CSS
- Configure ESLint + TypeScript
- Set up font loading
- Create base layout structure

### Agent 2: Data Layer & Types
- Create TypeScript types
- Create data files (experience, projects, skills)
- Create SEO data and schemas
- Create robots.txt and sitemap

### Agent 3: Theme & UI Components
- ThemeContext with dark/light mode
- Header, Footer, Button, ThemeToggle
- CustomCursor component
- ScrollIndicator component
- PageTransition component

### Agent 4: Home Page Sections (Hero + About + Skills)
- Hero section with GSAP letter animation
- About section with scroll-triggered reveals
- Skills marquee section

### Agent 5: Home Page Sections (Experience + Projects + Contact)
- Experience horizontal scroll timeline
- Projects showcase with card animations
- Open Source section
- Contact section with form

### Agent 6: Additional Pages & Routing
- React Router setup
- Project detail pages
- 404 page
- Page transition animations

### Agent 7: SEO, Performance & Final Polish
- React Helmet Async integration
- JSON-LD structured data on all pages
- robots.txt / sitemap.xml
- Lighthouse audit fixes
- Build verification, lint fixes

---

## Execution Order

1. **Agent 1** runs first (scaffolding)
2. **Agents 2, 3** run in parallel after scaffolding
3. **Agents 4, 5** run in parallel after data + components ready
4. **Agent 6** runs after sections are built
5. **Agent 7** runs last for polish
