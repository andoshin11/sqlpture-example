# sqlpture example
This is an example repository for [sqlpture](https://github.com/andoshin11/sqlpture), a type-level SQL interpretor.

This repository contains following:

- PostgreSQL DB
- Node.js API Server(express)

With this combination, you could get a sence of what it looks like to write fully type-safe backend application with Node.js + TypeScript.

![DEMO 01](./demo01.png)

You'll be surprised how complecated it can gets!

## Example Database

![DVD Rental](./dvd-rental-sample-database-diagram.png)

## Step by Step Guide

Requirements:
- Docker
- Node.js

1. Starting up Database
 - `make start-db` to start PostgreSQL container
 - The container will be accessible on `localhost:15432`

2. Retore Database
  - `dvdrental.tar` is a dumpt PostgreSQL data which contains both migration history, and actual data
  - `make restore-db` to restore data
  - The database will be accesible on `postgres://postgres:mysecretpassword1234@localhost:15432/dvdrental`

3. Generate DB schema types
  - `make typegen` to auto-generate DB schema types
  - Check out [schema.ts](./server/src/types/db/schema.ts) for the result

3. Start Server
  - `make start-server` to start Node.js(Express) server, locally
  - The server will be acceible on `localhost:3010`
  - Make sure to restart the server everytime you change files under `/server`

4. Call API
  
## Tips
### Generate DB schema types
We are using [schemats](https://github.com/SweetIQ/schemats) to generate DB schema types.

Although it's not perfect for every DB, it works most of the time! We recommend you to give it a shot!


### Repository class
The most common way to connect Postgres from Node.js is to use [node-postgres](https://node-postgres.com/).

However, since it basically returns `any` all the time, we recommend you to prepare a wrapper repository class with a type-safe `query` function.

```typescript
import { Client, QueryResultBase } from 'pg'
import { Query } from 'sqlpture'

type Result<T> = QueryResultBase & { rows: Query<T, DB> }

class Repository {
  constructor(private client: Client) {}

  async query<T extends string>(queryStr: T, values?: any[]): Promise<Result<T>> {
    return this.client.query(queryStr, values) as any
  }
}

const repository = new Repository(client)
const { rows } = await repository.query('SELECT name FROM user;')
console.log(rows) // [{ name: 'Tom' }, { name: 'Lisa' }, { name: 'Mike' }] <- You'll get a type-safe result
```

### Typing HTTP Request/Response
TBD
