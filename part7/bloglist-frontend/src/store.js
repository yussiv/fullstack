import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import notificationReducer from './reducers/notification'
import blogReducer from './reducers/blog'
import userReducer from './reducers/user'

const reducer = combineReducers({
  notifications: notificationReducer,
  blogs: blogReducer,
  user: userReducer,
}) 

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

export default store
