---
name: SignalSprint Lite
colors:
  surface: '#0b1326'
  surface-dim: '#0b1326'
  surface-bright: '#31394d'
  surface-container-lowest: '#060e20'
  surface-container-low: '#131b2e'
  surface-container: '#171f33'
  surface-container-high: '#222a3d'
  surface-container-highest: '#2d3449'
  on-surface: '#dae2fd'
  on-surface-variant: '#bbc9cd'
  inverse-surface: '#dae2fd'
  inverse-on-surface: '#283044'
  outline: '#859397'
  outline-variant: '#3c494c'
  surface-tint: '#2fd9f4'
  primary: '#8aebff'
  on-primary: '#00363e'
  primary-container: '#22d3ee'
  on-primary-container: '#005763'
  inverse-primary: '#006877'
  secondary: '#ffafd3'
  on-secondary: '#620040'
  secondary-container: '#85145a'
  on-secondary-container: '#ff93c8'
  tertiary: '#a7f242'
  on-tertiary: '#1f3700'
  tertiary-container: '#8cd523'
  on-tertiary-container: '#355800'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#a2eeff'
  primary-fixed-dim: '#2fd9f4'
  on-primary-fixed: '#001f25'
  on-primary-fixed-variant: '#004e5a'
  secondary-fixed: '#ffd8e7'
  secondary-fixed-dim: '#ffafd3'
  on-secondary-fixed: '#3d0026'
  on-secondary-fixed-variant: '#85145a'
  tertiary-fixed: '#acf847'
  tertiary-fixed-dim: '#91db2a'
  on-tertiary-fixed: '#102000'
  on-tertiary-fixed-variant: '#304f00'
  background: '#0b1326'
  on-background: '#dae2fd'
  surface-variant: '#2d3449'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '800'
    lineHeight: '1.1'
  hud-header:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '700'
    lineHeight: '1.2'
  stat-value:
    fontFamily: JetBrains Mono
    fontSize: 24px
    fontWeight: '700'
    lineHeight: '1'
    letterSpacing: -0.05em
  stat-label:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 10px
    fontWeight: '400'
    lineHeight: '1'
spacing:
  unit: 4px
  container-margin: 24px
  hud-gutter: 12px
  grid-cell: 32px
  panel-padding: 16px
---

## Brand & Style
The design system is engineered for high-velocity engagement and digital precision. It targets a competitive audience that values clarity under pressure and a high-fidelity arcade aesthetic. 

The style is a fusion of **Glassmorphism** and **High-Contrast Digitalism**. It utilizes deep, void-like backgrounds to make neon "signal" elements pop with maximum luminance. UI elements are treated as overlays on the game world—translucent, sharp, and radiating energy. The emotional response should be one of focused urgency and futuristic technical mastery.

## Colors
This palette is built on a "Dark Mode First" philosophy. 

- **Primary (Electric Cyan):** Used for the main player path, active pulses, and primary HUD navigation.
- **Secondary (Energy Magenta):** Reserved for critical energy levels, power-ups, and high-intensity UI warnings.
- **Tertiary (Combo Lime):** Indicates success states, perfect streaks, and health regeneration.
- **Neutral (Deep Slate):** The foundation. It provides the high-contrast backdrop necessary for neon light blooms.

All interactive elements should utilize the primary color as their "active" state, often accompanied by a glow effect (filter: drop-shadow) in the same hue.

## Typography
The typography strategy separates **instructional UI** from **technical data**. 

- **Inter** handles the HUD headers and general UI messaging. It is set with tight tracking and heavy weights to maintain a "blocky," authoritative feel that mimics modern cockpit displays.
- **JetBrains Mono** is used exclusively for numbers, scores, and technical readouts. The monospaced nature ensures that rapidly changing digits (like a live score or timer) do not cause layout jitter, maintaining a stable visual rhythm during high-speed gameplay.

## Layout & Spacing
The layout prioritizes a **Fixed Central Playfield** with a floating HUD. 

- **Playfield:** A strictly aligned grid where the game action occurs. 
- **HUD (Heads-Up Display):** Fixed to the corners and top edge of the viewport. These panels use a compact 4px base unit to keep information dense and out of the way of the central action.
- **Overlays:** Menus and pause screens are centered modals. 

On mobile, the HUD elements compress into the top and bottom 10% of the screen, utilizing "safe areas" to ensure control buttons remain tactile and reachable while keeping the playfield unobstructed.

## Elevation & Depth
Depth is created through **chromatic layering** and **transparency** rather than traditional shadows.

1.  **Level 0 (The Void):** Background color #0F172A. Static and deep.
2.  **Level 1 (The Grid):** Low-opacity Cyan or Slate lines (#FFFFFF10) defining the playfield.
3.  **Level 2 (The Glass):** HUD panels and menus. Use `backdrop-filter: blur(12px)` and a thin 1px border (#FFFFFF20).
4.  **Level 3 (The Signal):** Player icons, active pulses, and text. These elements use an "Outer Glow" effect (box-shadow or drop-shadow) with 0px spread and 8-12px blur in their respective neon colors.

## Shapes
This design system employs a **Sharp (0px)** corner radius for all core gameplay elements and HUD panels to reinforce the "geometric" and "technical" narrative. 

Angular cuts (45-degree chamfers) can be used on panel corners to suggest advanced engineering. Only decorative "energy pulses" or circular player avatars may break this rule to provide visual contrast against the rigid UI.

## Components
- **Buttons:** Sharp-edged boxes with a 1px Primary Cyan border. On hover, the box fills with a 20% opacity Cyan tint and the border glow intensifies.
- **Score Readouts:** Enclosed in "Glass" panels with a Magenta left-accent bar. Numbers use the `stat-value` JetBrains Mono style.
- **Energy Bars:** Horizontal tracks with a background of #0F172A and a foreground fill of Magenta. For "Overdrive" states, the fill should pulse or strobe.
- **Combo Chips:** Small, sharp tags using the Lime color. They should appear near the point of action and float upward before fading.
- **Input Fields:** Minimalist underlines in Cyan. When focused, the underline expands into a full sharp-edged stroke around the input area.
- **HUD Panels:** Use a semi-transparent slate background. Top-right corners should feature a small "technical" ID or version number in `label-sm` to enhance the arcade-software feel.