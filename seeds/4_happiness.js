exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('happiness').del()
    .then(function () {
      return Promise.all([
        knex('happiness').insert(
          [{
            id: 1,
            purchase_id: 1,
            happiness: 7,
            created_at: new Date('2017-06-15 15:26:16 UTC'),
            updated_at: new Date('2017-06-15 15:26:16 UTC')
          },
          {
            id: 2,
            purchase_id: 1,
            happiness: 6,
            created_at: new Date('2017-06-16 15:26:16 UTC'),
            updated_at: new Date('2017-06-16 15:26:16 UTC')
          },
          {
            id: 3,
            purchase_id: 1,
            happiness: 3,
            created_at: new Date('2017-06-17 15:26:16 UTC'),
            updated_at: new Date('2017-06-17 15:26:16 UTC')
          },
          {
            id: 4,
            purchase_id: 1,
            happiness: 3,
            created_at: new Date('2017-06-18 15:26:16 UTC'),
            updated_at: new Date('2017-06-18 15:26:16 UTC')
          },
          {
            id: 5,
            purchase_id: 1,
            happiness: 3,
            created_at: new Date('2017-06-19 15:26:16 UTC'),
            updated_at: new Date('2017-06-19 15:26:16 UTC')
          },
          {
            id: 6,
            purchase_id: 1,
            happiness: 2,
            created_at: new Date('2017-06-20 15:26:16 UTC'),
            updated_at: new Date('2017-06-20 15:26:16 UTC')
          },
          {
            id: 7,
            purchase_id: 1,
            happiness: 2,
            created_at: new Date('2017-06-21 15:26:16 UTC'),
            updated_at: new Date('2017-06-21 15:26:16 UTC')
          },
          {
            id: 8,
            purchase_id: 2,
            happiness: 6,
            created_at: new Date('2017-06-15 15:26:16 UTC'),
            updated_at: new Date('2017-06-15 15:26:16 UTC')
          },
          {
            id: 9,
            purchase_id: 2,
            happiness: 4,
            created_at: new Date('2017-06-16 15:26:16 UTC'),
            updated_at: new Date('2017-06-16 15:26:16 UTC')
          },
          {
            id: 10,
            purchase_id: 2,
            happiness: 2,
            created_at: new Date('2017-06-17 15:26:16 UTC'),
            updated_at: new Date('2017-06-17 15:26:16 UTC')
          },
          {
            id: 11,
            purchase_id: 2,
            happiness: 1,
            created_at: new Date('2017-06-18 15:26:16 UTC'),
            updated_at: new Date('2017-06-18 15:26:16 UTC')
          },
          {
            id: 12,
            purchase_id: 2,
            happiness: 2,
            created_at: new Date('2017-06-19 15:26:16 UTC'),
            updated_at: new Date('2017-06-19 15:26:16 UTC')
          },
          {
            id: 13,
            purchase_id: 2,
            happiness: 1,
            created_at: new Date('2017-06-20 15:26:16 UTC'),
            updated_at: new Date('2017-06-20 15:26:16 UTC')
          },
          {
            id: 14,
            purchase_id: 2,
            happiness: 3,
            created_at: new Date('2017-06-21 15:26:16 UTC'),
            updated_at: new Date('2017-06-21 15:26:16 UTC')
          },
          {
            id: 15,
            purchase_id: 3,
            happiness: 7,
            created_at: new Date('2017-06-15 15:26:16 UTC'),
            updated_at: new Date('2017-06-15 15:26:16 UTC')
          },
          {
            id: 16,
            purchase_id: 3,
            happiness: 7,
            created_at: new Date('2017-06-16 15:26:16 UTC'),
            updated_at: new Date('2017-06-16 15:26:16 UTC')
          },
          {
            id: 17,
            purchase_id: 3,
            happiness: 7,
            created_at: new Date('2017-06-17 15:26:16 UTC'),
            updated_at: new Date('2017-06-17 15:26:16 UTC')
          },
          {
            id: 18,
            purchase_id: 3,
            happiness: 6,
            created_at: new Date('2017-06-18 15:26:16 UTC'),
            updated_at: new Date('2017-06-18 15:26:16 UTC')
          },
          {
            id: 19,
            purchase_id: 3,
            happiness: 6,
            created_at: new Date('2017-06-19 15:26:16 UTC'),
            updated_at: new Date('2017-06-19 15:26:16 UTC')
          },
          {
            id: 20,
            purchase_id: 3,
            happiness: 6,
            created_at: new Date('2017-06-20 15:26:16 UTC'),
            updated_at: new Date('2017-06-20 15:26:16 UTC')
          },
          {
            id: 21,
            purchase_id: 3,
            happiness: 7,
            created_at: new Date('2017-06-21 15:26:16 UTC'),
            updated_at: new Date('2017-06-21 15:26:16 UTC')
          }])
      ]);
    })
    .then(() => {
      return knex.raw("SELECT setval('happiness_id_seq', (SELECT MAX(id) FROM happiness));")
    });
};
