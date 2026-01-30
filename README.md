# DevConf 2026 Website (Phase 1: Basic Styling)

This project contains the styled website for DevConf 2026, building upon the basic HTML structure with foundational CSS.

## Styling Approach (Basic)

We have applied a clean and professional design using core CSS concepts, avoiding complex frameworks or advanced features.

### Key Concepts Used

- **The Box Model**: Used `box-sizing: border-box` to ensure padding and borders don't increase element size unexpectedly.
- **Floats**: Used `float: left` and `float: right` for the Navigation bar layout.
- **Typography**: Imported **Inter** and **Roboto** from Google Fonts for a distinct hierarchy between headings and body text.
- **Standard Selectors**: Used element, class, and descendant selectors (e.g., `.nav-links a:hover`) to apply styles.
- **Hex Colors**: Used a consistent color palette defined by hex codes.

### Color Palette

- **Primary Orange**: `#f97316`
- **Dark Blue**: `#2c3e50`
- **Background Grey**: `#f4f7f6`
- **Dark Grey Text**: `#333333`

## File Structure

- **index.html**: Home page.
- **css/styles.css**: Main stylesheet linked to all pages.
- **pages/**:
  - `about.html`
  - `speakers.html`
  - `schedule.html`
  - `sponsors.html`

## How to Run

1. Open `index.html` in your web browser.
2. Click the navigation links to explore the 5 pages.
