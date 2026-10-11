"use client";
import { useRef, useState } from "react";

export default function CopyEmail({ email }: { email: string }) {
  const [label, setLabel] = useState("Copy");
  const ref = useRef<HTMLSpanElement>(null);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setLabel("Copied");
    } catch {
      if (ref.current) {
        const r = document.createRange();
        r.selectNodeContents(ref.current);
        const s = getSelection();
        s?.removeAllRanges();
        s?.addRange(r);
      }
      setLabel("Selected");
    }
    setTimeout(() => setLabel("Copy"), 2000);
  };
  return (
    <>
      <span className="email" ref={ref}>{email}</span>
      <button type="button" className="btn ghost sm" onClick={copy}>{label}</button>
    </>
  );
}
