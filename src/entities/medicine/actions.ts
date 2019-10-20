import { IActionBase } from 'types';
import { MEDICINE } from './constants';

export const getMedicine = (): IActionBase => ({ type: MEDICINE.GET.REQUEST });
