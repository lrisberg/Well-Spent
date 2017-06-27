exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('purchases').del()
    .then(function () {
      return Promise.all([
        knex('purchases').insert(
          [{
            id: 1,
            user_id: 1,
            category_id: 8,
            name: 'Vanilla Soy Latte',
            price: '5.10',
            date: new Date('2017-04-15 16:26:16 UTC'),
            created_at: new Date('2017-04-15 14:26:16 UTC'),
            updated_at: new Date('2017-04-15 14:26:16 UTC')
          },
          {
            id: 2,
            user_id: 1,
            category_id: 7,
            name: 'Running Shoes',
            price: '112.87',
            date: new Date('2017-06-24 16:26:16 UTC'),
            created_at: new Date('2017-06-24 14:26:16 UTC'),
            updated_at: new Date('2017-06-24 14:26:16 UTC')
          },
          {
            id: 3,
            user_id: 1,
            category_id: 5,
            name: 'Vitamix Blender',
            price: '299.95',
            date: new Date('2017-06-24 16:26:16 UTC'),
            created_at: new Date('2017-06-24 14:26:16 UTC'),
            updated_at: new Date('2017-06-24 14:26:16 UTC')
          }])
      ]);
    })
    .then(() => {
      return knex.raw("SELECT setval('purchases_id_seq', (SELECT MAX(id) FROM purchases));")
    });
};
