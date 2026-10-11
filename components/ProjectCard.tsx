import Link from "next/link";
import { asset } from "@/lib/asset";
import type { Project } from "@/lib/projects";

export default function ProjectCard({ p }: { p: Project }) {
  return (
    <Link className="card" href={`/projects/${p.slug}/`}>
      <div className="thumb">
        <img src={asset(p.img)} alt="" width={2000} height={1142} loading="lazy" />
      </div>
      <div className="body">
        <span className={`status ${p.status[0]}`}>{p.status[1]}</span>
        <h3>{p.title}</h3>
        <p>{p.blurb}</p>
        <div className="foot">
          <ul className="tags">
            {p.tags.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
          <span className="go">View project →</span>
        </div>
      </div>
    </Link>
  );
}

export function ProjectCards({ projects }: { projects: Project[] }) {
  return (
    <div className="cards">
      {projects.map((p) => (
        <ProjectCard key={p.slug} p={p} />
      ))}
    </div>
  );
}
