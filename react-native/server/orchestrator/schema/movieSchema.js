const axios = require('axios')
const redis = require('../config/redis')

const typeDefs = `#graphql
  # Model
  type Movie {
    id: ID
    title: String
    synopsis: String
    trailerUrl: String
    imgUrl: String
    rating: Int
    releaseYear: Int
    genreId: Genre
    authorId: User
    mongoId: String
    User: User,
    Genre: Genre
    Casts: [Casts]
  }

  type Genre {
    id: ID
    name: String
  }

  type User {
    id: ID
    username: String
    email: String
    password: String
    role: String
    phoneNumber: String
    address: String
  }

  type Casts {
    id: ID
    movieId: Int
    name: String
    profilePict: String
  }

  input CastsInput {
    id: ID
    movieId: Int
    name: String
    profilePict: String
  }

  # Endpoint
  type Query {
    findMovies: [Movie]
    findMovieById(id: ID!): Movie
  }

  type Mutation {
    createMovie(title: String, synopsis: String, trailerUrl: String, imgUrl: String, rating: Int, releaseYear: Int, genreId: Int, authorId: Int, mongoId: String, Casts: [CastsInput]): Movie
    updateMovie(id: ID!, title: String, synopsis: String, trailerUrl: String, imgUrl: String, rating: Int, releaseYear: Int, genreId: Int, authorId: Int, mongoId: String, Casts: [CastsInput]): Movie
    deleteMovie(id: ID!): Response
  }
`;

const baseUrlApp = 'http://app-service:4002'
const resolvers = {
  Query: {
    findMovies: async () => {
      try {
        let response
        const moviesCache = await redis.get('app:movies')
        if (!moviesCache) {
          const { data } = await axios({
            method: 'get',
            url: `${baseUrlApp}/pub/movies`
          })
          await redis.set('app:movies', JSON.stringify(data))
          response = data.data
        } else {
          response = JSON.parse(moviesCache)
        }
        return response.data
      } catch (err) {
        throw err
      }
    },
    findMovieById: async (_, args) => {
      const { id } = args
      try {
        const { data } = await axios({
          method: 'get',
          url: `${baseUrlApp}/pub/movies/${id}`
        })
        return data.data
      } catch (err) {
        throw err
      }
    }
  },
  Mutation: {
    createMovie: async (_, args) => {
      const { title, synopsis, trailerUrl, imgUrl, rating, releaseYear, genreId, authorId, mongoId, Casts } = args
      try {
        const { data } = await axios({
          method: 'post',
          url: `${baseUrlApp}/pub/movies`,
          data: { title, synopsis, trailerUrl, imgUrl, rating, releaseYear, genreId, authorId, mongoId, casts: Casts }
        })
        await redis.del('app:movies')
        return data
      } catch (err) {
        throw err
      }
    },
    updateMovie: async (_, args) => {
      const { id, title, synopsis, trailerUrl, imgUrl, rating, releaseYear, genreId, authorId, mongoId, Casts } = args
      try {
        const { data } = await axios({
          method: 'put',
          url: `${baseUrlApp}/pub/movies/${id}`,
          data: { title, synopsis, trailerUrl, imgUrl, rating, releaseYear, genreId, authorId, mongoId, casts: Casts }
        })
        await redis.del('app:movies')
        return data
      } catch (err) {
        throw err
      }
    },
    deleteMovie: async (_, args) => {
      const { id } = args
      try {
        await axios({
          method: 'delete',
          url: `${baseUrlApp}/pub/movies/${id}`
        })
        await redis.del('app:movies')
      } catch (err) {
        throw err
      }
    }
  }
};

module.exports = [typeDefs, resolvers]