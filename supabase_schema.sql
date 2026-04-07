-- Enable the necessary extensions
create extension if not exists "uuid-ossp";

-- Define Tables
-- 1. Profiles Table (Linked to auth.users)
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text,
  role text default 'customer' check (role in ('customer', 'admin')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Categories Table
create table public.categories (
  id text primary key, -- e.g., 'vegetables'
  name text not null,
  image text not null,
  description text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Products Table
create table public.products (
  id text primary key, -- e.g., 'p1'
  category_id text references public.categories(id) on delete restrict not null,
  name text not null,
  price numeric not null check (price >= 0),
  image text not null,
  description text not null,
  is_active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. Cart Items Table
create table public.cart_items (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users on delete cascade not null,
  product_id text references public.products(id) on delete cascade not null,
  quantity integer not null check (quantity > 0),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, product_id)
);

-- Enable Row Level Security (RLS)
alter table public.profiles enable row level security;
alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.cart_items enable row level security;

-- Setup RLS Policies

-- Profiles Policies
create policy "Public profiles are viewable by everyone." on public.profiles
  for select using (true);
create policy "Users can update own profile." on public.profiles
  for update using (auth.uid() = id);
create policy "Users can insert their own profile." on public.profiles
  for insert with check (auth.uid() = id);

-- Categories Policies
create policy "Categories are viewable by everyone." on public.categories
  for select using (true);
create policy "Admins can insert categories." on public.categories
  for insert with check (auth.uid() in (select id from public.profiles where role = 'admin'));
create policy "Admins can update categories." on public.categories
  for update using (auth.uid() in (select id from public.profiles where role = 'admin'));
create policy "Admins can delete categories." on public.categories
  for delete using (auth.uid() in (select id from public.profiles where role = 'admin'));

-- Products Policies
create policy "Active products are viewable by everyone." on public.products
  for select using (is_active = true);
create policy "Admins can view all products." on public.products
  for select using (auth.uid() in (select id from public.profiles where role = 'admin'));
create policy "Admins can insert products." on public.products
  for insert with check (auth.uid() in (select id from public.profiles where role = 'admin'));
create policy "Admins can update products." on public.products
  for update using (auth.uid() in (select id from public.profiles where role = 'admin'));
create policy "Admins can delete products." on public.products
  for delete using (auth.uid() in (select id from public.profiles where role = 'admin'));

-- Cart Items Policies
create policy "Users can manage their own cart items." on public.cart_items
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Setup Auth Trigger to create Profile on Signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, role)
  values (new.id, new.raw_user_meta_data->>'full_name', 'customer');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Seed Data
insert into public.categories (id, name, image, description)
values
  ('vegetables', 'Vegetables', 'https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c', 'Fresh organic farm vegetables.'),
  ('fruits', 'Fruits', 'https://images.unsplash.com/photo-1610832958506-aa56368176cf', 'Sweet and juicy seasonal fruits.'),
  ('cakes', 'Cakes', 'https://images.unsplash.com/photo-1578985545062-69928b1d9587', 'Delicious freshly baked cakes.'),
  ('biscuits', 'Biscuits', 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35', 'Crunchy sweet and savory biscuits.');

insert into public.products (id, category_id, name, price, image, description)
values
  ('p1', 'vegetables', 'Organic Carrots', 3.99, 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37', 'Fresh organic carrots bundled straight from the farm.'),
  ('p2', 'vegetables', 'Broccoli Crown', 2.49, 'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc', 'Crisp green broccoli crown, perfect for steaming or roasting.'),
  ('p6', 'fruits', 'Gala Apples', 4.99, 'https://images.unsplash.com/photo-1560806887-1e4cd0b6fac6', 'Sweet and crisp Gala apples by the pound.'),
  ('p7', 'fruits', 'Bananas', 1.20, 'https://images.unsplash.com/photo-1571501679680-de32f1e7aad4', 'Yellow organic bananas.'),
  ('p11', 'cakes', 'Chocolate Truffle Cake', 24.99, 'https://images.unsplash.com/photo-1578985545062-69928b1d9587', 'Rich and decadent dark chocolate truffle cake.'),
  ('p16', 'biscuits', 'Chocolate Chip Cookies', 8.99, 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e', 'Freshly baked soft chocolate chip cookies.');
