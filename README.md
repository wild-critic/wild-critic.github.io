# WildCritic case study

This interactive case study compares an LLM critic with later human feedback on 13 real agent responses. It focuses on the seven cases where the LLM critic missed the human critique or covered only part of it.

The site has no build step or runtime dependencies. Its files are organized by responsibility:

```text
index.html
assets/css/site.css
assets/js/case-studies.js
assets/js/app.js
```

Case evidence and excerpts live in `case-studies.js`. Layout and visual rules live in `site.css`. `app.js` controls filtering, case navigation, and the conversation dialog.

## Run locally

Start a local server from the repository root:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Deploy

Pushing to `main` deploys the site to GitHub Pages through the workflow in `.github/workflows/deploy-pages.yml`. The workflow can also be started manually from the Actions page.

The public site is available at [wild-critic.github.io](https://wild-critic.github.io/).
