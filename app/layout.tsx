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


const DESCRIPTION =
  "Business Intelligence Analyst in Bengaluru: data analytics, dashboard development and business reporting in Power BI, Excel, SQL and Tableau, plus monday.com and HubSpot projects built end to end.";

export const metadata: Metadata = {
  metadataBase: new URL("https://nataliashiny.vercel.app"),
  title: { default: "Natalia Shiny | BI Portfolio", template: "%s | Natalia Shiny" },
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Natalia Shiny | BI Portfolio",
    title: "Natalia Shiny | Business Intelligence Analyst",
    description: DESCRIPTION,
    url: "/",
    images: [{ url: "/img/so-thumb.jpg", alt: "Sorted, an AI data analyst tool built by Natalia Shiny" }],
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
  // Google Search Console: the verification code goes here once the site is added there.
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION } : undefined,
};

// Tells Google who the site belongs to, so a search for her name can show it.
const PERSON = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Natalia Shiny",
  jobTitle: "Business Intelligence Analyst",
  url: "https://nataliashiny.vercel.app/",
  address: { "@type": "PostalAddress", addressLocality: "Bengaluru", addressCountry: "IN" },
  knowsAbout: ["Power BI", "SQL", "Excel", "Tableau", "Data analytics", "Dashboard development", "Business reporting"],
  sameAs: ["https://www.linkedin.com/in/nataliashiny", "https://github.com/shinynatalia"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(PERSON) }} />
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
