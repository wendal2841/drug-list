import { IAction, IActionBase, TSagaActionHandler } from 'types';

export interface IMedicine {
    code: string;
    name: string;
    price: number;
    shelfLife: number;
    compositionAndFormOfRelease: string;
    indication: string;
    contraindications: string;
}

export interface IStoreMedicine {
    medicineList: IMedicine[],
}

export interface IGetMedicine extends TSagaActionHandler<IActionBase> {}
export interface IPostMedicine extends TSagaActionHandler<IAction<IMedicine>> {}
