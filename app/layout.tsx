import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import Nav from "@/components/Nav";
// Self-hosted fonts (no request to Google at build or run time)
import "@fontsource/libre-caslon-display/400.css";
import "@fontsource/libre-caslon-text/400.css";
import "@fontsource/libre-caslon-text/400-italic.css";
import "@fontsource/manrope/400.css";
import "@fontsource/manrope/500.css";
import "@fontsource/manrope/600.css";
import "@fontsource/manrope/700.css";
import "./globals.css";


export const metadata: Metadata = {
  title: { default: "Natalia Shiny | BI Portfolio", template: "%s | Natalia Shiny" },
  description:
    "Business Intelligence Analyst in Bengaluru: data analytics, dashboard development and business reporting in Power BI, Excel, SQL and Tableau, plus monday.com and HubSpot projects built end to end.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Nav />
        <main className="wrap">
          <section className="view">{children}</section>
        </main>
        <footer>
          <div className="wrap">
            <span>© 2026 Natalia Shiny</span>
            <span>
              <a href="https://github.com/shinynatalia" target="_blank" rel="noopener">GitHub</a>
              &nbsp;·&nbsp;
              <a href="https://www.linkedin.com/in/nataliashiny" target="_blank" rel="noopener">LinkedIn</a>
              &nbsp;·&nbsp;
              <a href="mailto:shinynatalia@gmail.com">Email</a>
            </span>
          </div>
        </footer>
        {/* Vercel Web Analytics: page views, countries, referrers, devices (no cookies) */}
        <Analytics />
      </body>
    </html>
  );
}
