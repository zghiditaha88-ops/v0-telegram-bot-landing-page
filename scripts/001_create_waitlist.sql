-- Create waitlist table to store email signups
create table if not exists public.waitlist (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  created_at timestamp with time zone default now()
);

-- Enable RLS (though this is a public waitlist, we still enable it for security)
alter table public.waitlist enable row level security;

-- Allow anyone to insert (public waitlist signup)
create policy "Anyone can sign up for waitlist"
  on public.waitlist for insert
  with check (true);

-- Only allow reading your own email (optional, for future features)
create policy "Users can view all waitlist entries"
  on public.waitlist for select
  using (true);
