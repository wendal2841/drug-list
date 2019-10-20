import { IMedicine } from 'entities/medicine/types';

export interface IStoreMedicineList {
    medicineList: IMedicine[];
}

export interface IDispatchMedicineList {
    getMedicine(): void;
}

export interface IPropsMedicineList extends IStoreMedicineList, IDispatchMedicineList {}
