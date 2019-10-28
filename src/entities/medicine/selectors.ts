import { IStore } from 'types';
import { IMedicine } from './types';

export const getMedicineList = (store: IStore): IMedicine[] => store.entities.medicine.medicineList;
