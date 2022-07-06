import knex from '../index.db'

export async function seed(): Promise<void> {
  // Deletes ALL existing entries
  await knex('Riders').del()

  console.log(knex.table('Riders'))
  // Inserts seed entries
  await knex('Riders').insert([
    {
      id: 1,
      firstName: 'Akinola',
      lastName: 'Makinde',
      surname: 'Emmanuel',
      location: 'Lagos',
      phoneNumber: '08106683185',
      email: 'demo@1234@gmail.com',
    },
  ])
}
