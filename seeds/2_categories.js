
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('categories').del()
    .then(function () {
      // Inserts seed entries
      return knex('categories').insert([
        {
          id: 1,
          name: 'Miscellaneous'
        },
        {
          id: 2,
          name: 'Uncategorized'
        },
        {
          id: 3,
          name: 'Entertainment'
        },
        {
          id: 4,
          name: 'Education'
        },
        {
          id: 5,
          name: 'Shopping'
        },
        {
          id: 6,
          name: 'Personal Care'
        },
        {
          id: 7,
          name: 'Health & Fitness'
        },
        {
          id: 8,
          name: 'Food & Dining'
        },
        {
          id: 9,
          name: 'Gifts & Donations'
        },
        {
          id: 10,
          name: 'Investments'
        },
        {
          id: 11,
          name: 'Bills & Utilities'
        },
        {
          id: 12,
          name: 'Auto & Transport'
        },
        {
          id: 13,
          name: 'Travel'
        },
        {
          id: 14,
          name: 'Fees & Charges'
        },
        {
          id: 15,
          name: 'Bills & Utilities'
        },
        {
          id: 16,
          name: 'Taxes'
        }
      ]);
    });
};
