# DevConf 2026 Website (Day 2 Enhancement)

This project contains the enhanced website for DevConf 2026, featuring Semantic HTML5, comprehensive forms, and multimedia integration.

## Features

- **Semantic HTML5**: All pages use proper tags (`<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<footer>`) for better accessibility and SEO.
- **Registration Form**: A robust form (`pages/register.html`) with validation for personal details, professional info, and conference preferences.
- **Multimedia**:
  - Promotional video on the Homepage (`index.html`).
  - Speaker introduction videos on the Speakers page (`pages/speakers.html`).
- **Contact & FAQ**:
  - Dedicated Contact page with a map and inquiry form (`pages/contact.html`).
  - FAQ page with categorized information (`pages/faq.html`).
- **Professional Styling**: Unified `style.css` for a consistent, responsive, and modern look.

## File Structure

- **root/**:
  - `index.html`: The main landing page.
  - `style.css`: Global stylesheet.
  - `README.md`: Project documentation.
- **pages/**:
  - `about.html`, `schedule.html`, `speakers.html`, `sponsors.html`: Inner pages.
  - `register.html`, `contact.html`, `faq.html`: New functional pages.
- **assets/**:
  - `images/`: Stores project images.
  - `videos/`: Stores video assets (currently placeholders).

## How to Run

1. Open `index.html` in any modern web browser.
2. Navigate effectively using the top navigation bar or breadcrumbs.
3. Test forms (Registration, Contact) to see validation in action.

## Notes

- Video files in `assets/videos/` are placeholders. The code references standard formats (`.mp4`, `.webm`) and includes poster images.
- All forms use `method="POST"` to a dummy action `#` for demonstration purposes.
