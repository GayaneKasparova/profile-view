# ProfileView

A simple, responsive frontend application that displays user profiles and allows adding/removing them from favorites.

## Features
- Profile overview grid
- Single profile detail view
- Favorite/unfavorite profiles
- Fully responsive design (mobile-friendly)
- API-based architecture with no backend

## Tech Stack
- HTML5
- CSS3
- JavaScript (vanilla)
- [http-server](https://www.npmjs.com/package/http-server) (for local development)

## Installation & Running Locally

1. Install dependencies (only `http-server` required):
```bash
  npm install
```

2. Start the server:
```bash
  npx http-server ./ -o -p 9999
```

3. Open [http://localhost:9999](http://localhost:9999) in your browser.

> ⚠️ Do **not** open the HTML files directly via `file://` as API requests will fail due to CORS restrictions.

## AI Assistance Used
- JetBrains AI Assistant and ChatGPT were used for minor refactoring, layout suggestions, and documentation templates.
- All final implementation decisions, styling, and logic were written and reviewed manually.

## Project Structure
```
/bd-frontend-assessment
├── index.html
├── profile.html
├── css/
│   └── styles.css
├── js/
│   ├── main.js
│   ├── profile.js
│   └── api.js
└── README.md
```
