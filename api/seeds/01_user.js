/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('user').del()
  await knex('user').insert([
    {first_name: 'Bort', last_name: 'Simpson', user_name: 'EatMyShorts', password: '$2a$10$gzZFdYfOsJhbctKmWXO4uOGt9BwpwJOGeiN5BHno1zUzTJZbA66pW'}, //SkinnerSux
    {first_name: 'Liza', last_name: 'Simpson', user_name: 'SaxophoneQueen', password: '$2a$10$UgxKupdJ2BjZhyBJ84rXcu4BCMnzRxn8U4yJYOyjUWDwWPmRuKlpO'}, //Bach1998
    {first_name: 'Bender', last_name: 'Rodriguez', user_name: 'BiteMyShinny', password: '$2a$10$yguMi5UDpZMJG65JDrfOkuiOvPOGcqBZXV3Fkhku.h9kBguUZljyu'} //01000010
  ]);
};
