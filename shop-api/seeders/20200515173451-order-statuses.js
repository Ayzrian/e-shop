'use strict';

const statuses = [
  'Ожидает отправки',
  'Ожидает оплаты',
  'В дороге',
  'Ожидает подтверждения',
  'Оплачено',
  'Возврат',
  'Отменен',
  'Возврат средств',
];

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'OrderStatuses',
      [
        ...statuses.map(status => ({
          status,
          createdAt: new Date(),
          updatedAt: new Date(),
        })),
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
