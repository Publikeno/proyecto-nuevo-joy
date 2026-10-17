-- Visitas por día: tabla nueva, historial del último mes y contador que también anota el día
CREATE TABLE public.site_visits (
  dia date NOT NULL,
  visitas bigint NOT NULL DEFAULT 0,
  CONSTRAINT site_visits_pkey PRIMARY KEY (dia)
);

GRANT SELECT ON public.site_visits TO anon;
GRANT SELECT ON public.site_visits TO authenticated;
GRANT ALL ON public.site_visits TO service_role;

ALTER TABLE public.site_visits ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read visits by day"
  ON public.site_visits FOR SELECT
  TO anon, authenticated
  USING (true);

-- Historial de los últimos 30 días (lo que registró la propia página en xuumiel.com)
INSERT INTO public.site_visits (dia, visitas) VALUES
  ('2026-10-04', 1),
  ('2026-10-05', 9),
  ('2026-10-06', 3),
  ('2026-10-07', 6),
  ('2026-10-08', 11),
  ('2026-10-09', 6),
  ('2026-10-10', 1),
  ('2026-10-12', 3),
  ('2026-10-13', 1),
  ('2026-10-14', 2),
  ('2026-10-15', 5),
  ('2026-10-16', 4)
ON CONFLICT (dia) DO NOTHING;

-- El contador de cada sesión ahora también suma al día de hoy
CREATE OR REPLACE FUNCTION public.increment_visits()
 RETURNS bigint
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  total bigint;
BEGIN
  UPDATE public.site_counter SET visits = visits + 1 WHERE id = 1 RETURNING visits INTO total;
  INSERT INTO public.site_visits (dia, visitas)
    VALUES (current_date, 1)
    ON CONFLICT (dia) DO UPDATE SET visitas = site_visits.visitas + 1;
  RETURN total;
END;
$function$;