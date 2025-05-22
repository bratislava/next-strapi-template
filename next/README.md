# Next

## First-time setup

Before you start, install dependencies with

```
yarn
```

Create `.env.local` file based on `.env.example`. The `.env.local` file is used for local dev and should be .gitignored.

```
cp .env.example .env.local
```

Next needs to be run against a Strapi (CMS) instance. For local setup, see the `strapi` directory.

You can also run the project against staging or production Strapi (useful when developing and debugging) - provided that you're not working on Strapi model changes.

## Run project locally

Start your Next application in development mode. [Learn more](https://nextjs.org/docs/app/api-reference/cli/next)

```
yarn dev
```

## Generate GraphQL

When you change something in Strapi Content type builder, and/or if you change GraphQL queries, you always need to generate new types using Strapi SKD. To update queries, modify files in `services/graphql` directory.

> Note: Strapi V4 does not export schema.graphql by default - instead, you'll need a running server to generate types from graphql endpoint. The Strapi url is set up directly in `codegen` file.

To generate new types run:

```bash
yarn gen
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
