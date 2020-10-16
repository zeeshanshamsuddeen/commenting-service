# Commenting Service

A simple Commenting Service using React JS, Node JS, Express JS and MongoDB. Comments can be added and edited. Each comment can have sub comments upto any level. A simple login mechanism has also been added.


## Table of Contents

- [APIs](#apis)
- [Quick Start](#quick-start)


## APIs
  
- `POST: /api/v1/accounts/login`

  `payload:
{
  "email" : "test@test.com",
  "password" : "qwerty123!"
}`

  Login to the service and generate a token.
  
- `POST: /api/v1/comments`

  `payload:
{
  "parentID" : "xxxxx",
  "text" : "yyyyy"
}`

  Add a new comment to the database with the Comment ID of the parent(optional).

- `GET: /api/v1/comments`

  Get the list of comments/sub-comments of a parent Comment ID(optional).
  
- `PUT: /api/v1/comments/:id`

  Edit the text of a comment.

A successful response will be

200: `{ success: true, data: {} }` or `{ success: true, data: [] }`


## Quick Start

Backend:
- `npm install` - To install node modules.
- `npm run initialize-data` - To create 2 test accounts:
    email: john@test.com, password: qwerty123!
    email: david@test.com, password: qwerty123!
- `npm run start` - To start the backend server.

Frontend:
- `npm install` - To install node modules.
- `npm run start` - To start the frontend server.


