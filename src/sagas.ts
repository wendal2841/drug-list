import { fork } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { TSaga } from 'types';
import { entitiesSaga } from './entities/sagas';

export const sagas: TSaga[] = [
    ...entitiesSaga
];

export function* rootSaga(): SagaIterator {
    yield sagas.map(saga => fork(saga));
}
