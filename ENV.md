# Environment Variables

## Required Variables

### `REDIRECT_SECRET` ⚠️ **REQUIRED**
A strong random string used for HMAC signing of redirect tokens.

Generate one with:
```bash
openssl rand -hex 32
```

**Add this to Vercel Environment Variables:**
1. Go to your Vercel project → Settings → Environment Variables
2. Add `REDIRECT_SECRET` with a generated random string

---

## Optional Variables

### `DATABASE_URL`
- **Not needed if using Supabase!** 
- Prisma automatically uses `SUPABASE_POSTGRES_PRISMA_URL` (which you already have)
- Only needed for local development or non-Supabase setups

### `NEXT_PUBLIC_SITE_URL`
- **Not currently used in codebase**
- Optional for future features (e.g., generating redirect URLs)
- Can be added later if needed: `https://your-project.vercel.app`

## Vercel Setup (Supabase)

Since you're using Supabase via v0 integration, you already have:
- ✅ `SUPABASE_POSTGRES_PRISMA_URL` - Prisma uses this automatically
- ✅ All Supabase-related variables (auto-synced)

**You only need to add:**
1. `REDIRECT_SECRET` - Generate with `openssl rand -hex 32` (Required for `/api/r`)

## Local Development Setup

1. Create a `.env` file in the root directory
2. Copy values from Vercel Environment Variables
3. For `DATABASE_URL`, use `SUPABASE_POSTGRES_PRISMA_URL` value
4. Never commit `.env` files to version control (already ignored in `.gitignore`)

