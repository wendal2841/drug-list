import { IMedicine, IStoreMedicines } from './types';
import { IAction } from 'types';
import { MEDICINE } from './constants';

const initialState: IStoreMedicines = [
    // {
    //     code: 'code',
    //     name: 'name',
    //     price: 100,
    //     shelfLife: 424352345,
    //     compositionAndFormOfRelease: 'compositionAndFormOfRelease',
    //     indication: 'indication',
    //     contraindications: 'contraindications',
    // },
    // {
    //     code: 'code',
    //     name: 'name',
    //     price: 100,
    //     shelfLife: 424352345,
    //     compositionAndFormOfRelease: 'compositionAndFormOfRelease',
    //     indication: 'indication',
    //     contraindications: 'contraindications',
    // }
];

export default (state = initialState, action: IAction<IMedicine[]>): IStoreMedicines => {
    switch (action.type) {
        case MEDICINE.GET.SUCCESS:
            return action.payload;
        default:
            return state;
    }
}
