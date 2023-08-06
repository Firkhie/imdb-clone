'use strict';
const {
  Model
} = require('sequelize');
const slug = require('../helpers/slug');
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Movie.belongsTo(models.User, { foreignKey: 'authorId' })
      Movie.belongsTo(models.Genre, { foreignKey: 'genreId' })

      Movie.hasMany(models.Cast, { foreignKey: 'movieId' })
    }

    static async createMovieTransaction(movie) {
      const t = await sequelize.transaction();
      const { title, synopsis, trailerUrl, imgUrl, rating, releaseYear, genreId, authorId, casts } = movie
      const movieSlug = slug(title)
      try {
        // Then, we do some calls passing this transaction as an option:

        const newMovie = await Movie.create({ title, slug: movieSlug, synopsis, trailerUrl, imgUrl, rating, releaseYear, genreId, authorId }, { transaction: t });

        await sequelize.models.Cast.bulkCreate(casts.map(el => {
          return { name: el.name, movieId: newMovie.id, profilePict: el.profilePict }
        }), { transaction: t });

        // If the execution reaches this line, no errors were thrown.
        // We commit the transaction.
        await t.commit();

      } catch (error) {
        console.log(error)
        // If the execution reaches this line, an error was thrown.
        // We rollback the transaction.
        await t.rollback();
        throw {status:400,msg:'Invalid Input'}
      }
    }
  }
  Movie.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Title is required!'
        }
      } 
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Slug is required!'
        }
      } 
    },
    synopsis: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Synopsis is required!'
        }
      } 
    },
    trailerUrl: DataTypes.STRING,
    imgUrl: DataTypes.STRING,
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Rating is required!'
        }
      } 
    },
    releaseYear: DataTypes.INTEGER,
    genreId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Genre ID is required!'
        }
      } 
    },
    authorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Author ID is required!'
        }
      } 
    },
  }, {
    // hooks: {
    //   beforeCreate: (instance, options) => {
    //     instance.slug = slug(instance.title)
    //   }
    // },
    sequelize,
    modelName: 'Movie',
  });
  return Movie;
};