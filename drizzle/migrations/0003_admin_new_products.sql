ALTER TABLE public.product_overrides ADD COLUMN IF NOT EXISTS es_nuevo boolean NOT NULL DEFAULT false;
ALTER TABLE public.product_overrides ADD COLUMN IF NOT EXISTS categoria text;
ALTER TABLE public.product_overrides ADD COLUMN IF NOT EXISTS marca text;