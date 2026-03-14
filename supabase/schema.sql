-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Products Table
create table public.products (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  category text not null,
  stock integer not null default 0,
  arrival_date date not null default current_date,
  expiry_date date,
  base_price decimal(10,2) not null,
  status text not null check (status in ('Fresh', 'Aging', 'Near Expiry', 'Stagnant')),
  discount_percentage integer default 0,
  location text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  user_id uuid references auth.users not null
);

-- Categories Table (Optional, for strict typing if needed later)
create table public.categories (
  id uuid default uuid_generate_v4() primary key,
  name text not null unique
);

-- Sales / Transactions Table
create table public.sales (
  id uuid default uuid_generate_v4() primary key,
  product_id uuid references public.products(id) on delete restrict,
  quantity integer not null check (quantity > 0),
  sale_price decimal(10,2) not null,
  purchaser_id uuid references auth.users,
  sold_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Notifications / Alerts
create table public.alerts (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  message text not null,
  type text not null check (type in ('warning', 'danger', 'info')),
  product_id uuid references public.products(id) on delete cascade,
  is_read boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Set Row Level Security (RLS)
alter table public.products enable row level security;
alter table public.sales enable row level security;
alter table public.alerts enable row level security;

-- Create Policies (Example: Users can only see/edit their own products)
create policy "Users can view their own products" on public.products
  for select using (auth.uid() = user_id);

create policy "Users can insert their own products" on public.products
  for insert with check (auth.uid() = user_id);
  
create policy "Users can update their own products" on public.products
  for update using (auth.uid() = user_id);
