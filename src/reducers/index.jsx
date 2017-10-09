import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import rsoAPI from './rsoAPI';

const rootReducer = combineReducers({
    routing: routerReducer,
    rsoAPI
});

export default rootReducer;
