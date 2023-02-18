FROM node:18-alpine as wtbui

RUN mkdir /app
WORKDIR /app

COPY ./package.json ./package.json
RUN yarn install

COPY . .
RUN yarn run lint && yarn run build
