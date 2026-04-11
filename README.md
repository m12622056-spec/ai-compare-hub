# AI Compare Hub

**Honest, benchmark-driven reviews of AI coding assistants and developer tools.**

Deployed on [GitHub Pages](https://github.com/). Built with Hugo. 

## Local Development

```bash
# Install Hugo Extended (required for Sass, if using)
hugo serve --disableFastRender
```

Visit `http://localhost:1313` to see your site.

## Building for Production

```bash
# Build static HTML
hugo --minify --gc

# Output goes to ./public/
# Deploy ./public/ to GitHub Pages
```

## Deployment to GitHub Pages

### Method 1: Manual (Recommended for beginners)

1. Build the site:
   ```bash
   hugo --minify
   ```

2. Go to your GitHub repo → Settings → Pages
3. Select branch: `main` / root
4. Or deploy from the `./public` folder using "GitHub Actions"

### Method 2: GitHub Actions (Automated)

Add this file to `.github/workflows/deploy.yml`:

```yaml
name: Deploy Hugo Site

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Setup Hugo
        uses: peaceiris/actions-hugo@v3
        with:
          hugo-version: '0.124.0'
          extended: true

      - name: Build
        run: hugo --minify --gc

      - name: Setup Pages
        uses: actions/configure-pages@v4

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./public

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

## Content Structure

```
content/
├── reviews/        # Product reviews (GPT-4o, Claude 3.5, etc.)
├── comparisons/    # Head-to-head battles
├── news/           # AI industry news
└── about/          # Static pages
```

### Creating a Review

1. Create new file: `content/reviews/new-review.md`

2. Add front matter:
   ```yaml
   ---
   title: "GPT-4o vs Claude 3.5"
   date: 2026-04-08
   rating: 4.5
   description: "Short SEO-friendly summary..."
   tags: ["GPT-4o", "Claude", "Comparison"]
   featured: true
   ---
   ```

3. Write in Markdown. Use `<!--more-->` to create a "read more" breakpoint.

## SEO Optimization

- **Structured Data**: Automatic JSON-LD Schema.org markup for reviews
- **Open Graph**: Meta tags for social sharing
- **Sitemap**: Auto-generated at `/sitemap.xml`
- **Robots.txt**: Auto-generated at `/robots.txt`

## Google AdSense Integration

1. Apply for AdSense (requires 30+ pages of content)
2. Once approved, get your `pub-XXXXX` ID
3. Edit `_config.toml`:
   ```toml
   [params]
   adsense_id = "ca-pub-12345678901234567"
   ```
4. Ad slots are defined in:
   - `layouts/partials/ad-slot.html`
   - Called in homepage, articles, and sidebars

## Performance Tips

- Use **WebP** for images (convert using `convert -quality 80% image.jpg image.webp`)
- Keep images < 200KB
- Lazy load heavy images: `<img loading="lazy" ...>

## License

MIT License - Feel free to clone this theme.

---

**Built by Mohamed** | Telegram: [@m0hajejdkk](https://t.me/m0hajejdkk)
