# NestJS-React-MongoDB template [![wakatime](https://wakatime.com/badge/user/bc8fa60c-fa34-4507-b70f-24bdba32a74d/project/cb758364-5c0d-4ba7-9fd1-816058d6c2d7.svg)](https://wakatime.com/badge/user/bc8fa60c-fa34-4507-b70f-24bdba32a74d/project/cb758364-5c0d-4ba7-9fd1-816058d6c2d7) <hr/>

This template is based on the [Create React App](https://github.com/facebook/create-react-app) and the [NestJS](https://nestjs.com/) project builder.

# Technologies:

- Server:

  - NestJS
  - Mongoose
  - Swagger

- Client:

  - React
  - Styled components
  - SCSS
  - Axios

- General:

  - Typescript
  - Prettier
  - Eslint
  - Jest

# Commands

- `yarn start` create and start production build
- `yarn build` create production build without starting
- `yarn start:dev` start developing session
- `yarn test` test client and server

Full list of commands you can find at package.json

# Environment variables:

Template supports developing and production env files. Will be using `.env.development` file for developing scripts and `.env.production` for build purposes.

List of available variables, default values and their names:

- db host: `mongodb://localhost`; MONGO_HOST
- db port: `27017`; MONGO_PORT
- db name: `test`; MONGO_DB
- server port: `5000`; SERVER_PORT
- client port: `3000`; PORT

And all the CRA environment variables, see: https://create-react-app.dev/docs/advanced-configuration/

# General information:

The server will serve client at all paths except /api which is a global prefix. In development mode, client will make a proxy to server at /api.
Client build stored in /build folder. Server build stored in /dist folder.
