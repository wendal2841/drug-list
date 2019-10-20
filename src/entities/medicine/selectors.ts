import { IStore } from 'types';

export const getMedicineList = (store: IStore) => store.entities.medicine.medicineList;
