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
        case MEDICINE.PUT.SUCCESS:
            return _onPutMedicine(state, action as IAction<IMedicine>);
        case MEDICINE.DELETE.SUCCESS:
            return _onDeleteMedicine(state, action as IAction<string>);
        default:
            return state;
    }
}

const _onGetMedicines = ({ payload: medicines }: IAction<IMedicine[]>): IStoreMedicines => medicines;

const _onPostMedicine = (
    state: IStoreMedicines,
    { payload: medicine }: IAction<IMedicine>
): IStoreMedicines => [...state, medicine];

const _onPutMedicine = (
    state: IStoreMedicines,
    { payload: medicine }: IAction<IMedicine>
): IStoreMedicines => state.map(it => it.id === medicine.id ? medicine : it);

const _onDeleteMedicine = (
    state: IStoreMedicines,
    { payload: id }: IAction<string>
): IStoreMedicines => state.filter(it => it.id !== id);
