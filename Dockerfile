FROM node:18.14.2-slim

WORKDIR /home/messenger

COPY ./app.ts ./server.ts ./Docker/package.json ./

ADD dist ./dist

RUN npm install

EXPOSE 3000

CMD npx ts-node server.ts
