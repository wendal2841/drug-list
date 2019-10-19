import { combineReducers } from 'redux';
import drugReducer from './drug/reducer';

export const entitiesReducer = combineReducers({
    drug: drugReducer,
});
