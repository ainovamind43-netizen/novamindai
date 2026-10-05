# Working in this repo

This is a TanStack Start (React 19) site. See `README.md` for setup and scripts.

## Ground rules

- Keep the branch in a working state — `npm run lint` and the dev server should
  stay green.
- Avoid rewriting published git history (force pushing, rebasing or amending
  commits that are already pushed). Prefer new commits.
- `src/routeTree.gen.ts` is generated. Never edit it by hand.
- Routing is file-based: add a `.tsx` file under `src/routes/` and it becomes a
  route. There is no `src/pages/`, and `src/routes/__root.tsx` is the only root
  layout — preserve its `<Outlet />`.

## Styling

Design tokens (colours, gradients) and the motion/animation utilities are defined
in `src/styles.css` as Tailwind v4 `@theme` and `@utility` blocks. Extend them
there instead of hard-coding colours in components.

## Content

Service listings come from `src/lib/services-data.ts`. Page copy lives as
constants at the top of each route file, so text edits stay in one place.
