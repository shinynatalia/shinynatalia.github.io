import Link from "next/link";

export default function NotFound() {
  return (
    <div className="page-head">
      <p className="eyebrow rule">404</p>
      <h1>Page not found</h1>
      <p>That page doesn&apos;t exist. <Link href="/">Go back home</Link>.</p>
    </div>
  );
}
