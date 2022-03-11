FROM node

WORKDIR /usr/src/app

COPY package.json ./
RUN yarn install

COPY . .

RUN chmod +x ./scripts/start.sh
CMD ["./scripts/start.sh"]