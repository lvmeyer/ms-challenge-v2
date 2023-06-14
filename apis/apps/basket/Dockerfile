FROM node:19-alpine

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
COPY tsconfig.json tsconfig.json
COPY nest-cli.json nest-cli.json
COPY apps/basket ./apps/basket
COPY libs ./libs

RUN npm install
RUN npm run build basket

CMD ["node", "dist/apps/basket/main"]