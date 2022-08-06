FROM node:18.7.0-alpine

WORKDIR /usr/src/app

COPY package.json ./
RUN yarn install

EXPOSE 8000

COPY . .

CMD ["yarn", "start"]