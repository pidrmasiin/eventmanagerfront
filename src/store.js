import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import eventReducer from './reducers/eventReducer';
import userReducer from './reducers/userReducer';

const reducer = combineReducers({
  events: eventReducer,
  user: userReducer,
});

const store = createStore(
  reducer,
  applyMiddleware(thunk),
)

export default store;
