FROM node:18-alpine

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
COPY tsconfig.json tsconfig.json
COPY nest-cli.json nest-cli.json
COPY apps/products ./apps/products
COPY libs ./libs

RUN npm install
RUN npm run build products

CMD ["node", "dist/apps/products/main"]