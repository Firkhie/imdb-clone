import {
  MOVIES_FETCH_SUCCESS,
  MOVIE_FETCH_DETAIL
} from "./actionType"

export const moviesFetchSuccess = (payload) => {
  return {
    type: MOVIES_FETCH_SUCCESS,
    payload: payload
  }
}

export const movieFetchDetail = (payload) => {
  return {
    type: MOVIE_FETCH_DETAIL,
    payload: payload
  }
}

// const baseUrl = 'http://localhost:3000';
const baseUrl = 'https://imdb.firkhiep2c1server.site';

export const fetchMovies = () => {
  return async (dispatch) => {
    try {
      console.log('BISA LEWAT MOVIE LOH')
      const response = await fetch(baseUrl + '/pub/movies')
      if (!response.ok) throw new Error('Something wrong!')
      const data = await response.json()
      console.log(data, 'BERHASIL MOVIES')
      dispatch(moviesFetchSuccess(data))
    } catch (err) {
      console.log(err)
    }
  }
}


export const fetchMovie = (id) => {
  return async (dispatch) => {
    try {
      const response = await fetch(baseUrl + `/pub/movies/${id}`)
      if (!response.ok) throw new Error('Something wrong!')
      const data = await response.json()
      dispatch(movieFetchDetail(data))
    } catch (err) {
      console.log(err)
    }
  }
}