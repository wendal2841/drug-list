import { IAction, TSagaActionHandler } from 'types';

export interface IDrug {
    name: string;
}

export interface IStoreDrug {
    drugs: IDrug[]
}

export interface IGetDrugs extends TSagaActionHandler<IAction<{  }>> {}
