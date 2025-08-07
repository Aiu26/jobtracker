# Job Tracker Frontend

A Next.js frontend application for managing job postings with a modern UI built using Mantine components.

## Prerequisites

-   Node.js (v16 or higher)
-   npm or yarn
-   Backend API running (see backend README for setup)

## Setup

1. **Install dependencies:**

```bash
npm install
```

2. **Set up environment variables:**

    Create a `.env.local` file in the frontend directory with the following variables:

    ```env
    # Backend API URL
    BACKEND_URL=http://localhost:3001
    ```

3. **Start the development server:**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Available Scripts

-   `npm run dev` - Start development server with hot reload
-   `npm run build` - Build the application for production
-   `npm run start` - Start production server
-   `npm run lint` - Run ESLint

## Features

-   **Job Management**: Create, view, and manage job postings
-   **Search & Filter**: Advanced filtering and search capabilities
-   **Modern UI**: Built with Mantine components for a beautiful user experience
-   **Real-time Updates**: Automatic refresh when jobs are added or modified

## Environment Variables

| Variable      | Description     | Default               |
| ------------- | --------------- | --------------------- |
| `BACKEND_URL` | Backend API URL | http://localhost:3001 |

## Project Structure

```
src/
├── app/                 # Next.js app directory
├── components/          # React components
│   ├── CreateJobModal.jsx
│   ├── JobCards.jsx
│   ├── JobSearchFilters.jsx
│   └── Navbar.jsx
├── context/            # React context providers
│   ├── JobFilterContext.js
│   └── JobsContext.js
└── data/              # Static data files
    └── jobsData.js
```

## Technologies Used

-   **Next.js 15** - React framework
-   **Mantine** - UI component library
-   **React Hook Form** - Form handling
-   **Tailwind CSS** - Styling

## Backend Integration

This frontend connects to the Job Tracker Backend API. Make sure the backend is running on the URL specified in your `BACKEND_URL` environment variable before starting the frontend.

For backend setup instructions, see the [backend README](../backend/README.md).
