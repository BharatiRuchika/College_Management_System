import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { userReducer, allUsersReducer } from '../reducers/userReducer'
const reducer = combineReducers({
    user: userReducer,
    allUsers: allUsersReducer
})
const middleware = [thunk];
const store = createStore(reducer, composeWithDevTools(applyMiddleware(...middleware)))
export default store;