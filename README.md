# SoundWave (music-app)

A small Next.js music exploration app with a Deezer search proxy, client search UI, and in-page preview playback.

This README covers project overview, what I added, how to run the app locally, how the Deezer integration works, troubleshooting, and next steps you can take.

**Project layout (important files)**

- `app/` – Next.js App Router pages and API routes.
  - `app/api/deezer/route.ts` – server-side proxy that forwards search requests to the Deezer API and returns JSON.
- `components/` – React components used in the UI.
  - `components/search-bar.tsx` – client search input with debounce and dropdown results.
  - `components/audio-player.tsx` – `AudioProvider` and `useAudio` hook for in-page audio playback.
  - `components/header.tsx` – header now includes the search bar.
  - `components/track-card.tsx`, `components/now-playing.tsx`, `components/spotify-player.tsx` – existing UI pieces (minor class fixes applied).

**Features added**

- Deezer search proxy route at `GET /api/deezer?q=your+query`.
- Debounced search UI with a dropdown of results (cover, title, artist).
- Click a search result to play the Deezer preview in-page (no new window/tab).
- An `AudioProvider` to centralize playback; search uses the provider to play previews.
- Minor stylesheet class fixes to satisfy the project's linter/utility classes.

## Requirements

- Node.js (v16+ recommended)
- The project uses the existing package.json in this repo. You can use `npm` or `pnpm`.

## Install & Run (local)

1. Install dependencies

```bash
npm install
```

2. Run the dev server

```bash
npm run dev
```

3. Open the app

```text
http://localhost:3000
```

## How the Deezer integration works

- The frontend search component (`components/search-bar.tsx`) calls the local API at `/api/deezer?q=...`.
- The API route `app/api/deezer/route.ts` makes a server-side request to Deezer's public API endpoint (`https://api.deezer.com/search`) and returns the response JSON to the client. This hides any cross-origin concerns from the client and avoids exposing direct client-side cross-origin requests.
- Results typically include `preview` URLs. The search UI uses the `useAudio` hook from `components/audio-player.tsx` to play the `preview` in-page when the user clicks a result.

Example: requesting `/api/deezer?q=daft+punk` will return Deezer's search JSON for that query.

## Audio playback details

- `AudioProvider` creates and manages an `HTMLAudioElement` internally and exposes a `play(track)` function via `useAudio()`.
- `play(track)` accepts an object like `{ url, title, artist, cover }` and attempts to play the `url` preview.
- If the provider is unavailable for some reason, the search dropdown has a small fallback that creates a temporary audio element and plays the preview.

## Security & rate limiting

- The Deezer public API is used here for basic searching and streaming short preview clips. It is subject to Deezer's own rate limits and terms of service.
- The server route does not insert any API keys (Deezer search is public). If you later need to use authenticated endpoints you must add server-side secrets and avoid exposing them to the client.

## Troubleshooting

- Search returns empty results

  - Confirm the server log for `/api/deezer` requests (your dev server console). The route forwards Deezer's response — if Deezer returns an error, check the query format.

- Preview won't play in browser

  - Not all Deezer tracks include a `preview` URL. Check the JSON returned from `/api/deezer?q=...` for `preview` fields.
  - Some browsers restrict autoplay — the preview will normally play after a user gesture (click), which this app performs.

- CORS errors in the browser
  - The app uses a server-side proxy (`/api/deezer`) to avoid CORS on the client. If you see CORS errors, ensure you are using the local proxy URL and not calling `https://api.deezer.com` directly from the browser.

## Tests & manual checks

- Manual test: run the dev server and try the search box in the header. Type at least 2 characters to trigger search. Click a result — you should hear the preview play.

## Next steps / improvements you might want

- Add an on-screen player UI (current track, play/pause, progress) connected to `AudioProvider` (I can implement this for you).
- Persist a queue / playlist and allow adding search results to it.
- Show a dedicated search results page with pagination and richer metadata using `TrackCard` UI.
- Add caching or server-side caching for common queries if you expect higher traffic.

## Notes for contributors

- The app uses the Next.js App Router and TypeScript. Keep components under `components/` and API routes under `app/api/`.
- Styling uses utility classes (Tailwind-like). Be consistent with the existing naming conventions used in the repo.

---

If you want, I can now add a compact on-screen player UI (title + artist + play/pause + progress) wired to `AudioProvider`. Do you want that next? Or would you prefer a dedicated results page for searches?

\*\*\* End Patch
