import { takeEvery } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { IGetDrugs } from './types';
import { DRUGS } from './constants';

export default function* apiDrug(): SagaIterator {
    yield takeEvery(DRUGS.GET.REQUEST, getDrugs as IGetDrugs)
}

export function* getDrugs() {
    yield console.log('getDrugs');
}
