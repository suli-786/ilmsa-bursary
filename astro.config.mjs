import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

const rawBase = process.env.PUBLIC_BASE_PATH ?? "/";
const normalizedBase = rawBase.startsWith("/") ? rawBase : `/${rawBase}`;
const base = normalizedBase.endsWith("/") ? normalizedBase : `${normalizedBase}/`;

const site = (() => {
  const configured = process.env.PUBLIC_SITE;
  if (configured && configured.trim().length > 0) {
    return configured;
  }
  return "https://bursaries.ilmsa.co.za";
})();

export default defineConfig({
  site,
  base,
  // NOTE: /mt → /MT lives in public/mt/index.html (static meta-refresh). It can't
  // go through `redirects` here — Astro matches redirect keys against existing
  // routes case-insensitively, and "/mt" swallowed the real /MT page at build.
  vite: {
    plugins: [tailwindcss()],
  },
});
