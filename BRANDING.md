# MedCheck Branding Guidelines

## Brand Identity

**Brand Name:** MedCheck

**Tagline:** "Verified Medication Intelligence"

**Brand Promise:** Simple, trustworthy medication data verification for healthcare professionals.

**Core Values:**
- ✅ Accuracy & Trust
- ✅ Speed & Simplicity
- ✅ Transparency
- ✅ Professional Reliability

---

## Visual Identity

### Primary Logo (Recommended)
**File:** `public/logos/medcheck-logo.svg`

**Design Elements:**
- Deep blue gradient circle (`#0F4C8B` → `#0D3B6E`)
- White checkmark (verification symbol)
- Green pill accent (`#10B981`)
- Light blue outer ring (`#F0F7FF`)

**Usage:**
- Hero sections
- Marketing materials
- App branding
- Website headers

**Size Guidelines:**
- Minimum: 120px (readable)
- Maximum: Full width (scale as needed)
- Padding: Clear space 20% of logo width

### Favicon
**File:** `public/logos/medcheck-favicon.svg`

**Design:** Simplified checkmark in blue circle

**Usage:**
- Browser tabs (16x16, 32x32, 64x64)
- App icons
- Social media profiles
- Bookmarks

### Wordmark
**File:** `public/logos/medcheck-wordmark.svg`

**Design:** Logo + "MedCheck" text + tagline

**Typography:**
- Font: Inter or Poppins
- Weight: 700 (bold)
- Size: 48px
- Tagline: 12px, medium gray

**Usage:**
- Blog headers
- Documentation
- Marketing headers
- Social media headers

### Dark Mode Logo
**File:** `public/logos/medcheck-logo-dark.svg`

**Design:** Light blue background variant for dark themes

**Usage:**
- Dark mode applications
- Dark theme websites
- Print on dark backgrounds

---

## Color Palette

### Primary Colors

| Color | Hex | RGB | Usage |
|-------|-----|-----|-------|
| **Primary Blue** | `#0F4C8B` | 15, 76, 139 | Main logo, CTAs, headers |
| **Primary Blue (Dark)** | `#0D3B6E` | 13, 59, 110 | Hover states, accents |
| **Accent Green** | `#10B981` | 16, 185, 129 | Success, approval, verified |
| **Accent Green (Dark)** | `#059669` | 5, 150, 105 | Hover states |

### Status Colors

| Status | Hex | Usage |
|--------|-----|-------|
| **Success** | `#22C55E` | Approved, verified, clear |
| **Warning** | `#F97316` | Cautions, restrictions |
| **Error** | `#EF4444` | Errors, denied, stop |

### Neutral Colors

| Color | Hex | Usage |
|-------|-----|-------|
| **Light Background** | `#F0F7FF` | Card backgrounds, light sections |
| **White** | `#FFFFFF` | Main background |
| **Light Gray** | `#E5E7EB` | Borders, dividers |
| **Medium Gray** | `#6B7280` | Secondary text |
| **Dark Gray** | `#1F2937` | Primary text, strong contrast |
| **Darker Gray** | `#111827` | Dark mode text |

---

## Typography

### Font Family
**Primary:** Inter or Poppins (sans-serif)

### Font Hierarchy

| Usage | Size | Weight | Line Height |
|-------|------|--------|-------------|
| H1 (Page Title) | 36px | 700 | 1.2 |
| H2 (Section) | 28px | 600 | 1.3 |
| H3 (Subsection) | 20px | 600 | 1.4 |
| Body Text | 16px | 400 | 1.5 |
| Small Text | 14px | 400 | 1.4 |
| Button Text | 16px | 600 | 1 |

---

## UI Components

### Buttons
- **Primary:** Deep blue background, white text, 8px border-radius
- **Secondary:** Light blue background, dark blue text
- **Hover:** Darker blue, slight shadow elevation

### Cards
- **Background:** White or light blue (`#F0F7FF`)
- **Border:** Light gray (`#E5E7EB`) or none
- **Radius:** 8px
- **Shadow:** Subtle (2px offset, 3px blur, 15% opacity)

### Status Badges
- **Success:** Green background, white text
- **Warning:** Orange background, white text
- **Error:** Red background, white text
- **Info:** Blue background, white text

### Forms
- **Input Border:** Light gray on focus → Primary blue
- **Label:** Medium gray text
- **Placeholder:** Light gray text
- **Error Message:** Error red text

---

## Logo Do's and Don'ts

### ✅ DO:
- ✅ Maintain clear space around logo (20% minimum)
- ✅ Use full logo on light backgrounds
- ✅ Use icon version for small sizes (< 120px)
- ✅ Keep the checkmark and pill intact
- ✅ Pair with clean, modern typography
- ✅ Use primary blue as main brand color
- ✅ Scale proportionally

### ❌ DON'T:
- ❌ Distort or stretch the logo
- ❌ Remove clear space requirements
- ❌ Change colors without approval
- ❌ Use at sizes smaller than favicon (without icon version)
- ❌ Rotate or skew the logo
- ❌ Add effects (3D, drop shadows, glows)
- ❌ Use against busy backgrounds
- ❌ Separate the checkmark and pill

---

## Applications

### Website
- Header: Wordmark or full logo
- Favicon: Icon version
- Buttons: Primary blue
- Accents: Accent green for success states

### Mobile App
- App Icon: Icon version
- Header: Icon or small wordmark
- Buttons: Primary blue
- Status indicators: Green/orange/red

### Marketing Materials
- Logo: Full logo with tagline
- Colors: Primary blue as dominant color
- Accents: Accent green for highlights
- Backgrounds: Light blue or white

### Documentation
- Headers: Wordmark
- Code examples: Accent green for success states
- Warnings: Warning orange
- Errors: Error red

---

## Files Reference

| File | Purpose | Size |
|------|---------|------|
| `medcheck-logo.svg` | Full logo | 200x200px |
| `medcheck-favicon.svg` | Browser favicon | 32x32px |
| `medcheck-wordmark.svg` | Logo + text | 400x120px |
| `medcheck-logo-dark.svg` | Dark mode variant | 200x200px |
| `concept-1-verified.svg` | Alternative concept | 200x200px |
| `concept-2-shield.svg` | Alternative concept | 200x200px |
| `concept-3-hexagon.svg` | Alternative concept | 200x200px |

---

## Implementation

### Next.js Setup

```tsx
// components/Logo.tsx
export function Logo({ variant = 'full' }) {
  return (
    <img 
      src={`/logos/medcheck-${variant}.svg`} 
      alt="MedCheck" 
      className="h-10"
    />
  )
}
```

### Tailwind Colors

```typescript
// tailwind.config.ts
colors: {
  primary: {
    50: '#F0F7FF',
    500: '#0F4C8B',
    600: '#0D3B6E',
    700: '#082552',
  },
  accent: {
    500: '#10B981',
    600: '#059669',
  },
}
```

### HTML Meta Tags

```html
<link rel="icon" href="/logos/medcheck-favicon.svg" type="image/svg+xml" />
<meta property="og:image" content="/logos/medcheck-logo.svg" />
```

---

## Contact & Questions

For branding guidelines questions or logo usage approval, please refer to the brand team.

**Last Updated:** 2026-07-14

---

## Appendix: Logo Concepts

### Concept 1: Verified Healthcare (SELECTED)
**File:** `concept-1-verified.svg`

**Why:** Best balance of healthcare credibility + modern design. Checkmark universally means verified/approved. Blue instills trust.

### Concept 2: Security Shield
**File:** `concept-2-shield.svg`

**Alternative for:** Enterprise/compliance-focused branding. Rx symbol emphasizes pharmacy connections.

### Concept 3: Data Hexagon
**File:** `concept-3-hexagon.svg`

**Alternative for:** Tech-forward audiences. Modern hexagon with pricing focus.
