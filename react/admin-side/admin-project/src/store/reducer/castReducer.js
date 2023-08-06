import {
  CASTS_FETCH_SUCCESS,
  CAST_CREATE_SUCCESS
} from "../actions/actionType"

const initialState = {
  casts: [],
  cast: {}
}
function castsReducer(state = initialState, action) {
  switch (action.type) {
    case CASTS_FETCH_SUCCESS:
      return {
        ...state,
        casts: action.payload
      }
    case CAST_CREATE_SUCCESS:
      return {
        ...state,
        genre: action.payload
      }
    default:
      return state
  }
}

export default castsReducer