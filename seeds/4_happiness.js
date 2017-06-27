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
            purchase_id: 1,
            happiness: 2,
            created_at: new Date('2017-06-22 15:26:16 UTC'),
            updated_at: new Date('2017-06-22 15:26:16 UTC')
          },
          {
            id: 9,
            purchase_id: 1,
            happiness: 3,
            created_at: new Date('2017-06-23 15:26:16 UTC'),
            updated_at: new Date('2017-06-23 15:26:16 UTC')
          },
          {
            id: 10,
            purchase_id: 1,
            happiness: 2,
            created_at: new Date('2017-06-24 15:26:16 UTC'),
            updated_at: new Date('2017-06-24 15:26:16 UTC')
          },
          {
            id: 11,
            purchase_id: 1,
            happiness: 2,
            created_at: new Date('2017-06-25 15:26:16 UTC'),
            updated_at: new Date('2017-06-25 15:26:16 UTC')
          },
          {
            id: 12,
            purchase_id: 1,
            happiness: 3,
            created_at: new Date('2017-06-26 15:26:16 UTC'),
            updated_at: new Date('2017-06-26 15:26:16 UTC')
          },
          {
            id: 13,
            purchase_id: 1,
            happiness: 1,
            created_at: new Date('2017-06-27 15:26:16 UTC'),
            updated_at: new Date('2017-06-27 15:26:16 UTC')
          },
          {
            id: 14,
            purchase_id: 1,
            happiness: 1,
            created_at: new Date('2017-06-28 15:26:16 UTC'),
            updated_at: new Date('2017-06-28 15:26:16 UTC')
          },
          {
            id: 15,
            purchase_id: 2,
            happiness: 6,
            created_at: new Date('2017-06-15 15:26:16 UTC'),
            updated_at: new Date('2017-06-15 15:26:16 UTC')
          },
          {
            id: 16,
            purchase_id: 2,
            happiness: 4,
            created_at: new Date('2017-06-16 15:26:16 UTC'),
            updated_at: new Date('2017-06-16 15:26:16 UTC')
          },
          {
            id: 17,
            purchase_id: 2,
            happiness: 2,
            created_at: new Date('2017-06-17 15:26:16 UTC'),
            updated_at: new Date('2017-06-17 15:26:16 UTC')
          },
          {
            id: 18,
            purchase_id: 2,
            happiness: 1,
            created_at: new Date('2017-06-18 15:26:16 UTC'),
            updated_at: new Date('2017-06-18 15:26:16 UTC')
          },
          {
            id: 19,
            purchase_id: 2,
            happiness: 2,
            created_at: new Date('2017-06-19 15:26:16 UTC'),
            updated_at: new Date('2017-06-19 15:26:16 UTC')
          },
          {
            id: 20,
            purchase_id: 2,
            happiness: 1,
            created_at: new Date('2017-06-20 15:26:16 UTC'),
            updated_at: new Date('2017-06-20 15:26:16 UTC')
          },
          {
            id: 21,
            purchase_id: 2,
            happiness: 3,
            created_at: new Date('2017-06-21 15:26:16 UTC'),
            updated_at: new Date('2017-06-21 15:26:16 UTC')
          },
          {
            id: 22,
            purchase_id: 2,
            happiness: 2,
            created_at: new Date('2017-06-22 15:26:16 UTC'),
            updated_at: new Date('2017-06-22 15:26:16 UTC')
          },
          {
            id: 23,
            purchase_id: 2,
            happiness: 1,
            created_at: new Date('2017-06-23 15:26:16 UTC'),
            updated_at: new Date('2017-06-23 15:26:16 UTC')
          },
          {
            id: 24,
            purchase_id: 2,
            happiness: 2,
            created_at: new Date('2017-06-24 15:26:16 UTC'),
            updated_at: new Date('2017-06-24 15:26:16 UTC')
          },
          {
            id: 25,
            purchase_id: 2,
            happiness: 1,
            created_at: new Date('2017-06-25 15:26:16 UTC'),
            updated_at: new Date('2017-06-25 15:26:16 UTC')
          },
          {
            id: 26,
            purchase_id: 2,
            happiness: 4,
            created_at: new Date('2017-06-26 15:26:16 UTC'),
            updated_at: new Date('2017-06-26 15:26:16 UTC')
          },
          {
            id: 27,
            purchase_id: 2,
            happiness: 3,
            created_at: new Date('2017-06-27 15:26:16 UTC'),
            updated_at: new Date('2017-06-27 15:26:16 UTC')
          },
          {
            id: 28,
            purchase_id: 2,
            happiness: 4,
            created_at: new Date('2017-06-28 15:26:16 UTC'),
            updated_at: new Date('2017-06-28 15:26:16 UTC')
          },
          {
            id: 29,
            purchase_id: 3,
            happiness: 7,
            created_at: new Date('2017-06-15 15:26:16 UTC'),
            updated_at: new Date('2017-06-15 15:26:16 UTC')
          },
          {
            id: 30,
            purchase_id: 3,
            happiness: 7,
            created_at: new Date('2017-06-16 15:26:16 UTC'),
            updated_at: new Date('2017-06-16 15:26:16 UTC')
          },
          {
            id: 31,
            purchase_id: 3,
            happiness: 7,
            created_at: new Date('2017-06-17 15:26:16 UTC'),
            updated_at: new Date('2017-06-17 15:26:16 UTC')
          },
          {
            id: 32,
            purchase_id: 3,
            happiness: 6,
            created_at: new Date('2017-06-18 15:26:16 UTC'),
            updated_at: new Date('2017-06-18 15:26:16 UTC')
          },
          {
            id: 33,
            purchase_id: 3,
            happiness: 6,
            created_at: new Date('2017-06-19 15:26:16 UTC'),
            updated_at: new Date('2017-06-19 15:26:16 UTC')
          },
          {
            id: 34,
            purchase_id: 3,
            happiness: 6,
            created_at: new Date('2017-06-20 15:26:16 UTC'),
            updated_at: new Date('2017-06-20 15:26:16 UTC')
          },
          {
            id: 35,
            purchase_id: 3,
            happiness: 7,
            created_at: new Date('2017-06-21 15:26:16 UTC'),
            updated_at: new Date('2017-06-21 15:26:16 UTC')
          },
          {
            id: 36,
            purchase_id: 3,
            happiness: 7,
            created_at: new Date('2017-06-22 15:26:16 UTC'),
            updated_at: new Date('2017-06-22 15:26:16 UTC')
          },
          {
            id: 37,
            purchase_id: 3,
            happiness: 7,
            created_at: new Date('2017-06-23 15:26:16 UTC'),
            updated_at: new Date('2017-06-23 15:26:16 UTC')
          },
          {
            id: 38,
            purchase_id: 3,
            happiness: 7,
            created_at: new Date('2017-06-24 15:26:16 UTC'),
            updated_at: new Date('2017-06-24 15:26:16 UTC')
          },
          {
            id: 39,
            purchase_id: 3,
            happiness: 6,
            created_at: new Date('2017-06-25 15:26:16 UTC'),
            updated_at: new Date('2017-06-25 15:26:16 UTC')
          },
          {
            id: 40,
            purchase_id: 3,
            happiness: 6,
            created_at: new Date('2017-06-26 15:26:16 UTC'),
            updated_at: new Date('2017-06-26 15:26:16 UTC')
          },
          {
            id: 41,
            purchase_id: 3,
            happiness: 6,
            created_at: new Date('2017-06-27 15:26:16 UTC'),
            updated_at: new Date('2017-06-27 15:26:16 UTC')
          },
          {
            id: 42,
            purchase_id: 3,
            happiness: 7,
            created_at: new Date('2017-06-28 15:26:16 UTC'),
            updated_at: new Date('2017-06-28 15:26:16 UTC')
          }])
      ]);
    })
    .then(() => {
      return knex.raw("SELECT setval('happiness_id_seq', (SELECT MAX(id) FROM happiness));")
    });
};
