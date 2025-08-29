# Create T3 App with C# Backend Integration

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app` and integrated with a C# ASP.NET Core backend.

## C# Backend Integration

This frontend connects to a C# ASP.NET Core backend API. The backend provides OpenAPI/Swagger documentation that we use to generate TypeScript types automatically.

### API Type Generation

We use `openapi-typescript` to generate TypeScript types from the C# backend's OpenAPI specification. This ensures type safety between the frontend and backend.

#### Prerequisites
1. The C# backend must be running at `http://localhost:5194` (or configure `BACKEND_API_URL` environment variable)
2. The backend's Swagger endpoint must be accessible at `/swagger/v1/swagger.json`

#### Available Scripts

```bash
# Generate types once (backend must be running)
npm run generate-types

# Watch for changes and regenerate types automatically
npm run generate-types:watch

# Generate types and then start the dev server
npm run dev:with-types
```

#### When to Regenerate Types

You should regenerate the TypeScript types whenever:
- You modify any C# controllers or models in the backend
- You add new API endpoints
- You change the structure of API responses
- You update API documentation/attributes in C#

The generated types are saved to `src/api-types.ts` and should be committed to version control.

### Getting Started

1. **Start the C# Backend:**
   ```bash
   cd ../backend/T3Sharp
   dotnet run
   ```
   The backend will start at `http://localhost:5194` with Swagger UI available at `http://localhost:5194/swagger`

2. **Install Frontend Dependencies:**
   ```bash
   npm install
   ```

3. **Generate API Types and Start Development:**
   ```bash
   npm run dev:with-types
   ```
   Or run them separately:
   ```bash
   npm run generate-types
   npm run dev
   ```

4. **Access the Application:**
   Open [http://localhost:3000](http://localhost:3000) in your browser

## What's next? How do I make an app with this?

We try to keep this project as simple as possible, so you can start with just the scaffolding we set up for you, and add additional things later when they become necessary.

If you are not familiar with the different technologies used in this project, please refer to the respective docs. If you still are in the wind, please join our [Discord](https://t3.gg/discord) and ask for help.

- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [Drizzle](https://orm.drizzle.team)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)

## Learn More

To learn more about the [T3 Stack](https://create.t3.gg/), take a look at the following resources:

- [Documentation](https://create.t3.gg/)
- [Learn the T3 Stack](https://create.t3.gg/en/faq#what-learning-resources-are-currently-available) — Check out these awesome tutorials

You can check out the [create-t3-app GitHub repository](https://github.com/t3-oss/create-t3-app) — your feedback and contributions are welcome!

## How do I deploy this?

Follow our deployment guides for [Vercel](https://create.t3.gg/en/deployment/vercel), [Netlify](https://create.t3.gg/en/deployment/netlify) and [Docker](https://create.t3.gg/en/deployment/docker) for more information.
