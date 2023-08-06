import {
  MOVIES_FETCH_SUCCESS,
  MOVIE_FETCH_DETAIL,
  MOVIE_DELETE_SUCCESS,
  MOVIE_CREATE_UPDATE_SUCCESS
} from "../actions/actionType"

const initialState = {
  movies: [],
  movie: {}
}
function movieReducer(state = initialState, action) {
  switch (action.type) {
    case MOVIES_FETCH_SUCCESS:
      return {
        ...state,
        movies: action.payload
      }
    case MOVIE_FETCH_DETAIL:
      return {
        ...state,
        movie: action.payload
      }
    case MOVIE_DELETE_SUCCESS:
      return {
        ...state,
        movie: action.payload
      }
    case MOVIE_CREATE_UPDATE_SUCCESS:
      return {
        ...state,
        movie: action.payload
      }
    default:
      return state
  }
}

export default movieReducer