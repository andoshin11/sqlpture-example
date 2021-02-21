import 'reflect-metadata'
import * as express from 'express'
import * as logger from 'morgan'
import * as bodyParser from 'body-parser'
import * as cookieParser from 'cookie-parser'
import { container } from 'tsyringe'
import { Client, QueryResultBase } from 'pg'
import { Query } from 'sqlpture'
import { DB } from './types/db'
import * as middlewares from './middlewares'
import { NotFoundError } from './common/errors'


type Result<T> = QueryResultBase & { rows: Query<T, DB> }

class Repository {
  async query<T extends string>(queryStr: T, values?: any[]): Promise<Result<T>> {
    const client = container.resolve(Client)
    return client.query(queryStr, values) as any
  }
}

async function main() {
  try {
    /**
     * Init
     */
    const pgClient = new Client({
      database: 'dvdrental',
      user: 'postgres',
      password: 'mysecretpassword1234',
      host: 'localhost',
      port: 15432
    })
    await pgClient.connect()
    container.register(Client, { useValue: pgClient })
    const repository = new Repository()

    /**
     * Start Server
     */

    const app = express()

    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(cookieParser())
    app.use(logger('dev'))

    // Routes
    app.get('/customers', async (req, res, next) => {
      try {
        const { query } = req
        const limit = typeof query.limit === 'string' ? parseInt(query.limit, 10) : 10
        const offset = typeof query.offset === 'string' ? parseInt(query.offset, 10) : 0
        const { rows } = await repository.query('SELECT * FROM customer LIMIT $1 OFFSET $2', [limit, offset])

        res.json({
          customer: rows
        })

      } catch(e) {
        next(e)
      }
    })
    app.get('/customers/:customerId', async (req, res, next) => {
      try {
        const { customerId } = req.params
        const { rows } = await repository.query('SELECT c.customer_id, c.first_name, c.last_name, c.email, country.country, city.city, a.district, a.address, a.address2 FROM customer AS c INNER JOIN address AS a ON c.address_id = a.address_id INNER JOIN city ON a.city_id = city.city_id INNER JOIN country ON city.country_id = country.country_id WHERE customer_id = $1', [parseInt(customerId, 10)])

        if (!rows.length) throw new NotFoundError(`Customer ID: ${customerId} not found`)

        const customer = rows[0]

        res.json({
          customer
        })
      } catch (e) {
        next(e)
      }
    })

    // Error handling
    app.use(middlewares.ErrorMiddleware)

    // Start Server
    const port = process.env.PORT || 3010
    app.listen(port, () => {
      console.log(`Express started on port ${port}!`)
    })
  } catch (e) {
    console.log(e)
  }
}

main()
