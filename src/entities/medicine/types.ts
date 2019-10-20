import { IAction, TSagaActionHandler } from 'types';

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
    medicineList: IMedicine[]
}

export interface IGetMedicine extends TSagaActionHandler<IAction<{  }>> {}
