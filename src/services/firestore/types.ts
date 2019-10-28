import { IAction } from 'types';
import { RestActionType } from 'utils/restActionType';

export interface IQueryDocumentSnapshot {
    id: string,
    data(): object,
}

export interface IGetCollection {
    type: RestActionType,
    collection: string,
}
export type TPostCollectionRequest = IAction<{ collection: string, data: object }>;
export type TPutCollectionRequest = IAction<{ collection: string, data: object }>;
export type TDeleteCollectionRequest = IAction<{ collection: string }>;

export type TGetCollectionSuccess = IAction<object>;
