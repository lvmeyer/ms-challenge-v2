FROM node:18-alpine

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
COPY tsconfig.json tsconfig.json
COPY nest-cli.json nest-cli.json
COPY apps/payment ./apps/payment
COPY libs ./libs

RUN npm install
RUN npm run build payment

CMD ["node", "dist/apps/payment/main"]