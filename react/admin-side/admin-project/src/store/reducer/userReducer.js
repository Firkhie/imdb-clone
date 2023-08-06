import { USER_LOGIN_SUCCESS, USER_REGISTER_SUCCESS } from "../actions/actionType"

const initialState = {
  user: {}
}

function userReducer(state = initialState, action) {
  switch (action.type) {
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload
      }
    case USER_REGISTER_SUCCESS:
      return {
        ...state,
        user: action.payload
      }
    default:
      return state
  }
}

export default userReducer