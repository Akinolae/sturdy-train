import knex from 'knex'

const pg = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    port: 3306,
    user: 'postgres',
    password: 'thegreatest@123',
    database: 'rider_service',
  },
})

export default pg
