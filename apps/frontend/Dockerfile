FROM node:18.7.0-alpine as build

WORKDIR /usr/src/app

COPY package.json ./
RUN yarn install

COPY . .

RUN yarn build

FROM nginx:1.23.1-alpine

COPY --from=build /usr/src/app/dist /usr/share/nginx/html
COPY nginx.conf  /etc/nginx/conf.d/default.conf

EXPOSE 80