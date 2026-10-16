# Charms Tech Labs

Next.js application using Turso/libSQL, a hosted SQLite-compatible database.

## Local development

1. Create a Turso database and generate an authentication token.
2. Copy `.env.example` to `.env.local` and set `TURSO_DATABASE_URL`, `TURSO_AUTH_TOKEN`, and `NEXTAUTH_SECRET`.
3. Install dependencies and start the app:

   ```bash
   npm install
   npm run dev
   ```

The application creates its tables automatically on its first database request. The Next.js build does not connect to the database.

## Deploying to Vercel

Add `TURSO_DATABASE_URL`, `TURSO_AUTH_TOKEN`, `NEXTAUTH_URL`, and `NEXTAUTH_SECRET` to the Vercel project's environment variables. Vercel runs `npm run build`; no Prisma generation, schema push, or database connection is needed during the build.

Before deploying, import the repository's existing SQLite data into the Turso database once:

```bash
npm run db:migrate-local
```

Run this command from a machine with Python 3 installed and the Turso variables configured in `.env.local`. The migration is safe to rerun: existing records are left unchanged. Keep database tokens and authentication secrets out of source control.
