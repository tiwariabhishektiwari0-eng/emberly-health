# Emberly Health — Cloudflare Pages Deployment Guide

> **For non-developers.** Follow these steps in order. No prior deployment experience required.

---

## Overview

The site is hosted **free** on Cloudflare Pages. Every time you push code to GitHub, the site rebuilds and deploys automatically in about 60 seconds.

---

## Step 1 — Create a GitHub Account (if you don't have one)

1. Go to [github.com](https://github.com) and click **Sign up**
2. Choose a free plan
3. Verify your email address

---

## Step 2 — Push the Project to GitHub

On your computer, open **PowerShell** inside the project folder (`c:\webApp`):

```powershell
# Set Node.js path (required first)
$env:PATH = "$env:LOCALAPPDATA\Programs\nodejs;$env:PATH"

# Initialize git repository
git init
git add .
git commit -m "Initial commit: Emberly Health marketing website"

# Create a new repository on GitHub (go to github.com → New Repository → name it "emberly-health")
# Then link and push:
git remote add origin https://github.com/YOUR_USERNAME/emberly-health.git
git branch -M main
git push -u origin main
```

> Replace `YOUR_USERNAME` with your actual GitHub username.

---

## Step 3 — Create a Free Cloudflare Account

1. Go to [cloudflare.com](https://cloudflare.com) and click **Sign Up**
2. Complete the free account registration
3. You do **not** need to purchase any plan — the free tier is sufficient

---

## Step 4 — Connect Your GitHub Repository to Cloudflare Pages

1. Log into [Cloudflare Dashboard](https://dash.cloudflare.com)
2. In the left sidebar, click **Workers & Pages**
3. Click **Create Application** → **Pages** tab → **Connect to Git**
4. Authorize Cloudflare to access your GitHub account
5. Select your `emberly-health` repository
6. Click **Begin Setup**

---

## Step 5 — Configure Build Settings

In the Cloudflare Pages setup wizard, enter exactly:

| Setting | Value |
|---|---|
| **Production branch** | `main` |
| **Build command** | `npm run build` |
| **Build output directory** | `dist` |
| **Root directory** | *(leave blank)* |

---

## Step 6 — Add Environment Variables

Still in the Cloudflare Pages setup (or after deploy, go to **Settings → Environment Variables**):

Click **Add variable** for each of these:

| Variable Name | Where to Get It | Example |
|---|---|---|
| `NODE_VERSION` | Type `20` | `20` |
| `RESEND_API_KEY` | resend.com → API Keys | `re_AbCdEfGh...` |
| `TURNSTILE_SECRET_KEY` | Cloudflare Dashboard → Turnstile | `0x4AAAAAA...` |
| `PUBLIC_TURNSTILE_SITE_KEY` | Cloudflare Dashboard → Turnstile | `0x4AAAAAA...` |
| `CONTACT_TO_EMAIL` | Your recipient inbox | `hello@emberlyhealth.com` |
| `CONTACT_FROM_EMAIL` | Verified Resend sender | `notifications@emberlyhealth.com` |

> **Important**: Mark `RESEND_API_KEY` and `TURNSTILE_SECRET_KEY` as **Encrypted** for security.

### How to Get Resend Keys
1. Go to [resend.com](https://resend.com) → sign up free
2. Click **API Keys** → Create API Key → copy it
3. Click **Domains** → Add your domain (e.g., `emberlyhealth.com`) → follow DNS instructions
4. Once verified, set `CONTACT_FROM_EMAIL` to any address `@yourverifieddomain.com`

### How to Get Turnstile Keys
1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com) → **Turnstile** → **Add Site**
2. Enter `emberlyhealth.pages.dev` (or your custom domain) as the hostname
3. Choose **Managed** widget → Create
4. Copy both **Site Key** (public) and **Secret Key** (private)

---

## Step 7 — First Deployment

1. Click **Save and Deploy** in Cloudflare Pages
2. Watch the build log (takes about 60–90 seconds)
3. When complete, you'll see: `✅ Build Complete`
4. Click the generated URL (e.g., `emberly-health-abc.pages.dev`) to preview your live site

---

## Step 8 — Update the Contact Form Site Key

Open `src/components/forms/ContactForm.astro` in VS Code and replace the placeholder site key:

```diff
-const turnstileSiteKey = '0x4AAAAAAABxxPlaceholderSiteKey';
+const turnstileSiteKey = 'YOUR_ACTUAL_TURNSTILE_SITE_KEY';
```

Then commit and push to trigger a re-deployment:
```powershell
git add src/components/forms/ContactForm.astro
git commit -m "Set Turnstile site key for contact form"
git push
```

---

## Step 9 — Attach a Custom Domain (Free SSL)

1. In Cloudflare Pages → your project → **Custom Domains** tab
2. Click **Set up a custom domain**
3. Enter `emberlyhealth.com` (or `www.emberlyhealth.com`)
4. Follow the DNS instructions (if your domain is already on Cloudflare, this is automatic)
5. Cloudflare issues a **free SSL certificate** automatically — no setup needed
6. Both `http://` and `https://` will redirect to your secure site

### Update the Site URL in astro.config.mjs
Once you have a confirmed custom domain, update:
```js
// astro.config.mjs
export default defineConfig({
  site: 'https://emberlyhealth.com',  // replace with your actual domain
  ...
```

And update `robots.txt`:
```
Sitemap: https://emberlyhealth.com/sitemap-index.xml
```

---

## Step 10 — Ongoing Updates

Any time you want to update content:
1. Edit the appropriate file (e.g., a Markdown file in `src/content/`)
2. Commit and push:
```powershell
git add .
git commit -m "Update: [brief description of change]"
git push
```
3. Cloudflare automatically detects the push and redeploys within ~60 seconds

---

## Troubleshooting

| Problem | Solution |
|---|---|
| Build fails with "missing module" | Run `npm install` locally and push `package-lock.json` |
| Contact form not sending email | Check `RESEND_API_KEY` env var is set; verify sending domain in Resend |
| Turnstile widget not showing | Check `PUBLIC_TURNSTILE_SITE_KEY` is correct in `ContactForm.astro` |
| Site shows old content | Cloudflare deploys on git push — make sure you pushed latest commits |

---

## Local Preview Before Deploying

```powershell
$env:PATH = "$env:LOCALAPPDATA\Programs\nodejs;$env:PATH"
npm run build
npm run preview  # Opens at http://localhost:4321
```

---

*Questions? Contact your developer or reach out to Cloudflare support at support.cloudflare.com (free tier support available).*
