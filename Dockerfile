FROM node:20-alpine

WORKDIR /user/app

COPY package*.json ./

COPY pnpm-lock.yaml ./

RUN apk add --no-cache make gcc g++ python3

RUN npm install -g pnpm

RUN pnpm install

COPY . .

RUN pnpm run db:generate

EXPOSE 3000

CMD ["pnpm","run","docker-dev"]