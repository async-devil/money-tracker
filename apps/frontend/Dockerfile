FROM node as build

WORKDIR /usr/src/app

COPY package.json ./
RUN yarn install

COPY . .

RUN yarn build

FROM nginx

COPY --from=build /usr/src/app/dist /usr/share/nginx/html
COPY nginx.conf  /etc/nginx/conf.d/default.conf

EXPOSE 80