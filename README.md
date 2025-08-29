
# t3sharp

## Get my C# types into a Typescript Frontend 

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app` and integrated with a C# ASP.NET Core backend.

## How polished is this

This is a rough draft, PRs welcome

## C# Backend Integration

This frontend connects to a C# ASP.NET Core backend API. The backend provides OpenAPI/Swagger documentation that we use to generate TypeScript types and function signatures automatically.

- `openapi-typescript` to generate TypeScript types from the C# backend's OpenAPI specification to the file `frontend/src/api-types.ts`.
- `openapi-typescript-fetch` to call these, as demonstrated in `api-client.ts`.


## Usage

- The C# backend must be running at `http://localhost:5194` (there is vibe coded support for `BACKEND_API_URL` environment variable which is definitely broken since untested). 

- The backend's Swagger endpoint must be accessible at `/swagger/v1/swagger.json`

```bash
# run nextjs and watch for type changes
npm run dev
```

---

# t3 stack infos 

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

For the frontend: 

> Follow our deployment guides for [Vercel](https://create.t3.gg/en/deployment/vercel), [Netlify](https://create.t3.gg/en/deployment/netlify) and [Docker](https://create.t3.gg/en/deployment/docker) for more information.
