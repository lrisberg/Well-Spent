'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('happiness', (table) => {
    table.increments();
    table
      .integer('purchase_id')
      .notNullable()
      .references('id')
      .inTable('purchases')
      .onDelete('CASCADE')
      .index();
    table.integer('happiness').notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('happiness');
};
