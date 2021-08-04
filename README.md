# URL Shortener
## Tech stack
### Backend

- Nodejs
- TypeScript
- TypeORM
- Sqlite3
- Jest
- Nginx as Reverse Proxy
- Docker
### Frontend

- React
- Tailwindcss
- TypeScript
- Jest
- Cypress
- Docker

## Commands

  Unit tests:
  
      make test
  
  End-to-end tests:

      make test-e2e
  
  Development environment:

      make dev

## Sequence diagram

![Sequence diagram](./diagrams/sequence-diagram.png)

## System Design

There are many ways that one could have built an URL shortener.

**One:**

The first option could have been a Monolithic application where the server was responsible for the UI, API and Database requests, for example, NextJS.

**Two:**

The second option could have been to split the application into Frontend and Backend into different domains or servers. Plus, we could probably leverage a NoSQL database instead of a SQL one.

**Third:**

The third option, and this solution, was allowed to work from the same domain without coupling the Frontend and Backend. Uses NGINX as a reverse proxy that sits in front of both applications. Allows both applications to be developed and deployed independently. Unfortunately, our data is not relational. The best choice would have been a NoSQL database.

**Fourth:**

The fourth option splits both the FE and BE into different domains or servers, uses a hashing mechanism agnostic to IDs (SQL) or Document IDs (NoSQL), and uses a NoSQL database for fast reads. It could leverage caching using Redis.

## What have I learnt or improved upon

- Docker and Docker-Compose
- React Testing Library
- Cypress
- TypeORM (new)
- NGINX
- Tailwindcss (new)
