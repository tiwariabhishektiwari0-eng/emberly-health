# Emberly Health — Developer README

## Quick Start

### Prerequisites
- **Node.js**: v20+ (LTS) — installed at `%LOCALAPPDATA%\Programs\nodejs`
- **npm**: v10+
- The local Node.js portable installation is at `C:\Users\<you>\AppData\Local\Programs\nodejs`

### Setting PATH for Node (Windows PowerShell)
Each new PowerShell session requires the Node path to be set (or add it permanently via Windows System Environment Variables):
```powershell
$env:PATH = "$env:LOCALAPPDATA\Programs\nodejs;$env:PATH"
```

---

## Development Commands

| Command | Purpose |
|---|---|
| `npm run dev` | Start Astro dev server at `http://localhost:4321` |
| `npm run build` | Build production static files to `dist/` |
| `npm run preview` | Preview the built `dist/` folder locally |
| `npm run deploy` | Deploy `dist/` to Cloudflare Pages via Wrangler |
| `npm run pages:dev` | Test Cloudflare Pages Functions locally with Wrangler |

---

## Environment Variables

### For Contact Form to Work
The contact form uses **Cloudflare Turnstile** (free CAPTCHA) and **Resend** (free email API).

Create a local `.env` file in the project root for testing:
```env
RESEND_API_KEY=re_xxxxxxxxxxxx
TURNSTILE_SECRET_KEY=0x4AAAAAAAAAA...
PUBLIC_TURNSTILE_SITE_KEY=0x4AAAAAAAAAA...
CONTACT_TO_EMAIL=hello@emberlyhealth.com
CONTACT_FROM_EMAIL=notifications@yourverifeddomain.com
```

> **⚠️ NEVER commit `.env` to Git.** The `.gitignore` already excludes it.

### How to Get These Keys

#### Resend API (Free Tier — 3,000 emails/month)
1. Sign up at [resend.com](https://resend.com)
2. Go to **API Keys** → Create new key
3. Add a **Sending Domain** (your domain in DNS settings)
4. Set `RESEND_API_KEY=re_xxxx` and `CONTACT_FROM_EMAIL=notifications@yourdomain.com`
5. Set `CONTACT_TO_EMAIL` to the inbox that should receive form submissions

#### Cloudflare Turnstile (Free, no limits)
1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com) → **Turnstile**
2. Click **Add Site** → Choose "Managed" widget type
3. Copy **Site Key** → paste as `PUBLIC_TURNSTILE_SITE_KEY` in `.env` and in `ContactForm.astro`
4. Copy **Secret Key** → paste as `TURNSTILE_SECRET_KEY` in Cloudflare Pages env variables

---

## Project Structure

```
c:/webApp/
├── functions/api/contact.ts    # Cloudflare Pages Function (form backend)
├── public/                     # Static files served directly
│   ├── _headers               # Security & caching headers
│   ├── _redirects             # URL redirects
│   ├── robots.txt             # Search crawler directives
│   └── favicon.svg            # SVG brand mark
├── src/
│   ├── components/            # Astro components (Header, Footer, Forms, etc.)
│   ├── content/               # Markdown content (services, specialties, resources, roles)
│   ├── layouts/               # Page layouts (Base, Article)
│   ├── pages/                 # Routes (18+ pre-rendered pages)
│   └── styles/global.css      # Global CSS with Fontsource imports
├── astro.config.mjs           # Astro configuration
├── tailwind.config.mjs        # Design token configuration
└── tsconfig.json              # TypeScript strict config
```

---

## Brand & Design Tokens

| Token | Value | Usage |
|---|---|---|
| `emberly-orange` | `#F26B1D` | CTAs, accents, highlights |
| `emberly-charcoal` | `#3F4650` | Headings, body text |
| `emberly-dark-charcoal` | `#2B2F36` | Dark section backgrounds |
| `emberly-mid-gray` | `#6B7280` | Secondary text |
| `emberly-light-gray` | `#E5E7EB` | Borders, dividers |
| `emberly-warm-white` | `#FAF7F4` | Page canvas background |
| `emberly-orange-tint` | `#FFF1E8` | Badge & highlight fills |

Fonts: `Plus Jakarta Sans` (headings) + `Inter` (body) — both self-hosted via Fontsource, zero external runtime requests.

---

## Cloudflare Pages Function

The single Pages Function lives at `/functions/api/contact.ts`.

It handles:
1. Honeypot bot detection
2. Server-side input validation & HTML sanitization
3. Cloudflare Turnstile token verification
4. Email dispatch via Resend API
5. Returns JSON `{ success: true }` or `{ success: false, error: "..." }`

**No patient data is stored. Zero database.**

---

## NODE_VERSION for Cloudflare Pages

Set `NODE_VERSION=20` in your Cloudflare Pages project environment variables to pin the build runtime.

See `DEPLOY.md` for full step-by-step Cloudflare deployment instructions.

---

## Local Testing of Contact Form via Wrangler

```powershell
$env:PATH = "$env:LOCALAPPDATA\Programs\nodejs;$env:PATH"
npm run build  # Build first
npm run pages:dev  # Runs wrangler pages dev ./dist (serves the form function)
```

Then open `http://localhost:8788` — the contact form will call the live Pages Function locally.

---

## Cloudflare Web Analytics (Optional, Free, Cookieless)

To enable analytics, uncomment the script tag in `src/layouts/BaseLayout.astro`:
```html
<script defer src='https://static.cloudflareinsights.com/beacon.min.js'
  data-cf-beacon='{"token": "YOUR_CF_ANALYTICS_TOKEN"}'></script>
```
Get your token from Cloudflare Dashboard → **Web Analytics**.

---

## Originality & Legal

- All copy, SVGs, and code are 100% original — see `ORIGINALITY_NOTE.md`
- All placeholder content is tracked in `LAUNCH_CHECKLIST.md`
- Legal pages are marked as attorney-review templates
