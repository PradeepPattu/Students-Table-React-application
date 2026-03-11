# 🎓 Students Frontend — React + Vite

Professional student records management UI. Connects to the NestJS backend for full CRUD.

## Stack
- **React 18** — UI
- **Vite 4** — build tool + dev server
- **Axios** — HTTP client
- **CSS-in-JS** — zero external UI libraries

## Project Structure

```
students-frontend/
├── src/
│   ├── App.jsx                   # Root component, table + modal orchestration
│   ├── main.jsx                  # React entry point
│   ├── components/
│   │   ├── Modal.jsx             # Accessible modal wrapper
│   │   ├── StudentForm.jsx       # Add/Edit form with validation
│   │   ├── DeleteConfirm.jsx     # Deletion confirmation dialog
│   │   └── Toast.jsx             # Toast notifications
│   ├── hooks/
│   │   ├── useStudents.js        # CRUD state + API calls
│   │   └── useToast.js           # Toast queue management
│   ├── services/
│   │   └── api.js                # Axios instance + students endpoints
│   ├── styles/
│   │   └── css.js                # Shared CSS-in-JS design tokens
│   └── utils/
│       ├── validate.js           # Form validation rules
│       └── exportCsv.js          # CSV download utility
├── index.html
├── vite.config.js                # Proxy /api → localhost:4000 in dev
├── .env.example
└── package.json
```

## Quick Start

```bash
npm install

# Copy env and set backend URL
cp .env.example .env.local

# Start dev server (proxies /api to http://localhost:4000)
npm run dev
# → http://localhost:3000
```

## Environment Variables

| Variable        | Description                          | Default                    |
|-----------------|--------------------------------------|----------------------------|
| `VITE_API_URL`  | Backend base URL (production only)   | `/api` (proxied via Vite)  |

## Build & Deploy (Vercel)

```bash
npm run build           # outputs to /dist

# Vercel
vercel                  # follow prompts, framework = Vite
# Set env var VITE_API_URL = https://your-backend.railway.app/api
```

## Features

| Feature               | Details                                              |
|-----------------------|------------------------------------------------------|
| Student table         | Name (avatar), Email, Age, Edit/Delete actions       |
| Add Student           | Modal with required-field + email-format validation  |
| Edit Student          | Pre-filled modal, same validations                   |
| Delete Student        | Confirmation dialog                                  |
| Search                | Real-time filter across all fields                   |
| Sortable columns      | Click header to toggle asc/desc                      |
| Pagination            | 8 per page                                           |
| Loading skeletons     | Shimmer animation while fetching                     |
| CSV Export            | Downloads filtered or full data                      |
| Toast notifications   | Success/error feedback on every operation            |
