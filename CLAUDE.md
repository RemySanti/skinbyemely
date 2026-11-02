# Skin by Emely
Skincare/esthetics site with shop + booking. Market Motion client. Started as a Figma Make export (README still says "Backup").

- **Repo:** RemySanti/skinbyemely (`main`) · **Deploy:** Vercel (`framework: vite`, output `dist`, SPA rewrite, immutable cache on `/assets/*`)
- **Stack:** React 18 + Vite, MUI + shadcn-style UI, Supabase, payments via Stripe and Square (`react-square-web-payments-sdk`), Medusa JS client, Hono, csv-parse
- Confirm with Remy which payment path (Stripe vs Square) is live before changing checkout.

## Working here
- Owner: Remy Santi (Market Motion Agency). Commits as Santi Consulting.
- Never commit `.env.local`; add new env vars to `.env.example` and to Vercel.
- Run `npm run build` before saying a change is done.
