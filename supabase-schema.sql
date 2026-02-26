-- Run this in Supabase SQL Editor to create the matches table
-- Enable Realtime: Dashboard > Database > Replication > enable for 'matches'

create type match_status as enum ('scheduled', 'live', 'finished');

create table matches (
  id uuid primary key default gen_random_uuid(),
  team_a text not null,
  team_b text not null,
  category text not null check (category in ('Open', 'Intermedia', 'Amateur')),
  status match_status not null default 'scheduled',
  scheduled_at timestamptz not null,
  set1_a int default null,
  set1_b int default null,
  set2_a int default null,
  set2_b int default null,
  set3_a int default null,
  set3_b int default null,
  point_a int default 0,
  point_b int default 0,
  video_url text default null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- RLS: public read, authenticated write
alter table matches enable row level security;

create policy "Matches are viewable by everyone"
  on matches for select
  using (true);

create policy "Only authenticated users can insert matches"
  on matches for insert
  with check (auth.role() = 'authenticated');

create policy "Only authenticated users can update matches"
  on matches for update
  using (auth.role() = 'authenticated');

create policy "Only authenticated users can delete matches"
  on matches for delete
  using (auth.role() = 'authenticated');

-- Trigger to update updated_at
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger matches_updated_at
  before update on matches
  for each row execute function update_updated_at();
