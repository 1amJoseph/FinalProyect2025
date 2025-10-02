

## Project Structure

Current project structure:

```text
/
├── public/
│   └── images.x
├── src
│   ├── assets
│   │   └── astro.x
│   ├── components
│   │   └── componentname.astro
│   ├── layouts
│   │   └── Layout.astro
│   ├── pages
│   |   └── index.astro
|   |   └── home.astro
|   └── stores
|       └── cartStore.ts
└── package.json
```

## Commands

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |
