'use strict';


module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Roles',
      [
        {
          role: "ADMIN",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          role: "USER",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  down: (queryInterface, Sequelize) => {
    // TODO: implement
  },
};
