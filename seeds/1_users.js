exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      return Promise.all([
        knex('users').insert(
          [{
            id: 1,
            email: 'lauren@wellspent.com',
            hashed_password: '$2a$12$J18d3YZSUbZLaZ.PRws3veE3ZscyzenJm.L9xmhfQ8hhU9KpZwEB2',
            created_at: new Date('2017-06-24 14:26:16 UTC'),
            updated_at: new Date('2017-06-24 14:26:16 UTC')
          }])
      ]);
    })
    .then(() => {
      return knex.raw("SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));")
    });
};
