FROM node

WORKDIR /usr/src/app

COPY package.json ./
RUN yarn install

EXPOSE 8000

COPY . .

CMD ["yarn", "start"]