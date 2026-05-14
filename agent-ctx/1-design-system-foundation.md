# Task ID: 1 — Design System Foundation

## Agent: design-system-foundation

## Summary
Built the complete design system foundation for a luxury dark-glass Armenia tours website.

## Files Modified
1. **`/src/app/globals.css`** — Full rewrite with premium dark-first design system
2. **`/src/app/layout.tsx`** — Updated with Cormorant Garamond font, Lenis provider, dark-first theme
3. **`/src/components/providers/smooth-scroll-provider.tsx`** — New Lenis smooth scroll provider

## Key Design Decisions
- **Dark-first**: Root `:root` uses the dark obsidian palette; `.dark` class mirrors it
- **Gold accent system**: Primary color is `#D6B36A` (accent-gold), replacing generic grays
- **Glass classes**: 6 utility classes with `linear-gradient(135deg, ...)` backgrounds for premium frosted effect
- **No @apply with custom classes**: All glass classes use raw CSS to avoid Tailwind v4 compatibility issues
- **Font pairing**: Cormorant Garamond (serif headings) + Inter (sans body)
- **Lenis smooth scroll**: Duration 1.2s, custom easing, requestAnimationFrame loop

## Color System
| Token | Value | Usage |
|-------|-------|-------|
| `--bg-obsidian` | #0B0D10 | Main background |
| `--bg-graphite` | #12161B | Secondary background |
| `--bg-elevated` | #171C22 | Elevated surfaces |
| `--accent-gold` | #D6B36A | Primary accent |
| `--accent-amber` | #C88A3D | Secondary accent |
| `--accent-icy` | #7BA7C9 | Tertiary accent |
| `--text-primary` | #F5F1E8 | Main text |
| `--text-secondary` | #C9C1B6 | Secondary text |
| `--text-muted` | #8C867D | Muted text |
| `--glow-gold` | rgba(214,179,106,0.22) | Gold glow |

## Glass Classes
| Class | Blur | Tint | Border | Use Case |
|-------|------|------|--------|----------|
| `.glass-panel` | 24px | 0.08/0.03 | 0.12 | Main frosted panels |
| `.glass-elevated` | 40px | 0.12/0.04 | 0.18 | Modals, overlays |
| `.glass-subtle` | 18px | 0.06/0.02 | 0.08 | Tour cards, light surfaces |
| `.glass-nav` | 40px | 0.08 | 0.08 (bottom) | Navbar |
| `.glass-button` | 12px | 0.10/0.04 | 0.12 | Interactive buttons |
| `.glass-input` | 8px | 0.05 | 0.10 | Form inputs |

## Verification
- `bun run lint` passes with zero errors
- Dev server compiles cleanly
- All backward-compatible aliases maintained
