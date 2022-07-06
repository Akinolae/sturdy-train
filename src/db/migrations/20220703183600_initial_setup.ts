import knex from '../index.db'

export async function up(): Promise<void> {
  await knex.schema.createTable('Riders', (table): void => {
    table.integer('id').notNullable().unique()
    table.string('firstName', 15).notNullable()
    table.string('email', 50).notNullable().unique()
    table.string('lastName', 15).notNullable()
    table.string('surname', 15).notNullable()
    table.string('location', 250).notNullable()
    table.string('phoneNumber', 14).notNullable()
  })
}

export async function down(): Promise<void> {
  return knex.schema.dropTable('Riders')
}
