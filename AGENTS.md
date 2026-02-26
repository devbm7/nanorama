# Nanorama - AI-Assisted Infographic Poster Generator

## Cursor Cloud specific instructions

**Product**: Single-page Next.js 15 app (App Router) for generating AI-assisted infographic posters using Google Gemini API. No database, no Docker, no monorepo.

### Services

| Service | Command | Notes |
|---|---|---|
| Next.js (frontend + API) | `npm run dev` / `npm run build && npm run start` | Single service; runs on port 3000 |

### Key Commands

- **Lint**: `npm run lint` (ESLint with next/core-web-vitals + next/typescript)
- **Build**: `npm run build`
- **Dev**: `npm run dev` (port 3000)
- **Start (production)**: `npm run start` (requires `npm run build` first)

### Environment Variables

- `GOOGLE_API_KEY` or `GEMINI_API_KEY` — required for AI image generation via Gemini API. Without it, the `/api/generate-image` route returns a placeholder image, but the UI still works for layout/component testing.
- `GENAI_IMAGE_MODEL` — optional override for the default model (`gemini-2.5-flash-image-preview`).

### Non-obvious Notes

- The generate flow requires an uploaded image asset in the Image component (not just a text prompt). Clicking "Generate Images" without an uploaded image will show a validation error.
- There are no automated test suites (no `test` script in `package.json`). Verification is done via lint + build + manual UI testing.
- The app uses Zustand for client-side state — all state is in-memory, no persistence layer.
- Export (PNG/PDF) is client-side via `html2canvas` + `jsPDF`.
