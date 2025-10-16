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

After you merge to `main`, check the **Actions** tab to confirm that the latest "Deploy site to GitHub Pages" run completed. If
the GitHub Pages status still shows an older deployment, re-run the workflow manually to republish the current build:

1. Open the **Actions** tab.
2. Select **Deploy site to GitHub Pages**.
3. Click **Run workflow**, ensure the branch is `main`, and start the run.

You can also trigger the deployment manually at any time using the same workflow (no code changes required).

If you need to customise the deployment domain or base path, override the following environment variables in the workflow or in a local `.env` file before running `npm run build`:

- `PUBLIC_SITE` – the fully-qualified site origin (e.g. `https://example.com`).
- `PUBLIC_BASE_PATH` – the path segment where the site is hosted (default: `/`).

## 🛠️ Tech stack

- [Astro 5](https://docs.astro.build/)
- [Tailwind CSS](https://tailwindcss.com/)
- [AOS](https://michalsnik.github.io/aos/) for scroll animations
