/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('user').del()
  await knex('user').insert([
    {first_name: 'Bort', last_name: 'Simpson', user_name: 'EatMyShorts', password: 'SkinnerSux'},
    {first_name: 'Liza', last_name: 'Simpson', user_name: 'SaxophoneQueen', password: 'Bach1998'},
    {first_name: 'Bender', last_name: 'Rodriguez', user_name: 'BiteMyShinny', password: 'DABEST'}
  ]);
};
