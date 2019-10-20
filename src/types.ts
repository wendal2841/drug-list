import { SagaIterator } from 'redux-saga';
import { HelperFunc0 } from 'redux-saga/effects';
import { IStoreEntities } from './entities/types';

export type TSaga = () => SagaIterator;

export type TFunc<T, R> = (arg: T) => R;

export type TSagaActionHandler<T = {}> = HelperFunc0<T>;

export interface IStore {
    entities: IStoreEntities;
}

export interface IActionBase {
    readonly type: string;
}

export interface IAction<P> extends IActionBase {
    readonly payload: P;
}
