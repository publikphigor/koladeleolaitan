# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static portfolio website for Koladele Olaitan (frontend engineer). No build tools, frameworks, or package manager — plain HTML, CSS, and vanilla JavaScript served directly.

## Architecture

- `index.html` — Single-page site with sections: hero, skills (auto-scrolling marquee), projects (with load-more), contact form, footer
- `css/style.css` — All styles, using CSS custom properties for theming (`--background`, `--black`, `--white`, `--text-color`). Responsive breakpoints at 820px and 520px
- `js/main.js` — Loaded with `defer`. Handles: mobile navbar toggle, light/dark theme switching (swaps CSS vars + image assets), project load-more, scroll progress bar, custom project cursor, copyright year
- `js/app.js` — Loaded synchronously, runs on `window.onload`. Handles contact form submission (validates email, POSTs to external mail server)
- `assets/` — Images, SVGs, and custom font (Varguina). Theme-variant assets use `-l` (light) and `-d` (dark) suffixes (e.g., `logo-l.png` / `logo-d.png`)

## Development

No build step. Open `index.html` in a browser or use any static file server:

```
python3 -m http.server 8000
```

## Key Patterns

- **Theme switching** is done by toggling CSS custom properties on `:root` AND swapping `src` attributes on all themed images (icons, logos, decorative SVGs). Both `setDarkTheme()` and `setLightTheme()` in `main.js` must be updated in sync when adding new themed elements.
- **Fonts**: Google Fonts (Ubuntu) loaded async with `preload`/`onload` pattern. Custom Varguina font loaded via `assets/fonts/Varguina/stylesheet.css`.
- **Contact form** sends data to an external PHP mail endpoint at `koladele.vickyabiodun.com`.
