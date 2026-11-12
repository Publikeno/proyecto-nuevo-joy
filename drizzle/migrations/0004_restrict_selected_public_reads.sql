DROP POLICY "Public read visits by day" ON public.site_visits;
CREATE POLICY "Admins read visits by day" ON public.site_visits FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'::public.app_role));
REVOKE SELECT ON public.site_visits FROM anon;
GRANT SELECT ON public.site_visits TO authenticated;
GRANT ALL ON public.site_visits TO service_role;

DROP POLICY "Public read overrides" ON public.product_overrides;
CREATE POLICY "Public read visible overrides" ON public.product_overrides FOR SELECT TO anon, authenticated USING (NOT oculto);
CREATE POLICY "Admins read all overrides" ON public.product_overrides FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'::public.app_role));

CREATE FUNCTION public.catalog_hidden_ids() RETURNS TABLE(id text)
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$ SELECT p.id FROM public.product_overrides AS p WHERE p.oculto = true $$;
REVOKE ALL ON FUNCTION public.catalog_hidden_ids() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.catalog_hidden_ids() TO anon, authenticated, service_role;
COMMENT ON FUNCTION public.catalog_hidden_ids() IS 'Public catalog tombstones only: exposes identifiers, never hidden names, descriptions, prices or image paths, so static products remain hidden.';