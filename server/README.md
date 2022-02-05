# BYU Disc Golf server

Server for handling all api calls and interaction with the database

Written with Express.js

## Backend Proxy

Any http requests sent from the frontend to urls beginning with `/api` will be forwarded to this server.

That means that all our api code should be under a route called `api`.  There can be multiple paths from there, i.e. `/api/users` or `/api/courses`