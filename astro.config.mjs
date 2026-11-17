import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

const rawBase = process.env.PUBLIC_BASE_PATH ?? "/";
const normalizedBase = rawBase.startsWith("/") ? rawBase : `/${rawBase}`;
const base = normalizedBase.endsWith("/") ? normalizedBase : `${normalizedBase}/`;

const site = (() => {
  const configured = process.env.PUBLIC_SITE;
  if (configured && configured.trim().length > 0) {
    return configured;
  }
  return "https://ilmsa.co.za";
})();

export default defineConfig({
  site,
  base,
  // React renders shadcnblocks blocks to static HTML at build time; no JS
  // ships to the browser unless a block is given a client:* directive.
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
  },
});
