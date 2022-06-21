## Description

Grociery Store API built with NestJs

## Installation

```bash
$ yarn
```

## Running the app

```bash
# development
$ yarn start

```

## Test

Make sure to have Nest and Jest CLIs globally installed:

```bash
$ yarn global add jest
```

```bash
# unit tests
$ yarn test
```

## APIs

1. Authentication Service: /auth  

  * Authenticate User - (email, password) => accessToken, refreshToken;  
  
   /login - POST    

  * Refresh (refreshToken) => accessToken;
   
   /refresh - POST

  * Logout (refreshToken) => void;
   
   /logout - DELETE
   #
2. User Service: /user  

  * Get user (accessToken) => userPayload
   
   / - GET
   #
3. Products Service: /products
  * Get products by ID (string[] | []) => Product[]
   
   / - POST

  * Upsert Products (Product[]) => Product[]
   
   / - PUT

  * Delete Products by ID (string[]) => void
   
   / - DELETE

  * Restore Product (Product[]) => Product[]
   
   /restore - PUT

  * Products Service /products
   Get products () => Product[]
   /?pid - GET
   # If pid exists get that product else get all products
   
   #
## Microservices

1. Auth
2. User
3. Products
4. Streaming - data handler service (using file services)
5. API
