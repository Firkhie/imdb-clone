import {
  MOVIES_FETCH_SUCCESS,
  MOVIE_FETCH_DETAIL
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
    default:
      return state
  }
}

export default movieReducer