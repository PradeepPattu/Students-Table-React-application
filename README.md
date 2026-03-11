# Students-Table-React-application
# 🎓 Student Records Management

A professional, full-featured Student Records Table built with **React.js + Vite**.

## ✨ Features

- **Student List** — Name, Email, Age columns with avatar initials
- **Add Student** — Modal form with full validation (required fields + email format)
- **Edit Student** — Pre-filled modal with same validations
- **Delete Student** — Confirmation dialog before deletion
- **Search / Filter** — Real-time search across name, email, and age
- **Sortable Columns** — Click any column header to sort asc/desc
- **Pagination** — 7 students per page
- **Simulated Loading State** — Skeleton loader on initial load
- **CSV Export** — Downloads current filtered/full data as `.csv`
- **Toast Notifications** — Feedback on every action
- **Fully in-memory** — No backend required, all CRUD in React state

## 🚀 Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Open http://localhost:5173
```

## 📦 Build for Production

```bash
npm run build
# Output goes to /dist folder
```

## 🌐 Deploy to Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from project root
vercel

# Follow prompts — select framework: Vite
# Your live URL will be shown after deploy
```

## 🌐 Deploy to Netlify

1. Run `npm run build`
2. Drag and drop the `dist/` folder at [netlify.com/drop](https://app.netlify.com/drop)
3. Done — live URL generated instantly!

## 📁 Project Structure

```
students-app/
├── src/
│   ├── main.jsx           # React entry point
│   └── StudentsTable.jsx  # Main component (all logic + UI)
├── index.html
├── vite.config.js
├── package.json
└── README.md
```

## 🧩 Tech Stack

- React 18
- Vite 4
- Pure CSS-in-JS (no external UI libraries)
- Sora + JetBrains Mono (Google Fonts)

## 🔧 Optional Backend (Bonus)

For the NestJS + PostgreSQL bonus backend:

```bash
# Create NestJS project
npm i -g @nestjs/cli
nest new students-backend

# Add TypeORM + PostgreSQL
npm install @nestjs/typeorm typeorm pg

# Implement CRUD endpoints:
# GET    /students
# POST   /students
# PATCH  /students/:id
# DELETE /students/:id
```

See NestJS docs: https://docs.nestjs.com/techniques/database
