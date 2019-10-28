import { takeEvery, call } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { IGetMedicineRequest, IMedicine, IPostMedicineRequest } from './types';
import { IAction } from 'types';
import { COLLECTION_PATH, MEDICINE } from './constants';
import RSF from 'services/firebase';
import { getCollection } from 'services/firestore/saga';

export default function* apiMedicine(): SagaIterator {
    yield takeEvery(MEDICINE.GET.REQUEST, getMedicines as IGetMedicineRequest);
    yield takeEvery(MEDICINE.POST.REQUEST, addMedicine as IPostMedicineRequest);
}

export function* getMedicines(): SagaIterator {
    const data = { type: MEDICINE, collection: COLLECTION_PATH };

    yield call(getCollection, data);
}

export function* addMedicine({ payload }: IAction<IMedicine>): SagaIterator {
    const docRef = yield call(RSF.firestore.addDocument, COLLECTION_PATH, payload);

    console.log(docRef);
}
