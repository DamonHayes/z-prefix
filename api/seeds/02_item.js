const { Query } = require("pg");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('item').del()
  await knex('item').insert([
    {user_id: 3, item_name: "Playing Cards", description: "extra aces", quantity: 64},
    {user_id: 2, item_name: "Saxaphone", description: "Tenor Sax", quantity: 1},
    {user_id: 1, item_name: "SlingShot Ammo", description: "Pebbles", quantity: 999}
  ]);
};
