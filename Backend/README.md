# 🛠 Students Backend — NestJS + PostgreSQL

REST API for student records. Connects to a PostgreSQL database via TypeORM.

## Stack
- **NestJS 10** — framework
- **TypeORM** — ORM
- **PostgreSQL** — database
- **class-validator** — DTO validation

## Project Structure

```
students-backend/
├── src/
│   ├── main.ts                          # Bootstrap: CORS, pipes, prefix, listen
│   ├── app.module.ts                    # Root module: TypeORM + Config wiring
│   └── students/
│       ├── students.module.ts           # Feature module
│       ├── students.controller.ts       # REST endpoints
│       ├── students.service.ts          # Business logic
│       ├── student.entity.ts            # TypeORM entity → "students" table
│       └── dto/
│           ├── create-student.dto.ts    # Validation rules for POST
│           └── update-student.dto.ts    # Partial DTO for PATCH
├── .env.example
├── nest-cli.json
├── tsconfig.json
└── package.json
```

## API Endpoints

| Method | Route               | Description              |
|--------|---------------------|--------------------------|
| GET    | /api/students       | List all students         |
| GET    | /api/students/:id   | Get one student           |
| POST   | /api/students       | Create a student          |
| PATCH  | /api/students/:id   | Update a student          |
| DELETE | /api/students/:id   | Delete a student          |

### Example Request Body (POST / PATCH)
```json
{
  "name": "Arjun Sharma",
  "email": "arjun@college.edu",
  "age": 21
}
```

### Example Response
```json
{
  "id": 1,
  "name": "Arjun Sharma",
  "email": "arjun@college.edu",
  "age": 21,
  "createdAt": "2025-01-01T10:00:00.000Z",
  "updatedAt": "2025-01-01T10:00:00.000Z"
}
```

## Quick Start (Local)

### 1. PostgreSQL Setup
```sql
-- Connect to PostgreSQL and run:
CREATE DATABASE students_db;
```

### 2. Configure environment
```bash
cp .env.example .env
# Edit .env with your DB credentials
```

### 3. Install & run
```bash
npm install
npm run start:dev
# → API running at http://localhost:4000/api
```

TypeORM's `synchronize: true` will auto-create the `students` table on first run.

## Deploy to Railway (Recommended)

1. Push to GitHub
2. Create project at [railway.app](https://railway.app)
3. Add a **PostgreSQL** plugin — Railway auto-sets `DATABASE_URL`
4. Set environment variables:
   ```
   PORT=4000
   DB_HOST=${{Postgres.PGHOST}}
   DB_PORT=${{Postgres.PGPORT}}
   DB_USER=${{Postgres.PGUSER}}
   DB_PASS=${{Postgres.PGPASSWORD}}
   DB_NAME=${{Postgres.PGDATABASE}}
   CORS_ORIGIN=https://your-frontend.vercel.app
   NODE_ENV=production
   ```
5. Deploy — Railway builds via `npm run build` and starts with `npm run start`

## Deploy to Render

1. New Web Service → connect GitHub repo
2. Build command: `npm install && npm run build`
3. Start command: `npm run start`
4. Add a **PostgreSQL** database and set env vars as above

## Validation Rules

| Field | Rules                                           |
|-------|-------------------------------------------------|
| name  | Required, string, 2–120 chars                   |
| email | Required, valid email format, unique, max 200   |
| age   | Required, integer, 10–100                       |
