---
name: Courtside Onyx
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#3a3939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#201f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353534'
  on-surface: '#e5e2e1'
  on-surface-variant: '#e2bfb0'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#a98a7d'
  outline-variant: '#5a4136'
  surface-tint: '#ffb693'
  primary: '#ffb693'
  on-primary: '#561f00'
  primary-container: '#ff6b00'
  on-primary-container: '#572000'
  inverse-primary: '#a04100'
  secondary: '#e9c349'
  on-secondary: '#3c2f00'
  secondary-container: '#af8d11'
  on-secondary-container: '#342800'
  tertiary: '#00daf3'
  on-tertiary: '#00363d'
  tertiary-container: '#00a8bb'
  on-tertiary-container: '#00373e'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffdbcc'
  primary-fixed-dim: '#ffb693'
  on-primary-fixed: '#351000'
  on-primary-fixed-variant: '#7a3000'
  secondary-fixed: '#ffe088'
  secondary-fixed-dim: '#e9c349'
  on-secondary-fixed: '#241a00'
  on-secondary-fixed-variant: '#574500'
  tertiary-fixed: '#9cf0ff'
  tertiary-fixed-dim: '#00daf3'
  on-tertiary-fixed: '#001f24'
  on-tertiary-fixed-variant: '#004f58'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353534'
typography:
  display-lg:
    fontFamily: Anybody
    fontSize: 72px
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -0.04em
  display-lg-mobile:
    fontFamily: Anybody
    fontSize: 40px
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-xl:
    fontFamily: Anybody
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-xl-mobile:
    fontFamily: Anybody
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Anybody
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-caps:
    fontFamily: Space Grotesk
    fontSize: 12px
    fontWeight: '700'
    lineHeight: '1'
    letterSpacing: 0.15em
  label-mono:
    fontFamily: Space Grotesk
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1'
    letterSpacing: 0.05em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  container-max: 1440px
  gutter: 24px
  margin-desktop: 64px
  margin-mobile: 20px
  unit: 8px
---

## Brand & Style

This design system embodies the high-stakes atmosphere of professional basketball through a lens of dark luxury and futuristic broadcast design. The brand personality is elite, intense, and technologically advanced, targeting a premium audience of sports enthusiasts and collectors.

The visual style is a fusion of **Dark Minimalism** and **Glassmorphism**, elevated by a high-end CGI aesthetic. It leverages matte surfaces, HDR-style lighting, and metallic accents to create a sense of depth and prestige. The emotional goal is to make the user feel like they are behind the scenes of a championship broadcast or inside a high-end luxury skybox. All interfaces should emphasize motion, high-contrast clarity, and a "tactile digital" feel where surfaces react to light and interaction with subtle reflections.

## Colors

The palette is anchored in a deep **Matte Black (#0A0A0A)** to provide a canvas for high-chroma accents. 

- **Primary (Neon Orange - #FF6B00):** Represents the heat of the court and energy. Used for critical CTAs and active states.
- **Secondary (Metallic Gold - #D4AF37):** Used sparingly to denote prestige, achievements, and premium tiering.
- **Tertiary (Electric Blue - #00E5FF):** Utilized for data visualization, technical details, and digital HUD elements.
- **Neutral (Obsidian & Slate):** A range of greys from #121212 to #2D2D2D are used for surface layering, creating a "black-on-black" depth.

Backgrounds should utilize subtle radial gradients (Dark Grey to Black) to mimic studio lighting and prevent visual flatness.

## Typography

The typographic scale is designed for impact and cinematic clarity. 

- **Display & Headlines:** Utilize **Anybody** for its aggressive, variable-width nature. Use heavy weights and tight tracking for a bold, broadcast-ready look.
- **Body:** **Hanken Grotesk** provides a clean, contemporary balance to the loud headlines, ensuring readability for stats and long-form content.
- **Labels & Metadata:** **Space Grotesk** introduces a subtle technical/futuristic edge, ideal for clock timers, jersey numbers, and data points.

Use uppercase transforms for labels and navigation to maintain the high-energy sports aesthetic. All text should maintain high contrast against the dark background, often utilizing pure white or the primary orange.

## Layout & Spacing

The layout follows a **Fluid 12-Column Grid** on desktop and a **4-Column Grid** on mobile. 

The system relies on an 8px base unit for all padding and margins to ensure mathematical harmony. On desktop, large side margins (64px) allow for "breathing room" that mimics a premium editorial layout. For mobile, margins tighten to 20px to maximize screen real estate for data-heavy views.

Use asymmetrical layouts for feature sections to create visual tension and dynamic energy. Strategic use of "Negative Space" is essential to prevent the dark theme from feeling cluttered; ensure elements have significant padding to maintain their "premium object" status.

## Elevation & Depth

Depth is conveyed through **Glassmorphism** and **Tonal Layering**. 

1.  **Base Layer:** Solid Matte Black (#0A0A0A).
2.  **Surface Layer:** Semi-transparent dark fills (e.g., #FFFFFF with 5-8% opacity) with a 20px backdrop blur. This creates a frosted glass effect that feels light and premium.
3.  **Outlines:** Instead of heavy shadows, use "Inner Glows" or 1px strokes with linear gradients (e.g., Transparent to White at 15% opacity) to define edges. 
4.  **Lighting:** Use subtle, non-interactive "rim lighting" (thin strokes of Gold or Orange) on the top-left edges of cards to simulate a studio light source hitting the UI.

Avoid traditional drop shadows; instead, use blurred colored "blobs" behind key elements to create a neon-glow under-lighting effect.

## Shapes

The design system uses a **Soft (0.25rem - 4px)** roundedness. 

While the aesthetic is futuristic, sharp and slightly softened corners convey a more technical, engineered precision than fully rounded or pill-shaped elements. This "Low Radius" approach mimics high-end hardware and industrial design found in luxury sports equipment.

- **Standard Elements:** 4px radius.
- **Large Cards/Containers:** 8px radius.
- **Interactive States:** Maintain consistent radius; avoid transitioning to pills to keep the "precision-cut" feel.

## Components

- **Buttons:** Primary buttons should be solid Neon Orange with black text. Secondary buttons are "Ghost" style with a Metallic Gold 1px border. Apply a subtle reflection gradient (top-to-bottom) to give them a 3D metallic feel.
- **Cards:** Use the glassmorphism approach. A dark, blurred background with a very thin, semi-transparent top border to catch the "light."
- **Inputs:** Darker than the background with a 1px bottom border. On focus, the bottom border glows in Electric Blue with a subtle outer glow.
- **Chips:** Small, uppercase labels with a "Glass" background and 1px border matching their category color (e.g., Gold for "MVP", Orange for "Live").
- **Stat HUDs:** For player statistics, use high-contrast white text on glass cards with Electric Blue data visualizations (bars/graphs).
- **Navigation:** Top-tier navigation should be persistent, utilizing a "floating glass" bar with backdrop blur and centered alignment.