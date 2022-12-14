# t3-stack examples

## The Stack

This turborepo uses [pnpm](https://pnpm.io) as a package manager. It contains examples of "apps" built with some or all of the libraries found in the t3-stack:
- [trpc](https://trpc.io/): "tRPC allows you to easily build & consume fully typesafe APIs, without schemas or code generation."
- [prisma](https://www.prisma.io/): "Prisma is an open source next-generation ORM."
- [NextAuth](https://next-auth.js.org/): "NextAuth.js is a complete open-source authentication solution for Next.js applications."
- React
- NextJS
- Tailwind

The stack doesn't prescribe a specific database solution, though it does come with sqlite out of the box. The examples in this monorepo use different database hosting platforms:
- [Railway](https://railway.app/): "Railway is a deployment platform where you can provision infrastructure, develop with that infrastructure locally, and then deploy to the cloud."

## "Apps"

- `prisma-railway`: a basic example of how to connect prisma to a postgresql database hosted on [railway.io](railway.io) . I created the 'app' by following [this tutorial](https://dev.to/nextdev/how-to-connect-railway-app-with-nextjs-using-prisma-1eo8)
- `guestbook`: a full stack guestbook into which authenticated users can post messages. Users are only able to authenticate through discord. Non authenticated users are only allowed to read messages. To recreate the app, follow this tutorial: [Build a full stack app with create-t3-app](https://www.nexxel.dev/blog/ct3a-guestbook)

## Other stuff unrelated to t3

- `ui`: a stub React component library shared by both `web` and `docs` applications
- `eslint-config-custom`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `tsconfig`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

## Using this turborepo

### Utilities

This turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Build

To build all apps and packages, run the following command:

```
cd my-turborepo
pnpm run build
```

### Develop

To develop all apps and packages, run the following command:

```
cd my-turborepo
pnpm run dev
```

### Remote Caching

Turborepo can use a technique known as [Remote Caching](https://turborepo.org/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup), then enter the following commands:

```
cd my-turborepo
pnpm dlx turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your turborepo:

```
pnpm dlx turbo link
```

### Useful Links

Learn more about the power of Turborepo:

- [Pipelines](https://turborepo.org/docs/core-concepts/pipelines)
- [Caching](https://turborepo.org/docs/core-concepts/caching)
- [Remote Caching](https://turborepo.org/docs/core-concepts/remote-caching)
- [Scoped Tasks](https://turborepo.org/docs/core-concepts/scopes)
- [Configuration Options](https://turborepo.org/docs/reference/configuration)
- [CLI Usage](https://turborepo.org/docs/reference/command-line-reference)
