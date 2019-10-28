import { combineReducers } from 'redux';
import medicineReducer from './medicines/reducer';

export const entitiesReducer = combineReducers({
    medicines: medicineReducer,
});
