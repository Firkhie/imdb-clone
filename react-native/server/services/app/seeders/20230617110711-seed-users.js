'use strict';

const { hash } = require('../helpers/bcrypt');

let data = require('../data/users.json');
data.map((el) => {
  el.password = hash(el.password)
  el.createdAt = new Date()
  el.updatedAt = new Date()
})

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', data, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
