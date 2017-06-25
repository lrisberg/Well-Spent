exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('happiness').del()
    .then(function () {
      return Promise.all([
        knex('happiness').insert(
          [{
            id: 1,
            purchase_id: 1,
            happiness: 5,
            created_at: new Date('2017-06-24 15:26:16 UTC'),
            updated_at: new Date('2017-06-24 15:26:16 UTC')
          }])
      ]);
    })
    .then(() => {
      return knex.raw("SELECT setval('happiness_id_seq', (SELECT MAX(id) FROM happiness));")
    });
};
