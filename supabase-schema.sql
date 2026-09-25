-- ========================================================
-- MY BED DZ - SCHEMA BASE DE DONNÉES SUPABASE (POSTGRESQL)
-- ========================================================

-- 1. Table des Commandes (Orders)
CREATE TABLE IF NOT EXISTS public.orders (
    id TEXT PRIMARY KEY,
    order_number TEXT NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    customer_name TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    wilaya_name TEXT NOT NULL,
    wilaya_code INTEGER NOT NULL,
    commune TEXT NOT NULL,
    notes TEXT,
    items JSONB NOT NULL,
    subtotal NUMERIC NOT NULL,
    delivery_fee NUMERIC NOT NULL,
    total NUMERIC NOT NULL,
    deposit_amount NUMERIC NOT NULL,
    balance_due NUMERIC NOT NULL,
    payment_method TEXT NOT NULL, -- 'edahabia' ou 'baridimob'
    receipt_image TEXT,
    status TEXT DEFAULT 'PENDING_DEPOSIT' NOT NULL, -- 'PENDING_DEPOSIT', 'DEPOSIT_CONFIRMED', 'SHIPPED', 'DELIVERED_PAID', 'CANCELLED'
    locale TEXT DEFAULT 'fr' NOT NULL
);

-- Index pour accélérer la recherche par numéro et date
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON public.orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_orders_status ON public.orders(status);

-- 2. Table des Prix & Stocks personnalisés par le Gérant
CREATE TABLE IF NOT EXISTS public.custom_prices (
    product_id TEXT PRIMARY KEY,
    base_price NUMERIC NOT NULL,
    variant_prices JSONB DEFAULT '{}'::jsonb,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Activer Row Level Security (RLS)
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.custom_prices ENABLE ROW LEVEL SECURITY;

-- Politiques de sécurité (Permettre la création de commandes et la lecture)
CREATE POLICY "Permettre l'insertion publique des commandes" 
    ON public.orders FOR INSERT 
    WITH CHECK (true);

CREATE POLICY "Permettre la lecture publique des commandes" 
    ON public.orders FOR SELECT 
    USING (true);

CREATE POLICY "Permettre la mise à jour des commandes" 
    ON public.orders FOR UPDATE 
    USING (true);

CREATE POLICY "Permettre la lecture des prix" 
    ON public.custom_prices FOR SELECT 
    USING (true);

CREATE POLICY "Permettre la mise à jour des prix" 
    ON public.custom_prices FOR ALL 
    USING (true);

-- 4. Activer l'écoute en temps réel (Realtime) pour les nouvelles commandes
ALTER PUBLICATION supabase_realtime ADD TABLE public.orders;
