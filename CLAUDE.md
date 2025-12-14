# Diecast Collection Project

## Project Overview
A comparison of two headless CMS approaches for a vintage diecast car blog:
1. **Contentstack + Next.js + Vercel** (building first)
2. **Adobe Document Authoring + Edge Delivery Services** (building second)

Goal: Compare Lighthouse scores and developer experience between the two approaches.

## Key Constraints
- **Vanilla CSS only** - No Tailwind or CSS frameworks (fair Lighthouse comparison with Adobe EDS)
- **Minimal scope** - Basic blog functionality only

---

## Contentstack Notes

### Content Type JSON Import Format
When importing content types via the Contentstack UI (Content Models → Import), the JSON must be **unwrapped** - no outer `content_type` key.

**Correct format:**
```json
{
  "title": "Car",
  "uid": "car",
  "schema": [...],
  "options": {...}
}
```

**Incorrect format (will error with "schema is not iterable"):**
```json
{
  "content_type": {
    "title": "Car",
    "uid": "car",
    "schema": [...],
    "options": {...}
  }
}
```

### Select Field (Dropdown) Schema
Select fields require `display_type` property:
```json
{
  "display_name": "Brand",
  "uid": "brand",
  "data_type": "text",
  "display_type": "dropdown",
  "enum": {
    "advanced": false,
    "choices": [
      { "value": "Option 1" },
      { "value": "Option 2" }
    ]
  }
}
```

### Explorer Account Limitations
- Free Explorer accounts may have CLI login issues
- UI-based import/export works as fallback
- Full API access is available

### Region Configuration
This project uses **EU region** (eu-app.contentstack.com). The SDK must be configured with:
```typescript
import Contentstack, { Region } from '@contentstack/delivery-sdk';

const stack = Contentstack.stack({
  apiKey: process.env.CONTENTSTACK_API_KEY!,
  deliveryToken: process.env.CONTENTSTACK_DELIVERY_TOKEN!,
  environment: process.env.CONTENTSTACK_ENVIRONMENT!,
  region: Region.EU,  // Required for EU region
});
```

### Publishing Required
Entries must be **published** before they appear via the Delivery API. Unpublished entries won't show up.

### Content Type: Car
Fields:
- `title` (text, required) - Car name
- `slug` (text, required, unique) - URL identifier
- `main_image` (file, required) - Photo
- `description` (rich text, required) - Details
- `year` (number, optional) - Year manufactured
- `brand` (select, required) - Hot Wheels / Matchbox / Other

---

## Project Structure

```
diecast/
├── CLAUDE.md                          # This file
├── contentstack-seed/
│   └── content_types/
│       └── car.json                   # Content type definition
└── diecast-blog/                      # Next.js app (to be created)
    ├── app/
    │   ├── globals.css
    │   ├── layout.tsx
    │   ├── page.tsx
    │   └── cars/[slug]/page.tsx
    └── lib/
        └── contentstack.ts
```

---

## Environment Variables (for Next.js app)
```
CONTENTSTACK_API_KEY=
CONTENTSTACK_DELIVERY_TOKEN=
CONTENTSTACK_ENVIRONMENT=
```

---

## Deployment

**Live site:** https://diecast-cstask.vercel.app/

**GitHub repo:** https://github.com/smcauliffe/diecast-cstask

---

## Issues Encountered & Solutions

### 1. Contentstack CLI Login Failed
**Issue:** Explorer (free) account couldn't authenticate via `csdx auth:login`
**Solution:** Use UI-based import instead of CLI. The UI import works fine for content types and entries.

### 2. Content Type Import Error: "schema is not iterable"
**Issue:** Importing content type JSON via UI failed with 422 error
**Solution:** Remove the outer `content_type` wrapper from JSON. The UI expects the unwrapped format (starts directly with `title`, `uid`, `schema`).

### 3. API Error: "We can't find that Stack"
**Issue:** Contentstack SDK returned stack not found error
**Solution:** Account was on EU region (eu-app.contentstack.com) but SDK defaults to NA. Add `region: Region.EU` to SDK config.

### 4. Empty Results from API
**Issue:** API returned empty `entries: []` even after creating content
**Solution:** Entries must be **published** before they appear in the Delivery API. Saved/draft entries don't show.

### 5. TypeScript Build Error: "Expected 3-4 arguments"
**Issue:** `where('slug', slug)` failed during `next build` (but worked in dev mode)
**Cause:** Dev mode (Turbopack) is lenient with TypeScript; build mode runs full type checking
**Solution:** Use `equalTo('slug', slug)` instead of `where()`. The Contentstack SDK uses `equalTo()` for equality queries.

### 6. Vercel 404 After Successful Build
**Issue:** Build logs showed success, routes generated, but site returned 404
**Solution:** Add `vercel.json` with `{"framework": "nextjs"}` inside the `diecast-blog` folder (the root directory). This explicitly tells Vercel how to handle the output.

### 7. Vercel Not Auto-Deploying
**Issue:** Pushes to GitHub didn't trigger Vercel deployments
**Cause:** Vercel was connected to wrong repo (repo was renamed during setup)
**Solution:** Update git remote to match Vercel's connected repo: `git remote set-url origin <correct-repo-url>`

### 8. Monorepo Root Directory Setup
**Issue:** Next.js app is in `diecast-blog/` subdirectory, not repo root
**Solution:** In Vercel project Settings → General → Root Directory, set to `diecast-blog`. Also needed `vercel.json` in that directory.

---

## Lighthouse Baseline Scores

_TODO: Record scores after running Lighthouse tests_

| Page | Performance | Accessibility | Best Practices | SEO |
|------|-------------|---------------|----------------|-----|
| Home | | | | |
| Car Detail | | | | |
