# Database Setup Guide

## Prisma with Supabase on Vercel

Since you're using Supabase, follow these steps:

### 1. Set Environment Variables in Vercel

Add these two variables to your Vercel project (Settings → Environment Variables):

1. **`REDIRECT_SECRET`**
   - Generate: `openssl rand -hex 32`
   - Value: Paste the generated string

2. **`NEXT_PUBLIC_SITE_URL`**
   - Value: `https://your-project.vercel.app` (or your custom domain)

### 2. Configure Prisma to Use Supabase

Your Prisma schema is already configured. The `DATABASE_URL` should point to `SUPABASE_POSTGRES_PRISMA_URL`.

**Option 1: Use Supabase URL directly (Recommended)**
- In Vercel, set `DATABASE_URL` to the same value as `SUPABASE_POSTGRES_PRISMA_URL`
- Or update your code to use `SUPABASE_POSTGRES_PRISMA_URL` directly

**Option 2: Update Prisma to use Supabase variable**
We can modify the Prisma setup to use `SUPABASE_POSTGRES_PRISMA_URL` if you prefer.

### 3. Run Database Migrations

**Locally (for development):**
```bash
# Copy SUPABASE_POSTGRES_PRISMA_URL to DATABASE_URL in .env
# Then run:
npm run db:generate
npm run db:migrate
```

**On Vercel (via build command):**
Add this to your `package.json` build script:
```json
"build": "prisma generate && next build"
```

Or add it as a build command in Vercel settings.

### 4. First Migration

After setting up environment variables, run your first migration:

```bash
npm run db:migrate
```

This will create all the tables in your Supabase database.

### 5. Verify Setup

1. Check Vercel build logs to ensure Prisma generates successfully
2. Visit `/api/health` to verify the API is working
3. Visit `/dashboard` to test the database connection

## Troubleshooting

**If Prisma can't connect:**
- Verify `SUPABASE_POSTGRES_PRISMA_URL` is correct
- Check that your Supabase project allows connections from Vercel IPs
- Ensure the database is not paused in Supabase

**If migrations fail:**
- Make sure you have the correct database permissions
- Check that the schema doesn't already exist (if re-running migrations)

