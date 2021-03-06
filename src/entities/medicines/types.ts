import { IAction, IActionBase, TSagaActionHandler } from 'types';

export interface IMedicine {
    id?: string;
    code: string;
    name: string;
    price: number;
    shelfLife: number;
    compositionAndFormOfRelease: string;
    indication: string;
    contraindications: string;
}

export interface IStoreMedicines extends Array<IMedicine> {}

export interface IGetMedicineRequest extends TSagaActionHandler<IActionBase> {}
export interface IPostMedicineRequest extends TSagaActionHandler<IAction<IMedicine>> {}
export interface IPutMedicineRequest extends TSagaActionHandler<IAction<IMedicine>> {}
export interface IDeleteMedicineRequest extends TSagaActionHandler<IAction<string>> {}
