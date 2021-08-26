import { combineReducers, createStore, compose } from "redux";
import filterReducer from "./reducer";

const reducers = combineReducers({ filterReducer });

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, {}, composeEnhancers());

export default store;
