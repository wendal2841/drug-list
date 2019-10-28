import { combineReducers } from 'redux';
import medicineReducer from './medicine/reducer';

export const entitiesReducer = combineReducers({
    medicine: medicineReducer,
});
