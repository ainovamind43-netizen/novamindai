-- NovaMind AI — reviews table.
--
-- Paste this whole file into the Neon SQL Editor and run it once. It is
-- idempotent enough to re-run while setting up.
--
-- Nothing here connects to the site by itself. The app also needs DATABASE_URL
-- set — see .env.example.

create table if not exists public.reviews (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),

  -- Length bounds are duplicated in src/lib/review-schema.ts (zod) on purpose.
  -- The server function is the friendly check that returns a readable error to
  -- the form; these are the backstop that holds even if something writes to the
  -- table by another route entirely.
  name        text not null check (char_length(name) between 2 and 60),
  role        text not null check (char_length(role) between 2 and 80),
  rating      smallint not null check (rating between 1 and 5),
  body        text not null check (char_length(body) between 20 and 1200),

  -- Deliberately free text with no CHECK on the permitted values. The list of
  -- services lives in REVIEW_SERVICES in src/lib/reviews-types.ts, which the
  -- form and the server validator both read; copying it into a SQL CHECK would
  -- make a third place to update and a migration every time a service is added.
  service     text not null,

  -- Collected so the owner can follow up or verify, and deliberately never
  -- requested on a public read: getPublicReviews does not select this column, so
  -- a published email address — a scraper magnet — never leaves the database for
  -- a public page. Bounded only so a direct INSERT cannot store what the app
  -- never would.
  email       text not null check (char_length(email) between 3 and 200),

  -- 'approved' is the default because this site publishes instantly, by the
  -- owner's explicit choice. 'hidden' is a reversible soft delete, so taking
  -- something down does not destroy the record of who sent it — and it is also
  -- where submissions the spam honeypot flagged are parked, so a false positive
  -- can be published later rather than being lost.
  status      text not null default 'approved' check (status in ('approved', 'hidden')),

  -- sha256(ip + salt), never the raw address. Enough to rate-limit one sender,
  -- and not enough to identify a person from the table alone.
  ip_hash     text,
  user_agent  text
);

-- Every public read is "the approved ones, newest first" — this is that query.
create index if not exists reviews_public_idx
  on public.reviews (status, created_at desc);

-- The rate limiter counts rows per ip_hash inside a time window.
create index if not exists reviews_ip_idx
  on public.reviews (ip_hash, created_at desc);

-- On why there is no row-level security here.
--
-- The design this table came from used Supabase, where RLS with no policies is
-- what stops the public anon key reading anything. Neon has no anon key: the
-- only credential that exists is DATABASE_URL, and it belongs to the database
-- owner. Postgres exempts a table's owner from its own RLS unless the table is
-- marked FORCE ROW LEVEL SECURITY, so an `enable row level security` line here
-- would protect nothing while looking like a second layer of defence. The real
-- control is that DATABASE_URL is read only inside `.server.` modules — see
-- src/lib/db.server.ts.
