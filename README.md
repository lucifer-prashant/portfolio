# Prashant Verma — Portfolio

Personal portfolio built to showcase projects, experiments, and technical work.

Live: https://prashportfolio.vercel.app/

---

## Stack

* Next.js 14 (App Router)
* TypeScript
* Tailwind CSS + shadcn/ui
* Framer Motion

---

## Structure

```
src/
├── app/
│   ├── projects/      # Projects page with filtering
│   ├── playground/    # Experimental work
│   └── page.tsx       # Landing page
├── components/
│   └── portfolio/     # UI sections
└── data/
    ├── projects.json
    └── playground.json
```

---

## Adding a project

Add to `src/data/projects.json`:

```json
{
  "id": "my-project",
  "featured": true,
  "name": "Project Name",
  "tagline": "One line pitch",
  "story": "Why it was built",
  "status": "LIVE",
  "date": "2025",
  "tech": ["React", "TypeScript"],
  "description": "What it does",
  "liveUrl": "https://...",
  "githubUrl": "https://github.com/...",
  "metrics": {}
}
```

* `featured: true` shows it on the landing page
* `status`: LIVE | IN PROGRESS | CODE REPO

Add experiments to `src/data/playground.json`:

```json
{
  "id": "experiment",
  "name": "Experiment Name",
  "description": "What it does",
  "tech": ["p5.js"],
  "liveUrl": "https://...",
  "githubUrl": "https://github.com/..."
}
```

---

## Run locally

```bash
npm install
npm run dev
```
