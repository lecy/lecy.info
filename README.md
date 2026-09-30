# lecy.info

Personal academic website built with [Quarto](https://quarto.org) and hosted on GitHub Pages.

## Editing content

Most updates are edits to a YAML file in `data/`, not to pages:

| To add / change…            | Edit                     |
|-----------------------------|--------------------------|
| a publication               | `data/publications.yml`  |
| an R package, dataset, tool | `data/research.yml`      |
| a course or textbook        | `data/teaching.yml`      |
| bio, education, contact     | `index.qmd`              |

Set `featured: true` on a publication to show it under **Selected publications** on the home page.

PDFs (papers, CV, syllabi) go in `s/`. That folder keeps the old Squarespace URLs (`lecy.info/s/…`) working after the move.

## Layout

```
_quarto.yml          site config: navbar, theme, footer
index.qmd            home / about (Quarto "solana" about template)
publications.qmd     full list with a filter box
research.qmd         cards: R packages, data, methods, research in action
teaching.qmd         cards: courses and open textbooks
_ejs/                listing templates that turn the YAML into HTML
styles/              light + dark themes (SCSS) and shared CSS
.github/workflows/   renders and deploys to GitHub Pages on every push to main
```

## Preview locally

In RStudio: open the project and click **Render**, or from a terminal:

```bash
quarto preview
```

Note: if the repo lives inside Dropbox, `quarto preview` can fail with
"os error 32" because Dropbox locks Quarto's temp files. Pause Dropbox syncing
or keep the repo outside Dropbox.

## Deploying

Pushing to `main` builds and publishes the site through GitHub Actions. One-time setup:

1. Repo **Settings → Pages → Build and deployment → Source: GitHub Actions**.
2. For the custom domain: **Settings → Pages → Custom domain** = `www.lecy.info`, then at the
   DNS provider add a `CNAME` record `www → <username>.github.io` and `A` records for the apex
   domain pointing to GitHub Pages (185.199.108.153, .109.153, .110.153, .111.153).
   Turn on **Enforce HTTPS** once the certificate is issued.
