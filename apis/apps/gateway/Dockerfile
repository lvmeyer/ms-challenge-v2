FROM node:19-alpine

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
COPY tsconfig.json tsconfig.json
COPY nest-cli.json nest-cli.json
COPY apps/gateway ./apps/gateway
COPY libs ./libs

RUN npm install
RUN npm run build gateway

CMD ["node", "dist/apps/gateway/main"]