import { takeEvery } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { IGetMedicine } from './types';
import { MEDICINE } from './constants';

export default function* apiMedicine(): SagaIterator {
    yield takeEvery(MEDICINE.GET.REQUEST, getMedicineList as IGetMedicine)
}

export function* getMedicineList() {
    yield console.log('Medicine');
}
