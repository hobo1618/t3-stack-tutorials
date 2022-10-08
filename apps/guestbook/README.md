# Guestbook Tutorial
- [Build a full stack app with create-t3-app](https://www.nexxel.dev/blog/ct3a-guestbook)


## Issues encountered
### Prisma auto-complete / typescript not updating on schema change
Prisma schema autocomplete / types didn't update after updating the schema. I tried running `prisma generate`, which should be run after every modification to the schema according to the docs. This didn't work, however, so I followed this advice instead from [stackoverflow](https://stackoverflow.com/questions/72043619/prisma-generated-types-not-updating), which suggested running `pnpm install` to delete the current prisma client and reinstall (the docs also mention that the prisma package in `node_modules` is reinstalled with every run of `prisma generate`, unlike ordinary packages), then restarting VS code. It worked! So either a typescript issue or a prisma issue? Hmm.

## Notes
### NextAuth
1. `pages/api/auth/[...nextauth].ts`
   1. the authOptions object is defined and exported, first passing through the `NextAuth()` function.
   2. What does `NextAuth()` do? It initializes NextAuth. Ok, but what does it _do_? [fuggettaboutit](https://next-auth.js.org/configuration/initialization) say the docs.
2. `server/common/get-server-auth-session.ts`
   1. `getServerAuthSession()` is exported, an async function which takes a `ctx: {res, req}` as params, as well as the `authOptions` from `nextAuth(options)`
   2. and returns a `session` object.
3. `server/router/context.ts`
   1. `createContext()` consumes `getServerAuthSession`'s output and... 
   2. returns `{session, prisma}` by way of `createInnerContext()`, 
4. `pages/api/trpc/[trpc].ts`
   1. exports `createNextApiHandler()` with `router`, `createContext`, `onError` as params.
   2. this function returns?...
   3. It fires and whatever it returns is exported, but it doesn't appear to be consumed anywhere... It simply returns into the ether.
### Prisma
1. `prisma/schema.prisma`:
  - includes DB schema (`models`). After every change to the schema, run `prisma generate` to update the prisma node_module and sync with the database. Failing to do this will result in type errors and data mismatches
  - db settings (`datasource`):
    - `url` to database provider via the env variable `DATABASE_URL`
    - includes `provider` which specifies the type of database ("postgresql")
  - Auth models (how do these link to NextAuth?)
    - `Session`:
    - `User`:
    - `VerificationToken`:

## To Do
- the guestbook is currently using optimistic updates when the user adds a message. However, there is a significant lag between submitting the form and the rerendering. It seems as though the state change is still waiting for the server to respond before updating, but I'm not sure.
