import { IDrug } from 'entities/drug/types';

export interface IStoreDrugList {
    drugs: IDrug[];
}

export interface IDispatchDrugList {
    getDrugs(): void;
}

export interface IPropsDrugList extends IStoreDrugList, IDispatchDrugList {}
