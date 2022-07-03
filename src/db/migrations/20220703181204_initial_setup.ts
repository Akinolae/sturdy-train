import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  knex.schema.createTable('Riders', (table): void => {
    table.integer('id').notNullable()
    table.string('firstName', 15).notNullable()
    table.string('lastName', 15).notNullable()
    table.string('surname', 15).notNullable()
    table.string('location', 250).notNullable()
    table.string('phoneNumber', 14).notNullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('Riders')
}
