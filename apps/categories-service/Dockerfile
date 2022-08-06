FROM node:18.7.0-alpine

WORKDIR /usr/src/app

COPY package.json ./
RUN yarn install

COPY . .

RUN chmod +x ./scripts/start.sh
CMD ["/bin/sh", "./scripts/start.sh"]