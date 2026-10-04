# BHCL Contractor Website

Static company website for BHCL Contractor Co. Ltd.

## Deployment on GitHub Pages

1. Push this project to a GitHub repository.
2. In GitHub, open the repository.
3. Go to Settings > Pages.
4. Under Source, choose GitHub Actions.
5. Commit and push the workflow in `.github/workflows/deploy.yml`.
6. GitHub will publish the site automatically.

## Local preview

Open `index.html` in a browser, or run a simple local server:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.
