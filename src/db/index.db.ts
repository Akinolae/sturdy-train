import { Client } from 'pg'

const dbconfig = (
  user: string,
  host: string,
  database: string,
  password: string,
  port: number
) => {
  const client = new Client({
    user,
    host,
    database,
    password,
    port,
  })

  client.connect()

  return client
}

export { dbconfig }
