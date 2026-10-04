# Emberly Health — Pre-Launch Checklist

> **MANDATORY**: Complete every item on this list before going live commercially.  
> Items marked 🔴 are **critical** — the site must not launch without resolving them.  
> Items marked 🟡 are **important** — should be addressed but some may be scheduled post-launch.

---

## 🔴 SECTION 1 — Contact Details (Replace Placeholder Info)

All contact information throughout the site is fictional/placeholder. Replace before launch.

| Location | Placeholder | Required Action |
|---|---|---|
| `src/components/common/Footer.astro` | Address: 2400 Meridian Park Drive, Suite 310, Plano, TX 7999 | Replace with real business address |
| `src/components/common/Footer.astro` | Phone: (214) 555-0147 | Replace with real business phone number |
| `src/components/common/Footer.astro` | Email: hello@emberlyhealth.com | Confirm this inbox exists and is monitored |
| `src/components/forms/LocationCard.astro` | All contact details (address, phone, email, hours) | Replace all placeholder values |
| `src/components/forms/LocationCard.astro` | "Get directions" Google Maps link | Update URL to real verified address |
| `src/pages/contact.astro` | All contact details | Verify they match footer and location card |
| `src/components/common/Header.astro` | Phone: (214) 555-0147 (mobile drawer) | Update to real number |
| `src/pages/privacy-policy.astro` | privacy@emberlyhealth.com | Replace with monitored inbox |
| `src/pages/terms-of-use.astro` | legal@emberlyhealth.com | Replace with monitored inbox |
| `src/pages/hipaa-notice.astro` | compliance@emberlyhealth.com | Replace with monitored inbox |
| `src/content/roles/billing-specialist.md` | careers@emberlyhealth.com | Replace with real recruiter email |

**Primary Contact Person:**
- `Daniela Reyes, Director of Client Success` — Replace with real staff member's name or remove if fictional

---

## 🔴 SECTION 2 — API Keys & Cloudflare Configuration

| Action | Status | Notes |
|---|---|---|
| Create Resend account at resend.com | ☐ | Free tier: 3,000 emails/month |
| Verify sending domain in Resend DNS | ☐ | Required before emails will send |
| Set `RESEND_API_KEY` in Cloudflare Pages environment variables | ☐ | Mark as encrypted/secret |
| Set `CONTACT_FROM_EMAIL` to verified Resend sender address | ☐ | Must be on verified domain |
| Set `CONTACT_TO_EMAIL` to inbox receiving form submissions | ☐ | Test delivery after setting |
| Create Cloudflare Turnstile widget at dash.cloudflare.com → Turnstile | ☐ | Free, no limits |
| Set `TURNSTILE_SECRET_KEY` in Cloudflare Pages env variables | ☐ | Mark as encrypted |
| Replace Turnstile Site Key in `src/components/forms/ContactForm.astro` | ☐ | Current value is placeholder |
| Set `NODE_VERSION=20` in Cloudflare Pages env variables | ☐ | Required for build |
| Update `site:` URL in `astro.config.mjs` to real domain | ☐ | Affects sitemap & canonical URLs |
| Update sitemap URL in `public/robots.txt` | ☐ | Change emberlyhealth.pages.dev to real domain |

---

## 🔴 SECTION 3 — Legal Pages (Attorney Review Required)

> **CRITICAL**: Every legal page is a **template flagged for review**. They must be reviewed, customized, and approved by a licensed healthcare attorney before commercial publication.

| Page | Status | Required Action |
|---|---|---|
| `/privacy-policy` (`src/pages/privacy-policy.astro`) | ☐ Template | Have attorney review & approve full text |
| `/terms-of-use` (`src/pages/terms-of-use.astro`) | ☐ Template | Have attorney review & approve full text |
| `/hipaa-notice` (`src/pages/hipaa-notice.astro`) | ☐ Template | Healthcare compliance counsel review required |
| About page data protection section (`src/pages/about.astro`) | ☐ Flagged | Legal review of "How We Protect Your Data" content |
| BAA process description in HIPAA notice | ☐ Flagged | Verify BAA template aligns with legal requirements |

**Important**: US federal law does not certify companies as "HIPAA certified." All copy says "HIPAA-aware protocols" which is appropriate — but verify with counsel.

---

## 🔴 SECTION 4 — Performance & KPI Claims (Flagged as Sample Data)

All metrics and benchmarks throughout the site are **sample figures only**. Replace with real verified historical data before publishing.

| Component | Placeholder Values | Required Action |
|---|---|---|
| `src/components/home/TrustMetrics.astro` | 98.4% clean claim rate, 18 days A/R, 24% denial reduction, 3-week onboarding | Replace with real historical client-verified statistics |
| All 8 service pages KPI benchmarks | Various sample benchmarks marked with `*` | Replace with verified, documentable operational statistics |
| All 9 specialty pages `sampleBenchmark` field | Sample figures | Replace with verified specialty-specific metrics |
| `src/components/home/WhyEmberly.astro` | 4 differentiator claims marked with `*` | Verify & document each claim with legal before publishing |
| Hero section "98.4% Clean Claims*" SVG label | Sample metric | Update SVG label text in `HeroSection.astro` |

---

## 🟡 SECTION 5 — Social Proof & Testimonials (Replace Before Launch)

| Location | Placeholder | Required Action |
|---|---|---|
| `src/components/home/Testimonials.astro` | 3 sample testimonials with fictional doctor names | Replace with real client-approved quotes and permissions |
| Testimonials: Dr. Karen Mitchell MD* | Fictional character | Delete or replace with consented real client |
| Testimonials: Robert Chen MHA* | Fictional character | Delete or replace with consented real client |
| Testimonials: Sarah Jenkins CPC* | Fictional character | Delete or replace with consented real client |

---

## 🟡 SECTION 6 — Leadership Team (If Fictional — Replace or Remove)

| Location | Placeholder | Required Action |
|---|---|---|
| `src/pages/about.astro` — Daniela Reyes | Real person - verify current role | Confirm real person's name, title, and bio accuracy |
| `src/pages/about.astro` — Marcus Vance | Fictional name | Replace with real staff or remove |
| `src/pages/about.astro` — Dr. Eleanor Wright MD CPC* | Fictional name | Replace with real credentialed staff or remove |
| `src/pages/about.astro` — Thomas Chen | Fictional name | Replace with real staff or remove |

---

## 🟡 SECTION 7 — Careers & Job Openings

| Location | Placeholder | Required Action |
|---|---|---|
| `src/content/roles/medical-coder.md` | Sample job posting | Update with real requirements and active status |
| `src/content/roles/billing-specialist.md` | Sample job posting | Update or mark as "Position Closed" if not hiring |
| `src/content/roles/client-success-manager.md` | Sample job posting | Update with real requirements and compensation range |
| All roles apply email: `careers@emberlyhealth.com` | Placeholder | Confirm inbox exists and is monitored |

---

## 🟡 SECTION 8 — SEO & Social Metadata

| Item | Status | Action |
|---|---|---|
| Update `site:` in `astro.config.mjs` to production URL | ☐ | Required for correct sitemap & canonical URLs |
| Generate real Open Graph image (`public/og-image.png`) | ☐ | Current favicon.svg is used as placeholder |
| Create `public/favicon.ico` (PNG raster fallback) | ☐ | For legacy browser support |
| Verify all page meta descriptions are unique and accurate | ☐ | Check all `<BaseLayout>` calls |
| Submit sitemap to Google Search Console | ☐ | After launch: `https://yourdomain.com/sitemap-index.xml` |

---

## 🟡 SECTION 9 — Cloudflare Web Analytics (Recommended, Free)

| Item | Status | Action |
|---|---|---|
| Enable Cloudflare Web Analytics in Dashboard | ☐ | Free, cookieless analytics |
| Uncomment analytics script in `src/layouts/BaseLayout.astro` | ☐ | Add real analytics token |

---

## 🟡 SECTION 10 — Originality & Compliance Final Check

| Item | Status |
|---|---|
| All content verified as 100% original (not paraphrased from competitors) | ☐ |
| Zero patient PHI present anywhere in codebase | ☐ |
| No copyrighted stock imagery (only original inline SVGs used) | ☐ |
| No fabricated certifications or awards displayed | ☐ |
| All sample testimonials and metrics have clear disclaimers | ☐ |
| Privacy policy approved by attorney | ☐ |
| Terms of use approved by attorney | ☐ |
| HIPAA notice approved by healthcare compliance counsel | ☐ |

---

## Sign-Off

Before going live, confirm all 🔴 critical items are complete:

```
[ ] All real contact information is in place
[ ] Resend account created and domain verified
[ ] Cloudflare Turnstile site key updated in ContactForm.astro
[ ] All API keys set in Cloudflare Pages env variables
[ ] Contact form tested end-to-end (form → email received)
[ ] All legal pages reviewed and approved by attorney
[ ] Performance metrics replaced with real verified data
[ ] Real testimonials with written client consent in place
[ ] Production domain connected and SSL confirmed
[ ] Sitemap submitted to Google Search Console
```

**Authorized by:** ___________________________  
**Date:** ___________________________
