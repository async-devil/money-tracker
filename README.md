# Money-tracker &middot; ![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg) ![Wakatime](https://wakatime.com/badge/user/bc8fa60c-fa34-4507-b70f-24bdba32a74d/project/0a2a0e7e-41e3-47f2-a304-fafc58b08ef7.svg)

Money-tracker is app which is developed to be your helper in organization and analyze your life budget

# Architecture

This project is based on the microservice architecture.

It includes the following microservices.

- Angular based frontend deployed using Nginx
- REST API gateway
- Authentication service
- Clients service
- Accounts service
- Categories service
- Transactions service

Additional services are:

- pgAdmin
- RMQ-management

Backend message broker is RabbitMQ. Each structural microservice is capable of using its own PostgreSQL database if needed.

All of these services are containerized into separate docker containers which are linked using docker-compose.

To authenticate project uses access/refresh tokens.

# Environment variables:

Default environment file is stored as `.env.example`. To use this project you need to create a `.env` file.

# General information:

All existing docs are stored into the `/docs` folder.

## Technologies used:

- Backend

  - Typescript
  - Node.js
  - PostgreSQL
  - RabbitMQ
    - Nest.js using Express
    - TypeORM
    - Swagger

- Frontend
  - Typescript
  - Angular
  - Nginx
    - Material UI
