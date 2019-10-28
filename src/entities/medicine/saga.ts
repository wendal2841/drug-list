import { takeEvery, call } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { IGetMedicine, IMedicine, IPostMedicine } from './types';
import { IAction } from 'types';
import { COLLECTION_PATH, MEDICINE } from './constants';
import RSF from 'services/firebase';

export default function* apiMedicine(): SagaIterator {
    yield takeEvery(MEDICINE.GET.REQUEST, getMedicineList as IGetMedicine);
    yield takeEvery(MEDICINE.POST.REQUEST, addMedicine as IPostMedicine);
}

export function* addMedicine({ payload }: IAction<IMedicine>): SagaIterator {
    const docRef = yield call(RSF.firestore.addDocument, COLLECTION_PATH, payload);

    console.log(docRef);
}

export function* getMedicineList(): SagaIterator {
    const querySnapshot = yield call(RSF.firestore.getCollection, COLLECTION_PATH);

    // @ts-ignore
    console.log(querySnapshot.docs.map(it => ({ code: it.id, ...it.data() })));
}
