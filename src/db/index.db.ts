import config from '../knexfile'
import knex from 'knex'

const knexConfig = knex(config.development)

export default knexConfig
