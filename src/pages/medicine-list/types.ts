import { IMedicine } from 'entities/medicine/types';

export interface IStoreMedicineList {
    medicineList: IMedicine[];
}

export interface IDispatchMedicineList {
    getMedicine(): void;
    addMedicine(payload: IMedicine): void;
}

export interface IPropsMedicineList extends IStoreMedicineList, IDispatchMedicineList {}
export interface IStateMedicineList {
    isOpenModalAdd: boolean;
}
