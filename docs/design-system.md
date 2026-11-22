
# Portfolio Design System

## Design Goals

- Modern, professional, minimal aesthetic.
- Clear visual hierarchy and comfortable readability.
- Responsive desktop and mobile layouts.
- Consistent styling across all portfolio pages.
- Accessible colors, controls, and interactions.

## Colors

Use semantic shadcn theme tokens rather than hardcoded colors.

### How the theme reaches a component

Following [shadcn's theming convention](https://ui.shadcn.com/docs/theming),
`src/index.css` defines light values in `:root` and dark overrides in `.dark`.
Before React mounts, the page uses the light palette from `:root`.
`ThemeProvider` applies the saved light or dark preference to `<html>` and
defaults to light when the preference is missing or invalid.
`color-scheme` matches native browser controls to the active mode.

`@theme inline` connects a CSS variable to Tailwind. For example:

```css
/* Palette value → Tailwind mapping → component utility */
--primary: oklch(14.18% 0.012 244.94);
--color-primary: var(--primary); /* inside @theme inline */
```

```tsx
<Button>Primary action</Button>
// The default variant uses bg-primary and text-primary-foreground.
```

`foreground` is the supplied palette's `text` color. A token such as
`primary` is a surface; `primary-foreground` is text/icons **on that surface**,
not another shade of primary. This palette uses OKLCH directly: lightness,
chroma (color intensity), and hue angle.

### Portfolio palette

| Role / CSS token | Light | Dark |
| --- | --- | --- |
| Page text / `foreground` | `oklch(14.18% 0.012 244.94)` | `oklch(96.83% 0.007 247.90)` |
| Page fill / `background` | `oklch(86.61% 0.029 266.34)` | `oklch(24.96% 0.040 265.12)` |
| Brand fill / `primary` | `oklch(14.18% 0.012 244.94)` | `oklch(96.83% 0.007 247.90)` |
| Supporting fill / `secondary` | `oklch(60.83% 0.038 256.39)` | `oklch(55.74% 0.039 256.40)` |
| Interactive fill / `accent` | `oklch(60.60% 0.130 236.49)` | `oklch(75.85% 0.137 231.62)` |
| Text on primary | Background | Background |
| Text on secondary | Foreground | `#ffffff` |
| Text on accent | Foreground | Background |

The five supplied colors in each mode are preserved exactly. Foregrounds
are chosen per surface rather than reusing the page text everywhere. Dark
secondary uses white because the supplied off-white text is below 4.5:1
contrast on that fill.

### Supporting tokens

`color-mix(in srgb, A 14%, B)` combines 14% of A with 86% of B.
These are design choices derived from the palette, not shadcn requirements.

| Tokens | Mapping and purpose |
| --- | --- |
| `card`, `popover` | Light: background mixed with 50% white. Dark: 12% secondary over background. Raised panels and dropdown surfaces. |
| `card-foreground`, `popover-foreground` | Use page `foreground`. |
| `muted` | Secondary mixed into background: 14% light, 20% dark. Subtle hover and supporting surfaces. |
| `muted-foreground` | 75% foreground mixed with background. Descriptions and helper text. |
| `border` | Secondary mixed into background: 55% light, 70% dark. Separators and surface edges. |
| `input` | 80% secondary over background in light mode; secondary in dark mode. Form borders. |
| `ring` | Primary. Keyboard focus indicator color; components may apply opacity. |
| `destructive` | Retains shadcn's red error colors; errors should remain distinct from brand actions. |
| `chart-1`–`chart-5` | Primary, secondary, accent, then two blends. Reserved palette; validate series distinction when adding charts. |
| `sidebar*` | Reuses muted, foreground, primary, accent, border, and ring with their matching foregrounds. |
| `radius` | Unchanged `0.625rem` base corner radius; not a color. |

### Usage and verification

Use semantic pairs, for example `bg-accent text-accent-foreground`.
`text-accent` alone puts the accent color on the current surface. In light
mode, the accent is suitable as a fill with dark text, but does not have
enough contrast for small text on the page background.

The current navigation primitive uses `muted` for hover/active fills, so
changing `accent` does not automatically recolor those interactions. Tokens
only affect components that reference them. No charts or sidebar are
currently rendered.

Check both themes using the existing **D** keyboard shortcut outside inputs.
Review page text, descriptions, header highlights, the Projects dropdown,
and keyboard focus. Solid text/surface pairs were checked numerically;
opacity-based hover and focus treatments still need browser review.

## Typography

Use a consistent heading hierarchy and body text scale.

<!-- Primary font: TBD.
Monospace/accent font: TBD. -->

Prefer readable text over decorative typography.

The homepage introduction uses the selected left-aligned editorial direction.
Responsive display type uses `clamp(2.25rem, 6.5vw, 6rem)`.
`VariableProximityText` uses a self-hosted Fontsource Roboto Flex Latin font
with the grade axis, scoped to the component; Inter remains the site font.
Its license ships in `public/fonts/roboto-flex-LICENSE.txt`.
The `baseGrade` and `peakGrade` props describe the resting and near-pointer
thickness; they are clamped to the font's `-200` to `150` grade range.
The component fixes the font at the thinner endpoint and animates a text stroke
to approximate the selected thickness. `intensity` scales the effect from `0`
to `1`. The homepage uses resting `-160`, near-cursor `150`, and radius `600px`.
Weight stays at `400`; width is not animated. Initial font loading can still
change text metrics; positions are remeasured when fonts finish loading.

Words wrap as units; individual graphemes animate in separate inline boxes
within each word. This trades natural kerning/shaping for independently
animated letters and layout stability, so
this component is intended for short display text, not body paragraphs.
Explicit line breaks separate the homepage title sentences; a sentence can
still wrap naturally when the viewport is too narrow.
The animated visual copy is hidden
from assistive technology and paired with one uninterrupted accessible copy.
Reduced-motion and touch-only settings render plain text without animation
or additional tab stops. The prototype uses the existing theme tokens.

Each letter's spring-smoothed proximity value also blends its color from
`foreground` toward `primary`, using CSS `color-mix(in oklab, ...)`. Both
thickness and color use the same influence and return to their resting values
when the pointer leaves the influence radius or browser window. CSS resolves theme tokens directly, so the effect
follows theme changes without measuring colors in JavaScript. The color
effect adds no layout changes or React renders during pointer movement;
reduced-motion and touch-only settings keep the normal text color.

## Layout

- Use consistent content widths and spacing scales.
- Prefer simple responsive grids and flex layouts.
- Maintain consistent header and footer styling.
- Design mobile layouts deliberately, not as an afterthought.

## Components

- Prefer shadcn/ui primitives.
- Keep card spacing, borders, and radii consistent.
- Use button variants consistently.
- Ensure hover and keyboard focus states are visible.

## Motion

- Prefer subtle, purposeful transitions.
- Avoid animations that distract from portfolio content.
- Respect `prefers-reduced-motion`.

## Design References

Add links to approved visual references here.
Do not introduce new visual styles without justification.
