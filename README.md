# Digital Business Card

A backend application for a digital business card, built with NestJS, TypeScript, Prisma, PostgreSQL, and GraphQL.

The application provides two APIs for retrieving a profile by its unique slug:
- **REST API** — returns a profile as JSON.
- **GraphQL API** — allows clients to request specific profile fields.

## Tech Stack

- Node.js
- TypeScript
- NestJS
- PostgreSQL
- Prisma ORM
- GraphQL
- Apollo Server
- Docker Compose

## Features

- Retrieve a profile by slug using REST or GraphQL.
- Fetch profile skills, work experience, and projects.
- Validate profile slugs in GraphQL requests.
- Store profile data in PostgreSQL.
- Manage database schema changes with Prisma migrations.
- Populate the database with initial data using a seed script.

## Prerequisites

Make sure the following tools are installed:

- Node.js and npm
- Docker Desktop with Docker Compose
- Git

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd digital-business-card
```

Replace `<repository-url>` with the URL of this repository.

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root.

Use the following variables as a template, adjusting the values if necessary:

```dotenv
POSTGRES_USER=postgres
POSTGRES_PASSWORD=change_me
POSTGRES_DB=business_card
POSTGRES_PORT=5432

DATABASE_URL="postgresql://postgres:change_me@localhost:5432/business_card?schema=public"
```

The PostgreSQL credentials and database name in `DATABASE_URL` must match the corresponding Docker Compose settings.

Do not commit `.env` or real credentials to version control.

### 4. Start PostgreSQL

```bash
docker compose up -d
```

Check the container status:

```bash
docker compose ps
```

### 5. Generate the Prisma Client

```bash
npx prisma generate
```

### 6. Apply database migrations

```bash
npm run db:migrate
```

This command applies existing Prisma migrations to the database.

### 7. Seed the database

```bash
npm run db:seed
```

The seed script creates an initial profile with the slug `svyatoslav`, including sample skills, work experience, and a project.

The script uses `upsert` to avoid creating the same profile again when the seed command is rerun.

### 8. Start the application

For development:

```bash
npm run start:dev
```

The application runs at `http://localhost:3000` by default.

## API

### REST API

Retrieve a profile by slug:

```http
GET /profile/:slug
```

Example:

```http
GET http://localhost:3000/profile/svyatoslav
```

The response contains the profile information, including skills, experience, and projects.

### GraphQL API

GraphQL endpoint:

```text
http://localhost:3000/graphql
```

Example query:

```graphql
query {
  getProfile(slug: "svyatoslav") {
    name
    description
    skills {
      name
      level
    }
    experience {
      company
      position
      startDate
      endDate
    }
    projects {
      title
      description
    }
  }
}
```

You can execute GraphQL queries using Apollo Sandbox or another GraphQL client.

## Available Scripts

| Command | Description |
|---|---|
| `npm run start:dev` | Start the application in watch mode |
| `npm run build` | Compile the application |
| `npm run start:prod` | Start the compiled application |
| `npm run db:migrate` | Apply existing Prisma migrations |
| `npm run db:seed` | Populate the database with initial data |
| `npm test -- --runInBand` | Run unit tests |
| `npm run test:cov -- --runInBand` | Run tests with coverage |

## Project Structure

```text
digital-business-card/
├── prisma/
│   ├── migrations/
│   ├── schema.prisma
│   └── seed.ts
├── src/
│   ├── common/
│   │   └── pipes/
│   ├── prisma/
│   ├── profile/
│   │   ├── models/
│   │   ├── profile.module.ts
│   │   ├── profile.resolver.ts
│   │   └── profile.service.ts
│   ├── app.controller.ts
│   ├── app.module.ts
│   └── main.ts
├── docker-compose.yml
├── package.json
└── README.md
```

## Stopping the Application

Stop the NestJS process with `Ctrl+C`.

Stop the PostgreSQL container:

```bash
docker compose down
```

The named Docker volume preserves database data when the container is stopped and removed. To delete the database volume and its data, use `docker compose down -v` instead.
