# TimeCraft Repairs — Watch & Jewellery Repair Shop Website

A clean, elegant, trust-focused static website for a watch and jewellery repair shop. Built with HTML5, CSS3, Bootstrap 5, and vanilla JavaScript — no backend required.

## Features

- **11 public pages** — Home, About, Services, Service Details, Booking, Pricing, Blog, Blog Detail, Contact, 404, Coming Soon
- **Dark / Light mode** — CSS variables with localStorage persistence
- **RTL support** — Full right-to-left layout via `rtl.css`
- **Form validation** — Client-side validation on booking and contact forms with confirmation messages
- **Responsive design** — Mobile (< 640px), Tablet (640–1024px), Desktop (1024–1280px), Large (> 1280px)
- **Accessibility** — WCAG 2.1 AA: skip links, focus states, semantic HTML, ARIA labels
- **SEO ready** — Unique meta tags, JSON-LD on index, `sitemap.xml`, `robots.txt`
- **Premium hover effects** — Card lift, button scale, nav underline slide, image zoom

## Tech Stack

| Technology | Purpose |
|---|---|
| HTML5 | Semantic page structure |
| CSS3 + Bootstrap 5.3.3 | Layout and components |
| CSS Variables | Theming and dark mode |
| Google Fonts | Libre Baskerville + Lato |
| Font Awesome 6.5.1 | Icons |
| JavaScript ES6+ | Dark mode, validation, filters, countdown |

## Project Structure

```
watch-repair/
├── assets/
│   ├── css/
│   │   ├── style.css          Main stylesheet
│   │   ├── dark-mode.css      Dark theme overrides
│   │   └── rtl.css            RTL layout support
│   ├── js/
│   │   ├── main.js            Custom JavaScript
│   │   └── plugins/           Plugin directory
│   ├── images/                Local image assets
│   └── fonts/                 Local font files
├── pages/
│   ├── index.html             Home page
│   ├── about.html             About us
│   ├── services.html          Services listing
│   ├── service-details.html   Single service detail
│   ├── booking.html           Appointment booking
│   ├── pricing.html           Pricing tables
│   ├── blog.html              Blog listing
│   ├── blog-details.html      Blog article
│   ├── contact.html           Contact page
│   ├── 404.html               Error page
│   └── coming-soon.html       Coming soon page
├── documentation/
│   ├── installation-guide.txt
│   ├── customization-guide.txt
│   └── credits.txt
├── sitemap.xml
├── robots.txt
└── README.md
```

## Quick Start

1. Clone or download this project
2. Open `pages/index.html` in a browser, or run a local server:

```bash
cd watch-repair
python -m http.server 8080
# Visit http://localhost:8080/pages/index.html
```

3. See `documentation/installation-guide.txt` for deployment and integration steps

## Integration Placeholders

Before going live, replace these placeholders:

| Placeholder | File(s) | Service |
|---|---|---|
| `YOUR_FORM_ID` | booking.html, contact.html | [Formspree](https://formspree.io) |
| `YOUR-MAILCHIMP-URL` | index.html, coming-soon.html | [Mailchimp](https://mailchimp.com) |
| Google Maps iframe | booking.html, contact.html | [Google Maps Embed](https://maps.google.com) |
| `timecraftrepairs.com` | sitemap.xml, robots.txt, JSON-LD | Your domain |

## Color Scheme

| Variable | Value | Usage |
|---|---|---|
| `--color-primary` | `#B8860B` | Gold accents, buttons |
| `--color-bg` | `#FAFAF8` | Page background |
| `--color-text` | `#1C1C1C` | Body text |
| `--color-section` | `#E8E8E8` | Section backgrounds |
| `--color-card-bg` | `#FFFFFF` | Card backgrounds |

## Browser Support

Tested on Chrome, Firefox, Safari, and Edge (latest versions).

## License

Template code is free to use and modify. Third-party assets (Bootstrap, Font Awesome, Google Fonts, Unsplash images) are subject to their respective licenses — see `documentation/credits.txt`.
