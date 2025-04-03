const { Query } = require("pg");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('item').del()
  await knex('item').insert([
    {user_id: 3, item_name: "Monster Energy", description: "160mg of caffine per can", quantity: 10},
    {user_id: 2, item_name: "Zyn Can", description: "6mg Wintergreen", quantity: 1},
    {user_id: 1, item_name: "Beers", description: "Modelo with lime", quantity: 999}
  ]);
};
