import type { Metadata } from "next";
import CopyEmail from "@/components/CopyEmail";
import ResumeButton from "@/components/ResumeButton";
import { CheckIcon } from "@/components/Icons";

export const metadata: Metadata = { title: "Contact" };

const looking = [
  "Business Intelligence and analytics roles",
  "Based in Bengaluru; open to hybrid or fully remote",
  "The People Analytics .pbix file is available on request",
];

export default function ContactPage() {
  return (
    <>
      <div className="page-head">
        <p className="eyebrow rule">Contact</p>
        <h1>Let&apos;s talk</h1>
        <p>I&apos;m looking for BI analyst roles. If you&apos;re hiring, or want to talk through one of these reports, email is the fastest way to reach me.</p>
      </div>
      <div className="contact-grid">
        <dl className="contact-card">
          <div className="cline"><dt>Email</dt><dd><CopyEmail email="shinynatalia@gmail.com" /></dd></div>
          <div className="cline">
            <dt>LinkedIn</dt>
            <dd><a href="https://www.linkedin.com/in/nataliashiny" target="_blank" rel="noopener" style={{ fontWeight: 600 }}>linkedin.com/in/nataliashiny</a></dd>
          </div>
          <div className="cline">
            <dt>GitHub</dt>
            <dd><a href="https://github.com/shinynatalia" target="_blank" rel="noopener" style={{ fontWeight: 600 }}>github.com/shinynatalia</a></dd>
          </div>
          <div className="cline"><dt>Resume</dt><dd><ResumeButton label="Download resume (PDF)" icon={false} /></dd></div>
        </dl>
        <div>
          <h2 style={{ fontSize: 30 }}>What I&apos;m looking for</h2>
          <div className="availability">
            {looking.map((t) => <div key={t}><CheckIcon /><span>{t}</span></div>)}
          </div>
        </div>
      </div>
    </>
  );
}
