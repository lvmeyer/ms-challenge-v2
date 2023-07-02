FROM node:19-alpine

WORKDIR /app/vite-front

COPY package.json .

RUN npm install

COPY . .

EXPOSE 80

CMD ["npm", "run", "dev"]