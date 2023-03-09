FROM node:18.14.2-slim

WORKDIR /home/messenger

COPY . .

RUN npm install

RUN npm run build

EXPOSE 3000

CMD npx ts-node server.ts
