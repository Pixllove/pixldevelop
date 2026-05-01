# Pixl Develop — React + Vite + Tailwind Website

A modern, fully-animated IT company website built with React, Vite, and Tailwind CSS.

## Tech Stack

- **React 18** — UI framework
- **Vite 5** — Lightning-fast build tool
- **Tailwind CSS 3** — Utility-first styling
- **Framer Motion** — Smooth animations
- **React Router v6** — Client-side routing
- **React Helmet Async** — SEO meta management
- **React Intersection Observer** — Scroll-triggered animations

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev

# 3. Build for production
npm run build

# 4. Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── Navbar.jsx          # Sticky animated navbar, mobile menu
│   │   └── Footer.jsx          # Full footer with social links
│   ├── sections/
│   │   ├── Hero.jsx            # Full-screen hero with orbs & animations
│   │   ├── Services.jsx        # 4 service cards with hover glows
│   │   ├── TechMarquee.jsx     # Scrolling tech stack ticker
│   │   ├── Process.jsx         # 4-step process section
│   │   ├── WebDesignShowcase.jsx # Design style cards
│   │   ├── Storybrand.jsx      # Without vs With storytelling
│   │   ├── FreeReport.jsx      # Downloadable report CTA
│   │   └── Testimonials.jsx    # 3 client testimonials
│   └── ui/
│       ├── CustomCursor.jsx    # Smooth trailing cursor (desktop)
│       └── AnimatedSection.jsx # Scroll animation utilities
├── pages/
│   ├── Home.jsx                # Homepage — all sections
│   ├── Expertise.jsx           # Deep dive into services
│   ├── Pricing.jsx             # 3 plans + FAQ accordion
│   └── Contact.jsx             # Contact form + info
└── index.css                   # Global styles, Tailwind layers
```

## Color Palette

| Token | Value | Use |
|-------|-------|-----|
| `brand-bg` | `#0a0a0f` | Main background |
| `brand-bgAlt` | `#0f0f1a` | Cards, sections |
| `brand-purple` | `#a855f7` | Primary accent |
| `brand-purple-light` | `#c084fc` | Hover states |
| `brand-pink` | `#ec4899` | Secondary accent |
| `brand-accent` | `#e879f9` | Highlights |

## Customization

### Contact Form
The contact form in `src/pages/Contact.jsx` uses a simulated submit. To connect it:
1. Sign up at [EmailJS](https://emailjs.com)
2. Install: `npm install @emailjs/browser`
3. Replace the `handleSubmit` function with EmailJS send call

### Analytics
Add your GA4 or Plausible snippet to `index.html` before `</head>`.

### Fonts
Using Google Fonts: Space Grotesk (display), DM Sans (body), JetBrains Mono (code).
Edit in `index.html` and `tailwind.config.js`.

## SEO

- Helmet meta tags on every page
- JSON-LD structured data in `index.html`
- Canonical URLs on all routes
- Semantic HTML throughout
- All images should have `alt` attributes

## Performance

- Code splitting via Vite `manualChunks`
- Animations respect `prefers-reduced-motion`
- Custom cursor disabled on touch devices
- Fonts loaded with `display=swap`
- Lazy-loadable sections via Intersection Observer
