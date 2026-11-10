# esheet.os: Esheet Vivek's portfolio

A portfolio built as a small desktop OS: draggable windows, a magnifying dock, sticky notes and a
pretend terminal on desktop; a phone home screen with full-screen apps on mobile; and a plain,
printable one-page CV at `/cv`.

- Next.js 16 (App Router, fully static), React 19, Tailwind CSS v4, `motion`, `lucide-react`
- All copy lives in `src/lib/content.ts`. Every number there comes from the resume or a project's
  measured results (see `PROJECTS.md`). Don't add unmeasured claims.
- Security headers and CSP in `vercel.json` (fonts are self-hosted, no third-party requests).
- Deep links: `/#ticketrush`, `/#work`, `/#contact`, … open that app.

## Credits

| Piece | Source | Licence |
| --- | --- | --- |
| Dock magnification (`components/os/dock.tsx`) | Magic UI "dock" (magicui.design) | MIT |
| Copy button and sliding tab highlight (`components/apps/content.tsx`) | Watermelon UI "copy-confirm", "continuous-tabs" (ui.watermelon.sh) | MIT |
| Caveat handwriting font | Google Fonts / Fontsource | SIL OFL 1.1 |
| Geist and Geist Mono | Vercel | SIL OFL 1.1 |

The previous single-file version is kept in `legacy/index.html` for reference.

## Develop

```
npm install
npm run dev
```
