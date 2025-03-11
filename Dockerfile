# Stage 0: ENV variables
#######################################
FROM node:22-slim AS env

ENV NODE_ENV=production

# Stage 1: load node dependencies
#######################################
FROM env AS deps

WORKDIR /app

# Copying env separately for caching
COPY package.json yarn.lock* .yarnrc.yml ./
COPY .yarn/releases ./.yarn/releases

RUN yarn install

# Stage 2: build the app
#######################################
FROM env AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build the app
RUN yarn build

EXPOSE 3000
ENV PORT=3000
CMD ["yarn", "start"]
