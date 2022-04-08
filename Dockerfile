FROM node:16.14.2-alpine

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install

COPY . .

ARG PORT=3333

ENV PORT=$PORT
EXPOSE $PORT


