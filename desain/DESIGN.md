---
name: Borneo Transit System
colors:
  surface: '#f7f9fb'
  surface-dim: '#d8dadc'
  surface-bright: '#f7f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e6e8ea'
  surface-container-highest: '#e0e3e5'
  on-surface: '#191c1e'
  on-surface-variant: '#42474f'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#727780'
  outline-variant: '#c2c7d1'
  surface-tint: '#2d6197'
  primary: '#00355f'
  on-primary: '#ffffff'
  primary-container: '#0f4c81'
  on-primary-container: '#8ebdf9'
  inverse-primary: '#a0c9ff'
  secondary: '#1b6d24'
  on-secondary: '#ffffff'
  secondary-container: '#a0f399'
  on-secondary-container: '#217128'
  tertiary: '#552700'
  on-tertiary: '#ffffff'
  tertiary-container: '#773900'
  on-tertiary-container: '#ffa564'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d2e4ff'
  primary-fixed-dim: '#a0c9ff'
  on-primary-fixed: '#001c37'
  on-primary-fixed-variant: '#07497d'
  secondary-fixed: '#a3f69c'
  secondary-fixed-dim: '#88d982'
  on-secondary-fixed: '#002204'
  on-secondary-fixed-variant: '#005312'
  tertiary-fixed: '#ffdcc6'
  tertiary-fixed-dim: '#ffb786'
  on-tertiary-fixed: '#311300'
  on-tertiary-fixed-variant: '#723600'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
typography:
  headline-xl:
    fontFamily: Manrope
    fontSize: 40px
    fontWeight: '800'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Manrope
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Manrope
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 34px
  headline-md:
    fontFamily: Manrope
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
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-bold:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.05em
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  container-max: 1200px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 40px
---

## Brand & Style
The design system is built to convey reliability, safety, and modern efficiency for inter-city travel across the Borneo landscape. The target audience includes daily commuters, business travelers, and families traveling between South and Central Kalimantan who require a stress-free booking experience.

The visual style follows a **Corporate / Modern** aesthetic with a **Minimalist** focus on clarity. It utilizes high-quality whitespace to reduce cognitive load during the booking process. The atmosphere is professional and localized, avoiding generic "tech" tropes in favor of a sturdy, institutional feel that suggests a well-regulated and premium transport service.

## Colors
The palette is rooted in trust and natural surroundings.
- **Primary (Deep Blue):** Evokes authority, safety, and the professional nature of a transit authority.
- **Secondary (Forest Green):** Represents the lush landscape of Kalimantan and symbolizes "go" or "safe passage."
- **Tertiary (Energetic Orange):** Used sparingly for urgent calls to action, real-time alerts, and active tracking indicators.
- **Neutral (Slate Gray/White):** Provides a clean, breathable foundation that ensures the interface remains legible in outdoor lighting conditions.

## Typography
This design system uses a dual-font approach to balance modernity with utility. **Manrope** is used for headlines to provide a refined, geometric character that feels premium. **Inter** is used for all functional text, UI labels, and body copy to ensure maximum readability across various screen types and lighting conditions. 

Weight is used strategically to create hierarchy: bold weights are reserved for critical travel information like departure times and prices, while regular weights are used for descriptive content.

## Layout & Spacing
The layout follows a **Fluid Grid** model with a strict 8px base unit rhythm.
- **Desktop:** A 12-column grid with 24px gutters. Content is centered within a 1200px max-width container.
- **Tablet:** 8-column grid with 20px gutters and 24px side margins.
- **Mobile:** 4-column grid with 16px gutters and 16px side margins. 

Priority is given to vertical stacking for schedule cards on mobile. Large touch targets (minimum 48px height) are required for all interactive elements to accommodate users on the move.

## Elevation & Depth
To maintain a professional and trustworthy feel, this design system uses **Tonal Layers** combined with **Ambient Shadows**. 
- **Surface Level 0 (Background):** The neutral base color (#F8FAFC).
- **Surface Level 1 (Cards/Inputs):** White (#FFFFFF) with a subtle, very diffused shadow (0px 4px 20px rgba(15, 76, 129, 0.05)).
- **Surface Level 2 (Modals/Dropdowns):** White with a more pronounced shadow to indicate higher elevation and focus.

Outlines are used for form inputs (1px solid #E2E8F0) rather than heavy shadows to keep the interface looking "flat" and modern, only using elevation to separate content blocks.

## Shapes
A **Rounded** (0.5rem) shape language is applied to all UI elements. This strikes a balance between the friendliness of a travel service and the precision of a professional transport authority. 
- **Buttons:** 0.5rem (8px) for standard, pill-shaped for special tags.
- **Cards:** 1rem (16px) for large schedule and route containers.
- **Inputs:** 0.5rem (8px) to match button styling for a cohesive form-filling experience.

## Components
- **Schedule Cards:** Use Level 1 elevation. Feature large, bold Manrope text for departure/arrival times. Use a Primary Blue vertical bar on the left to indicate "Confirmed" status.
- **Booking Forms:** Group related inputs (Origin, Destination, Date) in a single elevated container. Use high-contrast Primary Blue buttons for "Search" and "Book Now."
- **Status Indicators:** 
    - *On Time:* Secondary Green pill with white text.
    - *Delayed:* Tertiary Orange pill with white text.
    - *Tracking Dot:* Pulsing Orange dot for live vehicle location on maps.
- **Lists:** Clean, border-bottom separated rows for seat selection or passenger details, using 16px vertical padding.
- **Real-time Tracking Map:** A simplified map view with Primary Blue routes and a Tertiary Orange icon representing the bus/shuttle position.
- **Input Fields:** Use 1px Slate borders that transition to 2px Primary Blue on focus, ensuring the user knows exactly where they are interacting.