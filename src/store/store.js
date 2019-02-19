import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import makeRootReducer from './reducers'
import api from './middleware/api'
import geo from './middleware/geo'

const initialState = {};
const enhancers = [];
const middleware = [
    thunk,
    api,
    geo
];

if (process.env.NODE_ENV === 'development') {
    enhancers.push(window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
}

const composedEnhancers = compose;

const store = createStore(
    makeRootReducer(),
    initialState,
    composedEnhancers(
        applyMiddleware(...middleware),
        ...enhancers
    )
);

export default store
