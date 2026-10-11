# Natalia Shiny — BI Portfolio

Personal portfolio for Natalia Shiny, Business Intelligence Analyst (Bengaluru). Built with Next.js (App Router, static export) and hosted on GitHub Pages.

## Projects featured
- **People Analytics Command Center** — Power BI, 3 report pages
- **ServiceNow IT Analytics** — Power BI, 4 report pages with forecasting
- **Client Onboarding Tracker** — monday.com board, automations and dashboard

All project data is sample data.

## Run locally
```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static site in ./out
```

## Editing content
- Project text, numbers and screenshots: `lib/projects.tsx`
- Home page (tools, stack, skills): `app/page.tsx`
- Contact page: `app/contact/page.tsx`
- Screenshots: `public/img/`
- Resume: replace `public/Natalia_Shiny_Resume.pdf`

## Deploy
Every push to `main` builds the site and publishes it to GitHub Pages via `.github/workflows/deploy.yml`.
In the repo, **Settings → Pages → Source** must be set to **GitHub Actions**.
