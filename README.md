# ILM-SA Bursary site

This repository contains the marketing site for the ILM-SA bursary programme, built with [Astro](https://astro.build/) and Tailwind CSS.

## 🚀 Getting started

Install dependencies and start the local dev server:

```bash
npm install
npm run dev
```

The site will be available at [http://localhost:4321](http://localhost:4321).

## 🧞 Useful commands

| Command | Action |
| --- | --- |
| `npm install` | Install dependencies |
| `npm run dev` | Start the development server |
| `npm run build` | Build the production site to `./dist/` |
| `npm run preview` | Preview the built site locally |

## 🌐 Deployment

This project ships with an automated GitHub Actions workflow that builds the site from the `main` branch and publishes the output to the `gh-pages` branch. Make sure the repository's **Pages** settings are configured to serve from the `gh-pages` branch ("Deploy from a branch" → `gh-pages` / `/ (root)`), then once changes are merged into `main`, the deployment workflow will:

1. Install dependencies.
2. Build the site with the correct GitHub Pages base URL.
3. Upload the build output and publish it via GitHub Pages.

You can also trigger a deployment manually from the **Actions** tab by running the "Deploy site to GitHub Pages" workflow.

If you need to customise the deployment domain or base path, override the following environment variables in the workflow or in a local `.env` file before running `npm run build`:

- `PUBLIC_SITE` – the fully-qualified site origin (e.g. `https://example.com`).
- `PUBLIC_BASE_PATH` – the path segment where the site is hosted (default: `/`).

## 🛠️ Tech stack

- [Astro 5](https://docs.astro.build/)
- [Tailwind CSS](https://tailwindcss.com/)
- [AOS](https://michalsnik.github.io/aos/) for scroll animations
