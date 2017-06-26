'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('purchases', (table) => {
    table.increments();
    table
      .integer('user_id')
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .index();
      table
        .integer('category_id')
        .notNullable()
        .references('id')
        .inTable('categories')
        .onDelete('CASCADE')
        .index();
    table.string('name').notNullable();
    table.decimal('price').notNullable();
    table.date('date').notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('purchases');
};
