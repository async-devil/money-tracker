This template is based on the [Create React App](https://github.com/facebook/create-react-app) and the [NestJS](https://nestjs.com/) project builder.

# Technologies:

- Server:

  - NestJS
  - TypeORM
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

- db host: `localhost`; TYPEORM_HOST
- db port: `5432`; TYPEORM_PORT
- db username: `postgres`; TYPEORM_USERNAME
- db username password: `toor`; TYPEORM_PASSWORD
- db name: `test`; TYPEORM_DATABASE

- jwt access token password: `SECRET_KEY`; JWT_ACCESS_TOKEN_SECRET
- jwt access token expiration time in seconds: `1800`; JWT_ACCESS_TOKEN_EXPIRATION_TIME
- jwt refresh token password: `SECRET_KEY`; JWT_REFRESH_TOKEN_SECRET
- jwt refresh token expiration time in seconds: `432000`; JWT_REFRESH_TOKEN_EXPIRATION_TIME (432000s = 5d)

- server port: `5000`; SERVER_PORT
- client port: `3000`; PORT

And all the CRA environment variables, see: https://create-react-app.dev/docs/advanced-configuration/

# General information:

The server will serve client at all paths except /api which is a global prefix. In development mode, client will make a proxy to server at /api.
Client build stored in /build folder. Server build stored in /dist folder.
