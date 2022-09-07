# Money-tracker &middot; ![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg) ![Wakatime](https://wakatime.com/badge/user/bc8fa60c-fa34-4507-b70f-24bdba32a74d/project/0a2a0e7e-41e3-47f2-a304-fafc58b08ef7.svg)

Money-tracker is app which is developed to be your helper in organization and analyze your life budget.

**Important note!** This project is currently an MVP, so it has many aspects to be improved, but it might not happen because of lack of budget.

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

![architecture](http://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/async-devil/money-tracker/master/docs/architecture.puml)

# Environment variables:

Default environment file is stored as `.env.example`. To use this project you need to create a `.env` file.

# General information:

All existing docs are stored into the `/docs` folder using PlantUML syntax.

## Backend features:

- Access and refresh tokes authentication
- Ability to freely customize appearance of accounts and categories
- Support of multiple account types, such as debt and savings
- Support of archived, obligatory and sub-category settings
- Support of cryptocurrency transactions
- Ability to set custom currency code up to 4 symbols
- Non-fixed transaction's amount conversion
- Transaction location and notes specification

## Frontend features:

From all of the variety of features which backend provides, frontend supports only:

- Access and refresh tokes authentication
- Ability to freely customize appearance of accounts and categories
- Support of multiple account types, such as debt and savings (partially: there isn't any specific logic assigned to those types)
- Transaction location and notes specification

**Currently, the only available currency is USD**

Specific frontend features are:

- Authentication token auto-refresh
- Expense and income doughnut graph
- Modern and adaptive design

## Photos

<p align="left">
  <img width="100" height="200" src="/media/dashboard-expense.png"/>
  <img width="100" height="200" src="/media/dashboard-income.png"/>
  <img width="100" height="200" src="/media/accounts-create.png"/>
  <img width="100" height="200" src="/media/accounts.png"/>
  <img width="100" height="200" src="/media/transactions-create.png"/>
  <img width="100" height="200" src="/media/transactions.png"/>
</p>

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
