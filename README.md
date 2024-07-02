# Todo List Application

A simple Todo List application built with Next.js, Prisma, TRPC, and Chakra UI.

## Features

- Add, view, update, and delete tasks
- Filter tasks by completion status
- Sort tasks by due date
- Responsive design

## Prerequisites

- Node.js (v14.x or later)
- npm (v6.x or later) or yarn (v1.x or later)
- PostgreSQL (or any other database supported by Prisma)

## Installation

Follow these steps to set up and run the project locally.

### 1. Clone the repository

```sh
git clone https://github.com/your-username/todo-list-app.git
cd todo-list-app
```

### 2. Install dependencies

```sh
npm install
```

### 3. Set up the database

```sh
DATABASE_URL="postgresql://user:password@localhost:5432/mydatabase"
```

### 4. Generate Prisma Client

```sh
npm run postinstall
```

### 5. Migrate the database

```sh
npm run db:generate
```

### 6. Start the development server

```sh
npm run dev
```

## Tech Stack

- Next.js: React framework for server-side rendering and static site generation
- Prisma: Next-generation ORM for database access
- TRPC: End-to-end typesafe APIs
- Chakra UI: Component library for building accessible React applications
- TypeScript: Static type-checking

## Learn More

To learn more about the [T3 Stack](https://create.t3.gg/), take a look at the following resources:

- [Documentation](https://create.t3.gg/)
- [Learn the T3 Stack](https://create.t3.gg/en/faq#what-learning-resources-are-currently-available) — Check out these awesome tutorials

You can check out the [create-t3-app GitHub repository](https://github.com/t3-oss/create-t3-app) — your feedback and contributions are welcome!

## How do I deploy this?

I'm deploying this projects on vercel. Here is the documentation [Vercel](https://create.t3.gg/en/deployment/vercel)
