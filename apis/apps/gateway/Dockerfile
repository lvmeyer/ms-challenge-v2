FROM node:19-alpine As development

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
COPY tsconfig.json tsconfig.json
COPY nest-cli.json nest-cli.json
COPY apps/gateway ./apps/gateway
COPY libs ./libs

RUN npm install
RUN npm run build gateway

FROM node:19-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

COPY package*.json ./

RUN npm install --only=production

COPY . .

COPY --from=development /app/dist ./dist

CMD ["node", "dist/apps/gateway/main"]