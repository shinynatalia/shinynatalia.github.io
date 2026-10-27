"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ResumeButton from "./ResumeButton";

const items = [
  { href: "/", label: "Home", section: "home" },
  { href: "/projects/", label: "Projects", section: "projects" },
  { href: "/contact/", label: "Contact", section: "contact" },
];

export default function Nav() {
  const path = usePathname() || "/";
  const section = path.startsWith("/projects") ? "projects" : path.startsWith("/contact") ? "contact" : "home";
  return (
    <header className="nav">
      <div className="wrap">
        <Link className="brand" href="/">
          Natalia Shiny<small>Business Intelligence Analyst</small>
        </Link>
        <nav className="links" aria-label="Main">
          {items.map((i) => (
            <Link key={i.href} className="nl" href={i.href} aria-current={section === i.section ? "page" : undefined}>
              {i.label}
            </Link>
          ))}
          <ResumeButton size="sm" style={{ marginLeft: 8 }} />
        </nav>
      </div>
    </header>
  );
}
