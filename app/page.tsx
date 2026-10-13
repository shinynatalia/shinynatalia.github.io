import Link from "next/link";
import ResumeButton from "@/components/ResumeButton";
import { ProjectCards } from "@/components/ProjectCard";
import { projects } from "@/lib/projects";

const tools = ["Claude Code", "Power BI", "Excel", "Tableau", "monday.com", "HubSpot", "Airtable", "Smartsheet"];

const stack: { group: string; items: string[]; ai?: boolean }[] = [
  { group: "BI & visualization", items: ["Power BI", "Tableau", "QlikSense"] },
  { group: "Data modelling & ETL", items: ["Power Query (M)", "Star-schema data modelling", "ETL", "Data cleaning & validation"] },
  { group: "Languages", items: ["SQL (advanced)", "DAX", "Python (basic)"] },
  { group: "Cloud data platforms", items: ["Databricks", "Microsoft Azure"] },
  { group: "Spreadsheets & reporting", items: ["Excel (advanced, pivot tables, VBA & macros)", "Airtable", "Smartsheet", "monday.com"] },
  { group: "Enterprise systems", items: ["Workday", "Clarity", "HubSpot"] },
  { group: "AI & developer tools", items: ["Claude Code", "Copilot", "VS Code"], ai: true },
  { group: "Documentation", items: ["Confluence", "PowerPoint"] },
];

const core = [
  "Dashboard development & reporting",
  "AI-assisted reporting & automation",
  "KPI tracking",
  "Trend & pattern analysis",
  "Campaign & content ROI analysis",
  "Data governance & quality",
  "Business process documentation",
  "Client-facing BI delivery",
  "Stakeholder communication",
  "Cross-functional collaboration",
];

const values = [
  ["Built for the reader", "My media background means I design for the person reading the report. Clear titles, one question per page, and numbers that don't need a legend to explain them."],
  ["Data to decision", "A chart is only useful if it changes what someone does next. I pair every dashboard with the takeaway and the recommendation behind it."],
  ["End to end", "I can take a request from requirements through SQL, the data model, DAX measures and page design, and document the process so the next person can pick it up."],
];

export default function Home() {
  return (
    <>
      <div className="hi">
        <div className="hi-text">
          <p className="eyebrow rule">Business Intelligence Analyst · Bengaluru, India</p>
          <h1>Hi, I&apos;m Natalia.</h1>
          <p className="hi-sub">
            I started my career telling stories with words. Today I tell them with data, building the dashboards and reports that help leaders see
            what&apos;s happening and decide what to do next.
          </p>
          <div className="cta">
            <Link className="btn" href="/projects/">See my work</Link>
            <ResumeButton variant="ghost" />
          </div>
        </div>
        <aside className="now" aria-label="Main tools">
          <div className="mono" aria-hidden="true">NS</div>
          <p className="now-t">Main tools</p>
          <ul className="tools">
            {tools.map((t) => <li key={t}>{t}</li>)}
          </ul>
        </aside>
      </div>

      <div className="stats" aria-label="Career in numbers">
        <div><p className="num">6+</p><p className="lbl">Years in analytics</p></div>
        <div><p className="num">~35,000</p><p className="lbl">Records reported on</p></div>
        <div className="ai"><p className="num">AI + BI</p><p className="lbl">AI-assisted BI analyst</p></div>
      </div>

      <div className="section">
        <div className="sec-head">
          <div><p className="eyebrow rule">Toolkit</p><h2>Tech stack and core skills</h2></div>
        </div>
        <div className="tk">
          <div className="stack-groups">
            {stack.map((g) => (
              <div className={`sg${g.ai ? " ai" : ""}`} key={g.group}>
                <h3>{g.group}</h3>
                <ul className="pills">{g.items.map((i) => <li key={i}>{i}</li>)}</ul>
              </div>
            ))}
          </div>
          <div className="core">
            <h3>Core skills</h3>
            <ul>{core.map((c) => <li key={c}>{c}</li>)}</ul>
          </div>
        </div>
      </div>

      <div className="section">
        <div className="sec-head">
          <div><p className="eyebrow rule">How I work</p><h2>What I bring to a team</h2></div>
        </div>
        <div className="values">
          {values.map(([h, p]) => <div key={h}><h3>{h}</h3><p>{p}</p></div>)}
        </div>
      </div>

      <div className="section">
        <div className="sec-head">
          <div><p className="eyebrow rule">Selected work</p><h2>Projects</h2></div>
          <Link className="btn ghost sm" href="/projects/">All projects</Link>
        </div>
        <ProjectCards projects={projects} />
      </div>

      <div className="band">
        <h2>Hiring for a BI or analytics role?</h2>
        <div className="cta" style={{ margin: 0 }}>
          <Link className="btn" href="/contact/">Get in touch</Link>
          <ResumeButton variant="ghost" icon={false} />
        </div>
      </div>
    </>
  );
}
