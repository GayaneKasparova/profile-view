# ProfileView

A simple modern, responsive frontend app for browsing and favoriting user profiles. Built with vanilla JS, SCSS, and a mobile-first UI approach.

## Features
- Profile overview grid
- Single profile detail view
- Favorite/unfavorite profiles
- Clean, modern design using SCSS (modular)
- API-based architecture with no backend

## Tech Stack
- HTML5
- SCSS (compiled to CSS)
- Vanilla JavaScript (ES Modules)
- Local development server via [http-server](https://www.npmjs.com/package/http-server) 

## Installation & Running Locally

1. Install dependencies (only `http-server` required):
```bash
  npm install
```
### 2. (Optional) Start SCSS watch during development
This will automatically compile `styles.scss` to `styles.css` when you save changes.

```bash
  npm run sass:watch
```

3Start the server:
```bash
  npx http-server ./ -o -p 9999
```

3Open [http://localhost:9999](http://localhost:9999) in your browser.

> ⚠️ Do **not** open the HTML files directly via `file://` as API requests will fail due to CORS restrictions.

## AI Assistance Used
- JetBrains AI Assistant and ChatGPT were used for minor refactoring, layout suggestions, and documentation templates.
- All final implementation decisions, styling, and logic were written and reviewed manually.

## Project Structure
```
/profile-view

css/
├── _base.scss
├── _components.scss
├── _mixins.scss
├── _variables.scss
├── styles.scss       # main SCSS file
└── styles.css        # compiled output

js/
├── api.js
├── auth.js
├── favorites.js
├── loader.js
├── main.js
├── profile.js
└── render.js

index.html
favorites.html
profile.html

favicon.ico
package.json
vercel.json
```
## Design Notes
- Uses modern typography and layout practices
- Built mobile-first with modular SCSS and clean class structure
- Includes custom media query mixins and CSS variables for theme control


