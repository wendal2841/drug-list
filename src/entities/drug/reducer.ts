import { IStoreDrug } from './types';
import { IActionBase } from 'types';

const initialState: IStoreDrug = {
    drugs: [],
};

export default (state = initialState, action: IActionBase) => {
    switch (action.type) {
        default:
            return state;
    }
}
