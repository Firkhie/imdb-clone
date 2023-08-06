'use strict';

let data = require('../data/genres.json')
data.map((el) => {
  el.createdAt = new Date()
  el.updatedAt = new Date()
})

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Genres', data, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Genres', null, {});
  }
};
