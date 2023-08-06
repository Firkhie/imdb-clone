import { combineReducers } from 'redux'
import movieReducer from "./movieReducer"
import genreReducer from "./genreReducer"
import castReducer from "./castReducer"
import userReducer from './userReducer'

const rootReducer = combineReducers({
  movie: movieReducer,
  genre: genreReducer,
  casts: castReducer,
  user: userReducer
})

export default rootReducer