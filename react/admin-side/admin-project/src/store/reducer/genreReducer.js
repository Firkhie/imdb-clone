import {
  GENRES_FETCH_SUCCESS,
  GENRE_FETCH_DETAIL,
  GENRE_DELETE_SUCCESS,
  GENRE_CREATE_UPDATE_SUCCESS
} from "../actions/actionType"

const initialState = {
  genres: [],
  genre: {}
}
function genreReducer(state = initialState, action) {
  switch (action.type) {
    case GENRES_FETCH_SUCCESS:
      return {
        ...state,
        genres: action.payload
      }
    case GENRE_FETCH_DETAIL:
      return {
        ...state,
        genre: action.payload
      }
    case GENRE_DELETE_SUCCESS:
      return {
        ...state,
        genre: action.payload
      }
    case GENRE_CREATE_UPDATE_SUCCESS:
      return {
        ...state,
        genre: action.payload
      }
    default:
      return state
  }
}

export default genreReducer