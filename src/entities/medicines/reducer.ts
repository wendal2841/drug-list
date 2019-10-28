import { IMedicine, IStoreMedicines } from './types';
import { IAction, IActionBase } from 'types';
import { MEDICINE } from './constants';

const initialState: IStoreMedicines = [];

export default (state = initialState, action: IActionBase): IStoreMedicines => {
    switch (action.type) {
        case MEDICINE.GET.SUCCESS:
            return _onGetMedicines(action as IAction<IMedicine[]>);
        case MEDICINE.POST.SUCCESS:
            return _onPostMedicine(state, action as IAction<IMedicine>);
        default:
            return state;
    }
}

const _onGetMedicines = ({ payload }: IAction<IMedicine[]>): IStoreMedicines => payload;
const _onPostMedicine = (state: IStoreMedicines, action: IAction<IMedicine>): IStoreMedicines => [...state, action.payload];
