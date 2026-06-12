# web — Cloudflare React Router v7 example

Minimal hello-world: SSR on Cloudflare Workers via React Router v7 framework mode. Self-contained; independent of the root Bun CLI.

## Commands

Run inside `web/`:

```bash
bun install
bun run dev        # local dev at http://localhost:5173
bun run build      # build to build/{client,server}
bun run deploy     # build + wrangler deploy
bun run typecheck  # wrangler types + react-router typegen + tsc
```

## Layout

<!-- prettier-ignore -->
| Path | Role |
|---|---|
| `workers/app.ts` | Worker fetch handler → React Router request handler |
| `app/root.tsx` | HTML document shell |
| `app/routes.ts` | Route table |
| `app/routes/home.tsx` | `/` page; loader reads the `HELLO_NAME` binding |
| `app/entry.server.tsx` | SSR entry (required on Workers — no `@react-router/node`) |
| `react-router.config.ts` | `ssr: true` + `future.unstable_viteEnvironmentApi` (needed by the Cloudflare Vite plugin) |
| `wrangler.jsonc` | Worker config; `vars.HELLO_NAME` demos a binding |

## Notes

- Bindings are read in loaders/actions via `context.cloudflare.env`.
- After editing `wrangler.jsonc`, rerun `bun run cf-typegen` to refresh `Env` types.
- `deploy` needs `wrangler login` (or `CLOUDFLARE_API_TOKEN`) once.
