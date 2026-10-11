import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReportViewer from "@/components/ReportViewer";
import { getProject, projects } from "@/lib/projects";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const p = getProject((await params).slug);
  return p ? { title: p.title, description: p.lede } : {};
}

export default async function ProjectPage({ params }: Params) {
  const p = getProject((await params).slug);
  if (!p) notFound();

  const sub = [
    ["overview", "Overview"],
    ["report", p.report.eyebrow],
    ...(p.fixes ? [["fixes", "Data fixes"]] : []),
    ["build", "How it's built"],
  ];

  return (
    <>
      <p className="crumbs">
        <Link href="/projects/">Projects</Link> &nbsp;/&nbsp; {p.title}
      </p>
      <div className="proj-hero">
        <div>
          <span className={`status ${p.status[0]}`}>{p.status[1]}</span>
          <h1>{p.title}</h1>
          <p className="lede">{p.lede}</p>
        </div>
        <dl className="meta">
          {p.meta.map(([dt, dd]) => (
            <div key={dt}><dt>{dt}</dt><dd>{dd}</dd></div>
          ))}
        </dl>
      </div>
      <nav className="subnav" aria-label="On this page">
        {sub.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}
      </nav>

      <div className="block" id="overview">
        <p className="eyebrow rule">Overview</p>
        <h2>The brief</h2>
        <div className="prose">{p.overview.map((t) => <p key={t}>{t}</p>)}</div>
        <div className={`qa${p.questions.length === 4 ? " qa4" : ""}`}>
          {p.questions.map(([b, s]) => <div key={b}><b>{b}</b><span>{s}</span></div>)}
        </div>
      </div>

      {p.stats && (
        <div className="stats ob-stats" aria-label="Headline numbers">
          {p.stats.map(([n, l]) => <div key={l}><p className="num">{n}</p><p className="lbl">{l}</p></div>)}
        </div>
      )}

      <div className="block" id="report">
        <p className="eyebrow rule">{p.report.eyebrow}</p>
        <h2>{p.report.heading}</h2>
        <div className="report">
          <ReportViewer id={p.slug} file={p.report.file} pages={p.report.pages} />
        </div>
      </div>

      {p.fixes && (
        <div className="block" id="fixes">
          <p className="eyebrow rule">Data fixes</p>
          <h2>Problems I found and fixed</h2>
          <p className="prose" style={{ marginBottom: 18 }}>{p.fixes.intro}</p>
          <ul className="steps">
            {p.fixes.items.map(([b, d], i) => (
              <li key={b}>
                <span className="s done">{i + 1}</span>
                <div><b>{b}</b><span className="d">{d}</span></div>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="block" id="build">
        <p className="eyebrow rule">How it&apos;s built</p>
        <h2>{p.build.heading}</h2>
        <div className="cols">
          {p.build.cols.map((c) => (
            <div className="col" key={c.title}>
              <h3>{c.title}</h3>
              <p>{c.desc}</p>
              <ul className="chips" aria-label={c.chipsLabel}>
                {c.chips.map((ch) => <li key={ch.t} className={ch.kind}>{ch.t}</li>)}
              </ul>
              {c.legend && (
                <p className="legend">
                  {c.legend.map((l) => (
                    <span key={l.label}><i style={{ background: l.bg, borderColor: l.border }} />{l.label}</span>
                  ))}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="pn">
        <Link href={p.prev.href}><small>{p.prev.small}</small><span>{p.prev.label}</span></Link>
        <Link href={p.next.href} style={{ textAlign: "right" }}><small>{p.next.small}</small><span>{p.next.label}</span></Link>
      </div>
    </>
  );
}
