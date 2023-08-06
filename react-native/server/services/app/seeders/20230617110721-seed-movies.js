'use strict';

const { Movie } = require('../models');
let data = require('../data/movies.json');
data.map((el) => {
  el.createdAt = new Date()
  el.updatedAt = new Date()
})

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await Promise.all(
      data.map(async (el) => {
        el.createdAt = new Date();
        el.updatedAt = new Date();
        try {
          await Movie.createMovieTransaction(el); // Memanggil fungsi createMovieTransaction dengan data film
        } catch (error) {
          console.error('Error creating movie:', error);
        }
      })
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Movies', null, {});
  }
};
