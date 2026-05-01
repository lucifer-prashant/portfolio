# Portfolio

Personal portfolio site — built with Next.js, Tailwind CSS, and TypeScript.

**Live:** https://lucifer-prashant.github.io/portfolio *(or wherever it's deployed)*

---

## Stack

- **Next.js 14** (App Router)
- **Tailwind CSS** + **shadcn/ui**
- **Framer Motion** — animations
- **TypeScript**

## Structure

```
src/
├── app/
│   ├── projects/      # Full projects page with status filtering
│   ├── playground/    # Lab / experimental projects grid
│   └── page.tsx       # Landing page
├── components/
│   └── portfolio/     # HeroSection, ProjectsSection, etc.
└── data/
    ├── projects.json  # Main projects (featured + all)
    └── playground.json # Lab / experiments
```

## Adding a project

**Main project** — add to `src/data/projects.json`:
```json
{
  "id": "my-project",
  "featured": true,
  "name": "Project Name",
  "tagline": "One line pitch",
  "story": "Why you built it.",
  "status": "LIVE",
  "date": "2025",
  "tech": ["React", "TypeScript"],
  "description": "What it does.",
  "liveUrl": "https://...",
  "githubUrl": "https://github.com/...",
  "metrics": {}
}
```

Set `"featured": true` to show it on the landing page. `status` is one of `LIVE`, `IN PROGRESS`, or `CODE REPO`.

**Lab experiment** — add to `src/data/playground.json`:
```json
{
  "id": "experiment",
  "name": "Experiment Name",
  "description": "What it does.",
  "tech": ["p5.js"],
  "liveUrl": "https://...",
  "githubUrl": "https://github.com/..."
}
```

## Run locally

```bash
npm install
npm run dev
```
