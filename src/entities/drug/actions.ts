import { IActionBase } from 'types';
import { DRUGS } from './constants';

export const getDrugs = (): IActionBase => ({ type: DRUGS.GET.REQUEST });
