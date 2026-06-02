---
name: Lux-Custom UI
colors:
  surface: '#121414'
  surface-dim: '#121414'
  surface-bright: '#383939'
  surface-container-lowest: '#0d0e0f'
  surface-container-low: '#1b1c1c'
  surface-container: '#1f2020'
  surface-container-high: '#292a2a'
  surface-container-highest: '#343535'
  on-surface: '#e3e2e2'
  on-surface-variant: '#d0c5af'
  inverse-surface: '#e3e2e2'
  inverse-on-surface: '#2f3031'
  outline: '#99907c'
  outline-variant: '#4d4635'
  surface-tint: '#e9c349'
  primary: '#f2ca50'
  on-primary: '#3c2f00'
  primary-container: '#d4af37'
  on-primary-container: '#554300'
  inverse-primary: '#735c00'
  secondary: '#c8c6c5'
  on-secondary: '#313030'
  secondary-container: '#474746'
  on-secondary-container: '#b7b5b4'
  tertiary: '#d0cecd'
  on-tertiary: '#313030'
  tertiary-container: '#b5b2b2'
  on-tertiary-container: '#464545'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffe088'
  primary-fixed-dim: '#e9c349'
  on-primary-fixed: '#241a00'
  on-primary-fixed-variant: '#574500'
  secondary-fixed: '#e5e2e1'
  secondary-fixed-dim: '#c8c6c5'
  on-secondary-fixed: '#1c1b1b'
  on-secondary-fixed-variant: '#474746'
  tertiary-fixed: '#e5e2e1'
  tertiary-fixed-dim: '#c9c6c5'
  on-tertiary-fixed: '#1c1b1b'
  on-tertiary-fixed-variant: '#474646'
  background: '#121414'
  on-background: '#e3e2e2'
  surface-variant: '#343535'
typography:
  display-lg:
    fontFamily: Playfair Display
    fontSize: 64px
    fontWeight: '700'
    lineHeight: 72px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-sm:
    fontFamily: Playfair Display
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.1em
  button:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.05em
spacing:
  unit: 8px
  container-max: 1440px
  sidebar-width: 400px
  gutter: 24px
  margin-mobile: 20px
  margin-desktop: 64px
---

## Brand & Style

The design system is crafted for an ultra-luxury jewelry customization experience. It evokes an emotional response of exclusivity, precision, and bespoke artistry. By marrying **Minimalism** with **Glassmorphism**, the interface recedes to let the high-fidelity jewelry renders take center stage. 

The aesthetic is "Obsidian Noir"—a dark, high-contrast environment that mimics the velvet lining of a jewelry box. Every interaction is designed to feel deliberate and weighted, using thin metallic accents to guide the user through the configuration process. The target audience values heritage and modern technology in equal measure, demanding an interface that feels as premium as the physical product.

## Colors

This design system utilizes a palette of deep, light-absorbing blacks and lustrous metallic gold.

*   **Obsidian (#0A0A0A):** The foundation. Used for main backgrounds to provide infinite depth and maximize the brilliance of jewelry photography.
*   **Charcoal (#1A1A1A):** Used for elevated surfaces, sidebars, and containers to create subtle hierarchy within the dark environment.
*   **Metallic Gold (#D4AF37):** The primary accent. Used sparingly for critical CTAs, active states, and brand-defining markers.
*   **Stellar White (#FFFFFF):** Reserved strictly for primary headlines and high-priority body text to ensure maximum legibility against the dark background.
*   **Muted Silver (#8E8E8E):** Used for secondary information and inactive UI elements to maintain a low-noise environment.

## Typography

The typography strategy balances editorial elegance with functional clarity. 

**Playfair Display** is used for all display and headline roles. Its high-contrast serifs and classical proportions establish a sense of heritage. For large display titles, use negative letter-spacing to create a tighter, more "fashion-forward" look.

**Inter** handles all utility, navigation, and body copy. It provides a clean, neutral counterpoint to the serif headlines, ensuring that complex customization data and pricing are easy to digest. Use `label-caps` for section headers and small navigational cues to evoke the feel of high-end watch face markings.

## Layout & Spacing

The layout follows a **Fixed Grid** philosophy for desktop to maintain a curated, gallery-like feel, while transitioning to a fluid model for mobile.

*   **Customization Canvas:** The central viewport is reserved for the 3D jewelry render. It should remain as uncluttered as possible.
*   **Sleek Sidebars:** Tools and configuration options are housed in a fixed-width right sidebar (400px). This sidebar uses a subtle glassmorphism effect to feel light despite the dark palette.
*   **Rhythm:** A strict 8px spacing system is used. Large margins (64px+) are encouraged to signify luxury; density should be avoided unless in complex data tables.
*   **Mobile Reflow:** On mobile, the sidebar transforms into a bottom-sheet drawer, allowing the user to peek at the jewelry render while making selections.

## Elevation & Depth

Depth in the design system is achieved through **Glassmorphism** and **Tonal Layering** rather than traditional drop shadows.

*   **Surface Layers:** The base background is `#0A0A0A`. Overlays, such as modal windows or customization drawers, use a semi-transparent `#1A1A1A` (80% opacity) with a high-density backdrop blur (32px).
*   **Metallic Outlines:** Instead of shadows, use 1px solid borders in `#D4AF37` (at 20-40% opacity) to define the edges of active elements. This simulates the way light catches the edge of a gold setting.
*   **Inner Glow:** For active buttons or selected jewelry components, a faint gold inner-glow (2px blur) can be used to suggest the material is illuminated from within.

## Shapes

The shape language is **Sharp (0)**. 

To reflect the precision of gemstone cutting and architectural jewelry design, this design system avoids rounded corners. Square edges convey a sense of modern sophistication and structural integrity. 

*   **Exceptions:** Buttons may use a very slight 2px radius only if required for platform-specific accessibility, but the preferred state is a 90-degree angle.
*   **Interactive Targets:** While the visual shape is sharp, the hit-boxes for touch and click must remain generous (minimum 44px) to ensure a premium, effortless user experience.

## Components

*   **Buttons:** Primary CTAs are solid Gold (#D4AF37) with black text. Secondary buttons are "Ghost" style—sharp 1px gold borders with white text.
*   **Glass Overlays:** Used for the customization sidebar and tooltips. Use a 20% white border at 1px thickness to give the glass a "beveled" edge look.
*   **Jewelry Chips:** For selecting materials (Gold, Platinum, Rose Gold), use circular swatches with high-resolution textures. The active state is indicated by a double-gold ring.
*   **Input Fields:** Minimalist design—just a 1px bottom border in charcoal that transitions to gold on focus. Labels sit in `label-caps` typography above the line.
*   **Cards:** Product cards use a "No-Border" approach, relying on the contrast between the Obsidian background and the jewelry render. On hover, a thin gold frame appears to "encase" the item.
*   **Progress Indicators:** For multi-step customization (Ring > Stone > Engraving), use a thin, gold horizontal line that grows as steps are completed.