'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Users',
      [
        {
          firstName: 'Test Admin',
          lastName: 'Test Admin',
          dateOfBirth: new Date(),
          email: 'admin@admin.com',
          password: await bcrypt.hash('123456', 10),
          phoneNumber: '+38000000000',
          sex: 'Мужчина',
          roleId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  },
};
