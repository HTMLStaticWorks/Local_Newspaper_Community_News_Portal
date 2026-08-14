# [NEWZ] — Premium Modern Editorial Newspaper & Magazine Template

**[NEWZ]** is a sophisticated, digital media and local news portal template designed with a premium broadsheet aesthetic. It pairs classic editorial typography and strict grid alignments with modern dark/light styling, interactive components, client-side input validations, and full Right-to-Left (RTL) localization support.

---

## 📂 File Structure

```
Local Newspaper & Community News Portal/
├── index.html            # Primary homepage (Editorial layout, news category grids)
├── home2.html            # Alternative broadsheet homepage (Interactive poll, trending sidebar)
├── about.html            # Legacy timeline history & editorial team directories
├── services.html         # Subscription packages & advertiser pricing grids
├── blog.html             # Article archives index with dynamic category filter tabs
├── blog-single.html      # News detail page (drop caps, pull quotes, podcast audio)
├── contact.html          # Dynamic advertiser/press tip form with full client validations
├── login.html            # Centered subscriber login (No header/footer, no theme toggle)
├── register.html         # Centered subscriber registration (Matching login card)
├── dashboard.html        # Subscriber profile dashboard (Active subscriptions, bookmarks)
├── 404.html              # Custom editorial page not found warning
├── coming-soon.html      # Realtime countdown clock to weekly print relaunch
├── assets/
│   ├── css/
│   │   ├── style.css     # Design tokens, typography variables, layouts, theme styles
│   │   └── rtl.css       # Mirroring overrides for Right-to-Left localization
│   └── js/
│       └── main.js       # Navigation, drawer toggle, theme toggle, RTL logic, validations
└── README.md             # Development documentation
```

---

## 🎨 Design System & CSS Variables

All core branding, sizing, and colors are defined dynamically as CSS variables in `assets/css/style.css`:

- **Typography Families**:
  - Headings: `'Playfair Display', serif`
  - Body Copy: `'Lora', serif` (For reading legibility)
  - UI Labels & Buttons: `'Outfit', sans-serif`
- **Typographic Weights**: Headings (H1 to H3) are constrained to maximum weight values (never exceeding `580` weight) in accordance with vintage printed typography styles.
- **Harmonious Color Palettes**:
  - **Light Mode (Default)**: Background: `#fbf9f6` (Warm paper parchment) | Primary Ink: `#111111` (Deep charcoal black) | Accent Color: `#b81d24` (Editorial crimson red).
  - **Dark Mode**: Background: `#121212` (Ink black) | Primary Ink: `#f5f5f5` (Paper white) | Accent Color: `#ff4d56` (Contrasting red).
- **Subtle Interactions**: Subtle hover scale transformations are applied to images and interactive card objects. Smooth 60fps transitions are active for light/dark swaps and hamburger drawer displays.

---

## ⚙️ Key Technical Features

1. **Light / Dark Theme Switching**: Swaps sun/moon icons, persists via user browser `localStorage`, and falls back to standard user operating system color scheme preference (`prefers-color-scheme`).
2. **Right-to-Left (RTL) Toggle**: Set in navigation bars via a custom `arrow-left-right` icon. Dynamically applies `dir="rtl"` to the main `<html>` tags, applying mirrored column flow and drawer entries from `assets/css/rtl.css`.
3. **Rigorous Form Validation**: Client-side validator checks for empty fields, performs regex checks on email structures, verifies password minimum length (8 chars), and guarantees matching passwords inside authentication cards before simulating successful dispatches.
4. **Interactive Widgets**:
   - **Community Poll**: Casts an instant simulated vote on a municipal question and shifts progress overlay percentages.
   - **Countdown Clock**: Computes exact time difference to weekly broadsheet print launches (Days, Hours, Mins, Secs) and decrements in real-time.
   - **Category Filters**: Categorized article listings dynamically filter based on active selection (Civic, Sports, Business, Education, Classifieds, Events). Supports deep link category parameter selection (e.g. `blog.html?category=sports`).
   - **Reader Reviews Slider**: Staggered auto-playing carousel showcasing community testimonials.

---

## 📱 Breakpoint Responsiveness (Mobile-First)

Media queries are implemented exactly to the requested viewport thresholds:
- **Large Desktop**: `@media (min-width: 1440px)`
- **Desktop (Horizontal Nav)**: `@media (min-width: 1025px) and (max-width: 1439px)`
- **Tablet / Mobile Hamburger (Drawer)**: `@media (max-width: 1024px)`
- **Mobile Grid**: `@media (max-width: 768px)`
- **Small Viewport (Centered Columns)**: `@media (max-width: 360px)`

---

## 💻 Local Testing Instruction

This template is built entirely using pure semantic HTML5, vanilla CSS, and vanilla ES6 Javascript. It does not require dependencies or node compilation to run.

Simply open `index.html` in any modern web browser, or use a local utility extension (like VS Code Live Server or python's `http.server`) to preview pages:
```bash
# Python local preview utility
python -m http.server 8000
```
Then navigate to `http://localhost:8000` to test pages.
