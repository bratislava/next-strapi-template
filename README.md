# next-strapi-template

This template repo is archived. Please use some recent project as a starter, e.g. olo.sk or bratislava.sk at this time.

## How to use this template

**Initial setup:** Copy the template repo and change the following:

- update the main title of this README.md
- update `package.json` for both `strapi` and `next` - this will be used by deploy pipeline
  - `"name":` in `strapi/package.json`
  - `"name":` in `next/package.json`
  - `"description": ` in `strapi/package.json`
- generate secrets and change the secrets name in `strapi/kubernetes/base/secrets`
  - `template-strapi-database-secret` in `strapi/kubernetes/base/secrets/database.yml`
  - `template-strapi-internals-secret` in `strapi/kubernetes/base/secrets/strapi.yml`
- update envs in `strapi/kubernetes/base/.env`
  - `DATABASE_HOST=template-strapi-database`
  - `MINIO_BUCKET=template-strapi` (this is used in `strapi/config/env/production/plugins.js`)
- update bratiska-cli env files `.env.bratiska-cli-build.*` - add actual values instead of TODO
- remove this *How to use this template* section

What was added on top of the base next-strapi template:

- `strapi/config/env/production/plugins.ts` - upload provider is set to minio
- custom `strapi::security` middleware is added to `strapi/config/middleware.js`
- custom `app.ts` in `strapi/src/admin` - add SK language to admin panel, disable tutorials and release notifications
- custom schema for User content type added as extention in `strapi/src/extensions/users-permissions/content-types/user/schema.json` to hide Users from admin panel
  - the base is the original shema file from strapi repo, only change is adding `pluginOptions.content-manager.visible: false`
- env `STRAPI_PLUGIN_I18N_INIT_LOCALE_CODE=sk` to set default strapi content locale to SK
  - in `strapi/env.example` and `strapi/kubernetes/base/.env`
  - docs: https://docs.strapi.io/dev-docs/plugins/i18n#configuration-of-the-default-locale
- `codegen.ts` for graphql
  - `yarn add graphql graphql-request graphql-tag`
  - `yarn add -D @graphql-codegen/cli @graphql-codegen/typescript @graphql-codegen/typescript-operations @graphql-codegen/typescript-graphql-request`
  - add script `yarn gen`
- `next/prettierrc.js` - added `prettier-plugin-tailwindcss` according to [Additional setup for Frontend projects
  ](https://bratislava.github.io/eslint-and-prettier#additional-setup-for-frontend-projects) in our docs
- `next/package.json` scripts according to [our docs](https://bratislava.github.io/eslint-and-prettier#installation-and-setup)

## Introduction

This project is led by the [Department of Innovation and Technology of the City of Bratislava](https://inovacie.bratislava.sk). We’re making it entirely open-source as we believe this promotes [savings, collaboration, auditability and innovation](https://publiccode.eu) in the public sector.

Our goal is to be transparent about services we’re developing and providing, as well as to invite other cities and municipalities to build on top of the same or similar open-source technologies we’ve already tested and used - to foster an ecosystem of collaboration between teams facing similar challenges. We’ll be happy to [get in touch](mailto:innovationteam@bratislava.sk).

> If you are an individual or a company who’d like to take part in these efforts, collaborate closely on development or report an issue, we’d love to hear from you! 🙌 Contact us using this repository or at [innovationteam@bratislava.sk](mailto:innovationteam@bratislava.sk)

## What's here

Each sub-project contains README which should get you up and running. More information can be found in [our docs](https://bratislava.github.io).

🏡 `/next` Next.js web app

🗄️ `/strapi` Strapi CMS server

🐳 `/docker-compose.yml` Providing postgres database and meilisearch instance

💅 `.prettierrc` - presently needed for prettier to work well when opening root directory in vscode (PRs to get rid of it & config it better are welcome)

## Local installation

Follow user guide in folders `/strapi` and `/next`.

You need `node` and `yarn` installed locally.

If you want to start a postgres database and meilisearch instance with correct credentials, simply run:

```bash
docker-compose up -d
```

You need `docker`/`podman` installed locally.

### Meilisearch

After initial `docker-compose up` you have to set keys for meilisearch for both the Strapi and Next. To get them, run the command below:

```
curl --request GET \
  --url http://localhost:7700/keys \
  --header 'Authorization: Bearer masterKey' \
  --header 'Content-Type: application/json' | json_pp
```

Then use "Default Admin API Key" for strapi in `strapi/.env.local` as `MEILISEARCH_ADMIN_API_KEY` and "Default Search API Key" in `next/.env.local` file as `NEXT_PUBLIC_MEILISEARCH_SEARCH_API_KEY`.

## Stay in touch

[https://inovacie.bratislava.sk/](https://inovacie.bratislava.sk/)
