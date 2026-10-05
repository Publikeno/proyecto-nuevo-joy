<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep product presentation imagery selected in the catalog detail dialog rather than replacing the shared product photo; one product may have several package sizes and only the matching presentation should show its specific bottle.
- The public custom domain is served by GitHub Pages via `.github/workflows/deploy-pages.yml`; it copies Lovable-hosted `*.asset.json` files into the static build with `scripts/copy-lovable-assets.mjs`, because `/__l5e/` asset URLs only resolve on Lovable hosting.
- `public/sw.js` is a kill-switch that unregisters the legacy site's service worker and clears its caches; keep it so returning visitors stop seeing the old cached site.
