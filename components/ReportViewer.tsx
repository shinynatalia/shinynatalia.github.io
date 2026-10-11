"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { asset } from "@/lib/asset";
import type { ReportPage } from "@/lib/projects";

type Props = { id: string; file: string; pages: ReportPage[] };

export default function ReportViewer({ id, file, pages }: Props) {
  const n = pages.length;
  const [cur, setCur] = useState(0);
  const [loading, setLoading] = useState(false);
  const [lbOpen, setLbOpen] = useState(false);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  const show = useCallback(
    (i: number, focus = false) => {
      const next = (i + n) % n;
      setCur((prev) => {
        if (prev !== next) setLoading(true);
        return next;
      });
      if (focus) tabRefs.current[next]?.focus();
    },
    [n]
  );

  const openLb = () => {
    lastFocus.current = document.activeElement as HTMLElement;
    setLbOpen(true);
  };
  const closeLb = useCallback(() => {
    setLbOpen(false);
    lastFocus.current?.focus();
  }, []);

  useEffect(() => {
    if (!lbOpen) return;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLb();
      if (e.key === "ArrowRight") show(cur + 1);
      if (e.key === "ArrowLeft") show(cur - 1);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [lbOpen, cur, show, closeLb]);

  const p = pages[cur];

  return (
    <>
      <div className="viewer">
        <div className="vbar">
          <span className="file">
            <span className="dot" aria-hidden="true" />
            {file}
          </span>
          <button type="button" className="btn ghost sm" onClick={openLb}>
            View full size
          </button>
        </div>
        <div className="stage">
          <button type="button" className="shot" aria-label="Open this page full size" onClick={openLb}>
            <img
              src={asset(p.img)}
              width={2000}
              height={1130}
              alt={`${p.name} report page`}
              style={{ opacity: loading ? 0.35 : 1 }}
              onLoad={() => setLoading(false)}
            />
          </button>
        </div>
        <div
          className="tabs"
          role="tablist"
          aria-label="Report pages"
          style={{ gridTemplateColumns: `repeat(${n},1fr)` }}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") { e.preventDefault(); show(cur + 1, true); }
            if (e.key === "ArrowLeft") { e.preventDefault(); show(cur - 1, true); }
          }}
        >
          {pages.map((pg, i) => (
            <button
              key={pg.name}
              ref={(el) => { tabRefs.current[i] = el; }}
              className="tab"
              role="tab"
              id={`${id}-tab-${i}`}
              aria-selected={i === cur}
              aria-controls={`${id}-notes`}
              tabIndex={i === cur ? 0 : -1}
              onClick={() => show(i)}
            >
              <img src={asset(pg.img)} alt="" width={2000} height={1130} loading="lazy" />
              <span>
                <span className="t-num">PAGE {i + 1} OF {n}</span>
                <br />
                <span className="t-name">{pg.name}</span>
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="notes" id={`${id}-notes`} role="tabpanel" aria-live="polite">
        <div>
          <p className="eyebrow">Page {cur + 1} · The question it answers</p>
          <h3>{p.q}</h3>
          <p className="muted">{p.body}</p>
          <ul className="vis">
            {p.list.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className="eyebrow">What the data shows</p>
          <ul className="reads">
            {p.reads.map(([b, s]) => (
              <li key={b + s}>
                <b>{b}</b>
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {lbOpen && (
        <div
          className="lb"
          role="dialog"
          aria-modal="true"
          aria-label="Report page full size"
          onClick={(e) => {
            const t = e.target as HTMLElement;
            if (t === e.currentTarget || t.classList.contains("img-wrap")) closeLb();
          }}
        >
          <header>
            <span>
              {p.name} · Page {cur + 1} of {n}
            </span>
            <button type="button" ref={closeRef} onClick={closeLb}>
              Close
            </button>
          </header>
          <div className="img-wrap">
            <img src={asset(p.img)} alt={`${p.name} report page, full size`} />
          </div>
          <div className="lbf">
            <button type="button" onClick={() => show(cur - 1)}>← Previous page</button>
            <button type="button" onClick={() => show(cur + 1)}>Next page →</button>
          </div>
        </div>
      )}
    </>
  );
}
