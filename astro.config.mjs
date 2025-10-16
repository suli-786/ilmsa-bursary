import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

const rawBase = process.env.PUBLIC_BASE_PATH ?? "/";
const normalizedBase = rawBase.startsWith("/") ? rawBase : `/${rawBase}`;
const base = normalizedBase.endsWith("/") ? normalizedBase : `${normalizedBase}/`;

export default defineConfig({
  site: process.env.PUBLIC_SITE || undefined,
  base,
  vite: {
    plugins: [tailwindcss()],
  },
});
