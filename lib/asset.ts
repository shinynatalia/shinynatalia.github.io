// Prefix a file in /public with the deploy base path (needed on GitHub Pages project sites).
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
export const asset = (path: string) => `${basePath}${path.startsWith("/") ? path : `/${path}`}`;
