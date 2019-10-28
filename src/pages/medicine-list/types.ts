import { IMedicine } from 'entities/medicines/types';

export interface IStoreMedicineList {
    medicines: IMedicine[];
}

export interface IDispatchMedicineList {
    getMedicines(): void;
    addMedicine(payload: IMedicine): void;
    deleteMedicine(id: string): void;
}

export interface IPropsMedicineList extends IStoreMedicineList, IDispatchMedicineList {}
export interface IStateMedicineList {
    isOpenModalAdd: boolean;
}
