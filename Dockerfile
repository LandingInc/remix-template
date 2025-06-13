##############################
## Base Image               ##
##############################
FROM node:22-alpine AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN apk update
RUN corepack enable

##############################
## Dev Dependencies         ##
##############################
FROM base AS development-dependencies-env

COPY . /app

WORKDIR /app

RUN pnpm install --frozen-lockfile

##############################
## Production Dependencies  ##
##############################
FROM base AS production-dependencies-env

COPY ./package.json pnpm-lock.yaml /app/

WORKDIR /app

RUN pnpm install --frozen-lockfile --prod

##############################
## Build Stage              ##
##############################
FROM base AS build-env

COPY . /app/
COPY --from=development-dependencies-env /app/node_modules /app/node_modules

WORKDIR /app

RUN pnpm build

##############################
## Runtime Stage            ##
##############################
FROM base

COPY ./package.json pnpm-lock.yaml server.js /app/
COPY --from=production-dependencies-env /app/node_modules /app/node_modules
COPY --from=build-env /app/build /app/build

WORKDIR /app

EXPOSE 3000
CMD ["pnpm", "start"]
