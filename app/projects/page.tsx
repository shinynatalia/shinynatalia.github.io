import type { Metadata } from "next";
import { ProjectCards } from "@/components/ProjectCard";
import { projects } from "@/lib/projects";

export const metadata: Metadata = { title: "Projects" };

export default function ProjectsPage() {
  return (
    <>
      <div className="page-head">
        <p className="eyebrow rule">Projects</p>
        <h1>Selected work</h1>
        <p>
          Each project is built end to end, from the data and model through to the finished pages. Open one to see every page, what it shows, and
          how it&apos;s built.
        </p>
      </div>
      <ProjectCards projects={projects} />
    </>
  );
}
