# Auth service

Auth service is responsible for client authentication and authorization.

#### It has the following modules:

- auth: responsible for session interactions like generating and validating token pairs
- session: responsible for session CRuD operations

#### Service uses refresh/access tokens.

- Refresh token is a random hex string.
- Access token is JWT which stores client ID.
