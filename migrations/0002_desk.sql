-- Dealership desk: shared inventory, leads, blogs, and staff.
-- Mutations are gated in app code via signed-in staff rows.

create table if not exists boats (
  id text primary key,
  slug text not null unique,
  year integer not null,
  make text not null,
  model text not null,
  title text not null,
  condition text not null,
  category text not null,
  price integer,
  stock text not null,
  length_ft double precision not null,
  length_label text not null,
  color text,
  fuel_type text,
  fuel_capacity_gal double precision,
  engine text,
  hours integer,
  propulsion text,
  hull text,
  horsepower integer,
  beam text,
  hin text,
  dry_weight_lbs integer,
  image text not null,
  gallery text not null default '[]',
  featured boolean not null default false,
  description text not null default '',
  highlights text not null default '[]',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists boats_condition_idx on boats (condition);
create index if not exists boats_featured_idx on boats (featured);

create table if not exists leads (
  id text primary key,
  kind text not null,
  name text not null default '',
  email text not null default '',
  phone text not null default '',
  fields text not null default '{}',
  status text not null default 'new',
  created_at timestamptz not null default now()
);
create index if not exists leads_status_idx on leads (status);
create index if not exists leads_created_idx on leads (created_at desc);

create table if not exists blogs (
  id text primary key,
  slug text not null unique,
  title text not null,
  excerpt text not null default '',
  body text not null default '',
  cover_image text,
  published boolean not null default false,
  author_name text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists blogs_published_idx on blogs (published);

create table if not exists staff (
  id text primary key,
  user_id text,
  email text not null unique,
  name text not null,
  title text not null default 'Staff',
  phone text,
  photo text,
  bio text,
  role text not null default 'staff',
  can_access boolean not null default false,
  created_at timestamptz not null default now()
);
create index if not exists staff_user_id_idx on staff (user_id);
