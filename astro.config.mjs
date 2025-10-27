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
  return "http://bursaries.ilmsa.co.za";
})();

export default defineConfig({
  site,
  base,
  vite: {
    plugins: [tailwindcss()],
  },
});
