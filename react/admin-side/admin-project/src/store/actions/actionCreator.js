import {
  MOVIES_FETCH_SUCCESS,
  MOVIE_FETCH_DETAIL,
  MOVIE_DELETE_SUCCESS,
  MOVIE_CREATE_UPDATE_SUCCESS,

  GENRES_FETCH_SUCCESS,
  GENRE_FETCH_DETAIL,
  GENRE_DELETE_SUCCESS,
  GENRE_CREATE_UPDATE_SUCCESS,

  CASTS_FETCH_SUCCESS,
  CAST_CREATE_SUCCESS,

  USER_LOGIN_SUCCESS,
  USER_REGISTER_SUCCESS
} from "./actionType"

// MOVIES
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

export const movieDeleteSuccess = (payload) => {
  return {
    type: MOVIE_DELETE_SUCCESS,
    payload: payload
  }
}

export const movieCreateUpdateSuccess = (payload) => {
  return {
    type: MOVIE_CREATE_UPDATE_SUCCESS,
    payload: payload
  }
}

// GENRES
export const genresFetchSuccess = (payload) => {
  return {
    type: GENRES_FETCH_SUCCESS,
    payload: payload
  }
}

export const genreFetchDetail = (payload) => {
  return {
    type: GENRE_FETCH_DETAIL,
    payload: payload
  }
}

export const genreDeleteSuccess = (payload) => {
  return {
    type: GENRE_DELETE_SUCCESS,
    payload: payload
  }
}

export const genreCreateUpdateSuccess = (payload) => {
  return {
    type: GENRE_CREATE_UPDATE_SUCCESS,
    payload: payload
  }
}

// CASTS
export const castsFetchSuccess = (payload) => {
  return {
    type: CASTS_FETCH_SUCCESS,
    payload: payload
  }
}

export const castCreateSuccess = (payload) => {
  return {
    type: CAST_CREATE_SUCCESS,
    payload: payload
  }
}

// USERS
export const userLoginSuccess = (payload) => {
  return {
    type: USER_LOGIN_SUCCESS,
    payload: payload
  }
}

export const userRegisterSuccess = (payload) => {
  return {
    type: USER_REGISTER_SUCCESS,
    payload: payload
  }
}

// const baseUrl = 'http://localhost:3000'
const baseUrl = 'https://imdb.firkhiep2c1server.site'

// MOVIES
export const fetchMovies = () => {
  // Can be used after installing thunk
  return async (dispatch) => {
    try {
      const response = await fetch(baseUrl + '/movies', {
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
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
      const response = await fetch(baseUrl + `/movies/${id}`, {
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
      if (!response.ok) throw new Error('Something wrong!')
      const data = await response.json()
      dispatch(movieFetchDetail(data))
    } catch (err) {
      console.log(err)
    }
  }
}

export const createUpdateMovie = (id, fetchMethod, payload) => {
  return async (dispatch) => {
    try {
      const response = await fetch(baseUrl + `/movies${id ? `/${id}` : ''}`, {
        method: fetchMethod,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          access_token: localStorage.getItem('access_token')
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error('Something wrong!')
      const data = await response.json()
      dispatch(movieCreateUpdateSuccess(data))
    } catch (err) {
      console.log(err);
    }
  }
}

export const deleteMovieById = (id) => {
  return async (dispatch) => {
    try {
      const response = await fetch(baseUrl + `/movies/${id}`, {
        method: 'delete',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          access_token: localStorage.getItem('access_token')
        }
      });
      if (!response.ok) throw new Error('Something wrong!')
      dispatch(movieDeleteSuccess(data))
    } catch (err) {
      console.log(err);
    }
  }
}

// GENRES
export const fetchGenres = () => {
  return async (dispatch) => {
    try {
      console.log('BISA LEWAT GENRES LOH')
      const response = await fetch(baseUrl + '/genres', {
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
      if (!response.ok) throw new Error('Something wrong!')
      const data = await response.json()
      dispatch(genresFetchSuccess(data))
    } catch (err) {
      console.log(err)
    }
  }
}

export const fetchGenre = (id) => {
  return async (dispatch) => {
    try {
      const response = await fetch(baseUrl + `/genres/${id}`, {
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
      if (!response.ok) throw new Error('Something wrong!')
      const data = await response.json()
      dispatch(genreFetchDetail(data))
    } catch (err) {
      console.log(err)
    }
  }
}

export const createUpdateGenre = (id, fetchMethod, payload) => {
  return async (dispatch) => {
    try {
      const response = await fetch(baseUrl + `/genres${id ? `/${id}` : ''}`, {
        method: fetchMethod,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          access_token: localStorage.getItem('access_token')
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error('Something wrong!')
      const data = await response.json()
      dispatch(genreCreateUpdateSuccess(data))
    } catch (err) {
      console.log(err);
    }
  }
}

export const deleteGenreById = (id) => {
  return async (dispatch) => {
    try {
      const response = await fetch(baseUrl + `/genres/${id}`, {
        method: 'delete',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          access_token: localStorage.getItem('access_token')
        }
      });
      if (!response.ok) throw new Error('Something wrong!')
      dispatch(genreDeleteSuccess(data))
    } catch (err) {
      console.log(err);
    }
  }
}

// CASTS
export const fetchCasts = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(baseUrl + '/casts', {
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
      if (!response.ok) throw new Error('Something wrong!')
      const data = await response.json()
      dispatch(castsFetchSuccess(data))
    } catch (err) {
      console.log(err)
    }
  }
}

export const createCast = (payload) => {
  return async (dispatch) => {
    try {
      console.log(payload, 'INI PAYLOAD')
      const response = await fetch(baseUrl + `/casts`, {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          access_token: localStorage.getItem('access_token')
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error('Something wrong!')
      const data = await response.json()
      dispatch(castCreateSuccess(data))
    } catch (err) {
      console.log(err);
    }
  }
}

// USERS
export const userLogin = (payload) => {
  return async (dispatch) => {
    try {
      const response = await fetch(baseUrl + `/login`, {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error('Something wrong!')
      const data = await response.json()
      localStorage.setItem('access_token', data.access_token);
      dispatch(userLoginSuccess(data))
    } catch (err) {
      console.log(err);
    }
  }
}

export const userRegister = (payload) => {
  return async (dispatch) => {
    try {
      const response = await fetch(baseUrl + `/register`, {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          access_token: localStorage.getItem('access_token')
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error('Something wrong!')
      const data = await response.json()
      dispatch(userRegisterSuccess(data))
    } catch (err) {
      console.log(err);
    }
  }
}

