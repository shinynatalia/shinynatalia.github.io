import type { Metadata } from "next";
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
    "Business Intelligence Analyst in Bengaluru. Power BI, SQL, Excel, Tableau and monday.com projects, built end to end from data model to finished dashboard.",
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
          </div>
        </footer>
      </body>
    </html>
  );
}
