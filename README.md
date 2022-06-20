
## Description

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## APIs
1. Authentication Service: /auth 
   Authenticate User - (email, password) => accessToken, refreshToken;
   /login - POST

   Refresh (refreshToken) => accessToken;
   /refresh - POST

   Logout (refreshToken) => void;
   /logout - DELETE

2. User Service: /user
   Get user (accessToken) => userPayload 
   / - GET

3. Products Service /products
   Get products () => Product[]
   /?pid - GET
   # If pid exists get that product else get all products

   Usert Products (Product[]) => Product[]
   / - PUT

   Delete Products (Product[]) => void
   / - DELETE

   Restore Product (Product) => Product
   /restore - PUT

## Microservices

1. Auth
2. User
3. Products
4. Streaming - data handler service (using file services)
5. API


## Tests
Run these commands from the root directory:
1. User Controller -- jest src/user/user.controller.spec.ts -- notify --config=config.json
2. 