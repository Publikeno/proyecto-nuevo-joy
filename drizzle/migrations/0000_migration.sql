CREATE TABLE public.site_counter (id int PRIMARY KEY DEFAULT 1, visits bigint NOT NULL DEFAULT 0, CONSTRAINT single_row CHECK (id = 1));
GRANT SELECT ON public.site_counter TO anon, authenticated;
GRANT ALL ON public.site_counter TO service_role;
ALTER TABLE public.site_counter ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read counter" ON public.site_counter FOR SELECT TO anon, authenticated USING (true);
INSERT INTO public.site_counter (id, visits) VALUES (1, 0);
CREATE OR REPLACE FUNCTION public.increment_visits() RETURNS bigint LANGUAGE sql SECURITY DEFINER SET search_path = public AS $$
  UPDATE public.site_counter SET visits = visits + 1 WHERE id = 1 RETURNING visits;
$$;
GRANT EXECUTE ON FUNCTION public.increment_visits() TO anon, authenticated;