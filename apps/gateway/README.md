# Gateway service

Gateway service is responsible to proxy requests to the specified microservices and modifying their functionality to user needs.

#### It has the following modules:

- auth-service: responsible for client authentication and authorization

  ##### Use:

  - clients-service

- clients-service: responsible for clients interactions

  ##### Use:

  - auth-service

- accounts-service: responsible for accounts interactions

  ##### Use:

  - auth-service

- transaction-service: responsible for transactions interactions

  ##### Use:

  - auth-service
