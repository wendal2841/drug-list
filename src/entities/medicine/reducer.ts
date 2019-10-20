import { IStoreMedicine } from './types';
import { IActionBase } from 'types';

const initialState: IStoreMedicine = {
    medicineList: [
        {
            code: 'code',
            name: 'name',
            price: 100,
            shelfLife: 424352345,
            compositionAndFormOfRelease: 'compositionAndFormOfRelease',
            indication: 'indication',
            contraindications: 'contraindications',
        }
    ],
};

export default (state = initialState, action: IActionBase) => {
    switch (action.type) {
        default:
            return state;
    }
}
