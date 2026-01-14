# Openmation Deployment Guide

This guide walks you through deploying all three components of Openmation:
1. **Backend API** → Railway
2. **Website** → Vercel
3. **Chrome Extension** → Chrome Web Store

## Prerequisites

- GitHub account with this repository pushed
- GoDaddy account with `openmation.dev` domain
- Railway account (free tier works)
- Vercel account (free tier works)
- Google Developer account for Chrome Web Store ($5 one-time)

---

## Part 1: Backend Deployment (Railway)

### Step 1: Create Railway Project

1. Go to [railway.app](https://railway.app) and sign in
2. Click **"New Project"** → **"Deploy from GitHub repo"**
3. Connect your GitHub account if not already connected
4. Select the `simplest-automation` repository

### Step 2: Configure Service

1. Click on the service that was created
2. Go to **Settings** tab
3. Set **Root Directory**: `backend`
4. **Build Command**: `npm install && npm run build`
5. **Start Command**: `npm run start`

### Step 3: Add Persistent Volume

1. Right-click the service → **Add Volume**
2. **Mount Path**: `/app/data`
3. Click **Deploy**

### Step 4: Set Environment Variables

Go to **Variables** tab and add:

```
DATABASE_PATH=/app/data/automations.db
NODE_ENV=production
```

### Step 5: Add Custom Domain

1. Go to **Settings** → **Networking** → **Public Networking**
2. Click **"Generate Domain"** (to get initial Railway domain)
3. Click **"Add Custom Domain"**
4. Enter: `api.openmation.dev`
5. Railway will show you the CNAME target (e.g., `abc123.up.railway.app`)

### Step 6: Configure DNS in GoDaddy

1. Log in to [GoDaddy](https://dcc.godaddy.com)
2. Go to **My Products** → **DNS** for `openmation.dev`
3. Add a **CNAME Record**:
   - **Name**: `api`
   - **Value**: `<your-railway-cname>.up.railway.app` (from Railway)
   - **TTL**: 600 (10 minutes)
4. Save and wait for propagation (usually 5-30 minutes)

### Step 7: Verify Deployment

```bash
curl https://api.openmation.dev/health
```

Should return: `{"status":"ok"}`

---

## Part 2: Website Deployment (Vercel)

### Step 1: Import Project

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"Add New..."** → **"Project"**
3. Click **"Import Git Repository"**
4. Select the `simplest-automation` repository

### Step 2: Configure Build Settings

1. **Framework Preset**: Next.js (auto-detected)
2. **Root Directory**: Click **"Edit"** and enter `website`
3. Leave other settings as default

### Step 3: Add Environment Variable

Before deploying, add:

- **Name**: `NEXT_PUBLIC_API_URL`
- **Value**: `https://api.openmation.dev`

Click **"Deploy"**

### Step 4: Add Custom Domains

1. After deployment, go to **Project Settings** → **Domains**
2. Add `openmation.dev`
3. Add `www.openmation.dev`
4. Vercel will show you the DNS configuration needed

### Step 5: Configure DNS in GoDaddy

Add these records in GoDaddy DNS:

**For root domain (`openmation.dev`):**
- **Type**: A
- **Name**: `@`
- **Value**: `76.76.21.21`
- **TTL**: 600

**For www subdomain:**
- **Type**: CNAME
- **Name**: `www`
- **Value**: `cname.vercel-dns.com`
- **TTL**: 600

### Step 6: Verify Deployment

Visit https://openmation.dev - the site should load with SSL.

---

## Part 3: Chrome Extension Deployment

### Step 1: Build Extension

```bash
cd extension
npm install
npm run build
```

### Step 2: Create ZIP File

```bash
cd dist
zip -r ../openmation-extension.zip . -x "*.DS_Store"
```

The ZIP file is now at `extension/openmation-extension.zip`

### Step 3: Register as Chrome Developer

1. Go to [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole)
2. Pay the $5 one-time developer registration fee
3. Complete your developer profile

### Step 4: Create New Item

1. Click **"New Item"**
2. Upload `openmation-extension.zip`
3. Wait for upload to complete

### Step 5: Fill Store Listing

**Required Fields:**
- **Name**: Openmation
- **Summary**: Record, replay, and share browser automations. Turn repetitive tasks into one-click workflows. Free and open source.
- **Description**: See `extension/CHROME_STORE_LISTING.md` for full description
- **Category**: Productivity
- **Language**: English

**Screenshots** (at least 1 required):
- Size: 1280x800 or 640x400
- Take screenshots of:
  - Extension popup with automation list
  - Recording panel in action
  - Share dialog

**Privacy Policy:**
- URL: `https://openmation.dev/privacy`

### Step 6: Fill Privacy Practices

Under **Privacy Practices**, declare:
- **Single Purpose**: "Records and replays browser interactions to automate repetitive tasks"
- Data usage: Check appropriate boxes (we don't sell data, don't use for ads, etc.)

For each permission, provide justification:
| Permission | Justification |
|------------|---------------|
| storage | Store automation data locally |
| activeTab | Access current tab for recording/replay |
| scripting | Inject scripts for automation |
| alarms | Schedule automated runs |
| tabs | Get tab URLs for context |
| host_permissions | Record/replay on any website |

### Step 7: Submit for Review

1. Click **"Submit for Review"**
2. Review typically takes 1-3 business days
3. You'll receive an email when approved

---

## DNS Summary Table

| Type | Name | Value | Service |
|------|------|-------|---------|
| A | @ | 76.76.21.21 | Vercel (website) |
| CNAME | www | cname.vercel-dns.com | Vercel (website) |
| CNAME | api | [your-railway].up.railway.app | Railway (API) |

---

## Post-Deployment Checklist

- [ ] API health check: `curl https://api.openmation.dev/health`
- [ ] Website loads: https://openmation.dev
- [ ] Privacy page loads: https://openmation.dev/privacy
- [ ] Terms page loads: https://openmation.dev/terms
- [ ] SSL certificates active (check for padlock icon)
- [ ] Extension installs from Chrome Web Store
- [ ] Create test automation and verify share URL uses `openmation.dev/run/:id`
- [ ] Run shared automation link successfully

---

## Troubleshooting

### DNS not propagating
- Use [dnschecker.org](https://dnschecker.org) to verify
- Wait up to 48 hours (usually much faster)
- Flush local DNS: `sudo dscacheutil -flushcache`

### Railway deployment failing
- Check build logs in Railway dashboard
- Ensure `railway.json` is committed
- Verify Node.js version compatibility

### Vercel build failing
- Check build logs in Vercel dashboard
- Ensure `website/.env.production` is set correctly
- Try clearing cache and redeploying

### Extension rejected by Chrome Web Store
- Review rejection email for specific issues
- Common issues: missing privacy policy, unclear permissions
- Resubmit after fixing

---

## Environment Variables Summary

### Backend (Railway)
```
DATABASE_PATH=/app/data/automations.db
NODE_ENV=production
SHARE_BASE_URL=https://openmation.dev (optional)
PORT=3002 (optional, Railway sets automatically)
```

### Website (Vercel)
```
NEXT_PUBLIC_API_URL=https://api.openmation.dev
```

### Extension (build-time)
```
VITE_API_URL=https://api.openmation.dev
```

---

## Updating Deployments

### Backend
Push to `main` branch → Railway auto-deploys

### Website
Push to `main` branch → Vercel auto-deploys

### Extension
1. Update version in `manifest.json`
2. Build: `npm run build`
3. Create new ZIP
4. Upload to Chrome Web Store dashboard
5. Submit for review
