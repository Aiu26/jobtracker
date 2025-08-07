# Job Tracker Backend API

A NestJS backend for job posting management with PostgreSQL database.

## Prerequisites

- Node.js (v16 or higher)
- PostgreSQL database
- npm or yarn

## Setup

1. **Install dependencies:**

```bash
npm install
```

2. **Set up environment variables:**

   Create a `.env` file in the backend directory with the following variables (replace the values with actual DB credentials):

   ```env
   # Database Configuration
   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=your_postgres_username
   DB_PASS=your_postgres_password
   DB_NAME=jobpost

   # Server Configuration
   PORT=3001
   ```

3. **Database Setup:**
   - Make sure PostgreSQL is running
   - Create a database named `jobpost` (or update DB_NAME in your .env file)
   - The application will automatically create the required tables on first run

4. **Start the development server:**

```bash
npm run start:dev
```

The API will be available at `http://localhost:3001`

## Available Scripts

- `npm run start:dev` - Start development server with hot reload
- `npm run build` - Build the application
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run test` - Run tests

## API Endpoints

### Jobs

- `POST /jobs` - Create a new job posting (published)
- `POST /jobs/draft` - Save a job posting as draft
- `GET /jobs` - Get all job postings
- `GET /jobs/:id` - Get a specific job posting
- `PATCH /jobs/:id` - Update a job posting
- `PATCH /jobs/:id/publish` - Publish a draft job posting
- `DELETE /jobs/:id` - Delete a job posting

## Database Schema

The `jobs` table includes:

- `id` (UUID, Primary Key)
- `jobTitle` (VARCHAR)
- `location` (VARCHAR)
- `minSalary` (DECIMAL)
- `maxSalary` (DECIMAL)
- `companyName` (VARCHAR)
- `jobType` (ENUM: full-time, part-time, contract, internship, freelance)
- `applicationDeadline` (DATE)
- `jobDescription` (TEXT)
- `isPublished` (BOOLEAN)
- `createdAt` (TIMESTAMP)
- `updatedAt` (TIMESTAMP)

## Environment Variables

| Variable  | Description         | Default   |
| --------- | ------------------- | --------- |
| `DB_HOST` | PostgreSQL host     | localhost |
| `DB_PORT` | PostgreSQL port     | 5432      |
| `DB_USER` | PostgreSQL username | -         |
| `DB_PASS` | PostgreSQL password | -         |
| `DB_NAME` | Database name       | jobpost   |
| `PORT`    | Server port         | 3001      |

## CORS Configuration

The API is configured to accept requests from `http://localhost:3000` (frontend).
