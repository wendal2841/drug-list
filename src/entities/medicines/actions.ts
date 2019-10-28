import { IAction, IActionBase } from 'types';
import { MEDICINE } from './constants';
import { IMedicine } from './types';

export const getMedicines = (): IActionBase => ({ type: MEDICINE.GET.REQUEST });
export const addMedicine = (payload: IMedicine): IAction<IMedicine> => ({
    type: MEDICINE.POST.REQUEST,
    payload,
});
export const deleteMedicine = (payload: string): IAction<string> => ({
    type: MEDICINE.DELETE.REQUEST,
    payload,
});
