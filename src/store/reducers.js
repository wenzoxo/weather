import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'
import { weatherReducer } from '../scenes/Weather'

export const makeRootReducer = () => {
    const appReducer = combineReducers({
        routerReducer,
        weatherReducer
    });

    return (state, action) => appReducer(state, action);
};

export default makeRootReducer;
