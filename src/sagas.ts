import { fork } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { TSaga } from 'types';

export const sagas: TSaga[] = [];

export function* rootSaga(): SagaIterator {
    yield sagas.map(saga => fork(saga));
}
