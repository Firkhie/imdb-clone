'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.addColumn('Movies', 'mongoId', Sequelize.STRING)
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.removeColumn('Movies', 'mongoId');
  }
};
