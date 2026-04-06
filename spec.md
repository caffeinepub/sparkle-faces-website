# Sparkle Faces Website

## Current State
The site has a main landing page, `/admin` panel, and `/promo` page. There is no slot confirmation page. The app uses a Classic Gucci black/gold/silver luxury theme with Playfair Display serif fonts.

## Requested Changes (Diff)

### Add
- New page at `/slot-confirmation` route
- Dynamic form to fill in: Child's Name, Parent's Name, Contact Number, Date of Registration
- A beautifully rendered confirmation letter that appears below the form after submission
- "Download as PDF" button using `window.print()` (same approach as `/promo` page)
- Confirmation letter content:
  - Sparkle Faces logo/branding header
  - "Slot Confirmation Letter" heading with confirmation number (auto-generated)
  - Child's Name, Parent's Name, Contact Number, Date of Registration
  - Amount paid: ₹3,500 with note "If not selected, the amount will be fully refunded"
  - Confirmation message: shoot day instructions (what to bring, dress code, etc.)
  - Sparkle Faces contact details at bottom
  - Kunal Chaudhary signature
- Route added to App.tsx for `/slot-confirmation`

### Modify
- `App.tsx`: Add new route check for `/slot-confirmation` to render `SlotConfirmationPage`

### Remove
- Nothing removed

## Implementation Plan
1. Create `src/frontend/src/pages/SlotConfirmationPage.tsx` with:
   - Dynamic form with 4 fields (child name, parent name, contact, date)
   - On submit: show the rendered confirmation letter below
   - PDF print styles (hide form, show letter cleanly)
   - Luxury black/gold theme matching rest of site
   - Auto-generated confirmation number (timestamp-based)
2. Update `App.tsx` to add `/slot-confirmation` route
