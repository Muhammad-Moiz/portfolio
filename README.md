# Muhammad Moiz: portfolio

The source of my portfolio site. It is a single page that sets out the projects I have built, my experience and how to reach me. The look is an early amber monochrome terminal: monospace type, `C:\>` prompts in front of headings, a `DIR`-style table of projects and a still block cursor at the end. Nothing blinks, glows or animates.

All of the copy lives in one file, `lib/content.ts`.

## Stack

- Next.js 15 (App Router) and React 19
- TypeScript
- Tailwind CSS v4 preflight for the base reset; hand-written CSS with custom properties
- IBM Plex Mono and VT323, self-hosted
- Playwright and axe-core for tests

## Run it

```sh
npm install
npm run dev
```

The dev server runs at http://localhost:3000.

## Test it

```sh
npm test
```

This builds the site, serves it on port 3100 and runs the Playwright suite against it. Make sure nothing else is using that port. `npm run typecheck` and `npm run lint` run the type check and ESLint. The GitHub Actions workflow runs the build, the type check, the linter and the tests on every push and pull request.

## Accessibility

The aim is WCAG 2.2 level AA, with AAA contrast (7:1 for text) and 44px minimum target size.

- Semantic landmarks, one `h1`, a real table for the projects, and native links and buttons. ARIA is used only for the theme button's name and the one illustration.
- Everything works with a keyboard. A skip link is the first stop, and the focus ring is never hidden under the sticky header.
- Screen reader support comes from the markup above. Decorative prompts and the cursor are hidden from assistive technology. I have not yet run the site through a screen reader.
- Dark and light themes follow the operating system setting, and a button in the header switches between them. Forced colours (Windows High Contrast) are respected.
- No motion: there is no animation, and smooth scrolling is off when reduced motion is requested.
- The layout reflows down to 320px wide and works at 200% zoom.

How it is tested: Playwright runs axe-core in light and dark mode, checks text contrast, checks that the layout reflows without sideways scrolling, and drives the page with the keyboard (skip link, tab order, theme toggle and its persistence). These run on every push.

## Privacy

No analytics and no cookies. The page makes no requests to other sites; fonts are served from the same origin. The only thing stored in the browser is the chosen theme, in `localStorage`.
