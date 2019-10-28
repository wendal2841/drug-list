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
export interface IPostCollection<T> {
    type: RestActionType,
    collection: string,
    data: T
}
export interface IPutCollection<T> {
    type: RestActionType,
    collection: string,
    data: T
}
export interface IDeleteCollection {
    type: RestActionType,
    collection: string,
    id: string,
}

export type TGetCollectionSuccess<T> = IAction<T>;
