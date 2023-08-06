import { legacy_createStore as createStore, applyMiddleware } from 'redux'
import rootReducer from './reducer/rootReducer'
import logger from './middlewares/logger'
import thunk from 'redux-thunk'

let store = createStore(rootReducer, applyMiddleware(logger, thunk))

export default store