import { takeEvery, call } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { IDeleteMedicineRequest, IGetMedicineRequest, IMedicine, IPostMedicineRequest } from './types';
import { IAction } from 'types';
import { COLLECTION_PATH, MEDICINE } from './constants';
import { getCollection, addDocument, deleteDocument } from 'services/firestore/saga';
import { IGetCollection, IPostCollection, IDeleteCollection } from 'services/firestore/types';

export default function* apiMedicine(): SagaIterator {
    yield takeEvery(MEDICINE.GET.REQUEST, getMedicines as IGetMedicineRequest);
    yield takeEvery(MEDICINE.POST.REQUEST, addMedicine as IPostMedicineRequest);
    yield takeEvery(MEDICINE.DELETE.REQUEST, deleteMedicine as IDeleteMedicineRequest);
}

export function* getMedicines(): SagaIterator {
    const data: IGetCollection = {
        type: MEDICINE,
        collection: COLLECTION_PATH,
    };

    yield call(getCollection, data);
}

export function* addMedicine({ payload }: IAction<IMedicine>): SagaIterator {
    const data: IPostCollection<IMedicine> = {
        type: MEDICINE,
        collection: COLLECTION_PATH,
        data: payload,
    };

    yield call(addDocument, data);
}

export function* deleteMedicine({ payload }: IAction<string>): SagaIterator {
    const data: IDeleteCollection = {
        type: MEDICINE,
        collection: COLLECTION_PATH,
        id: payload,
    };

    yield call(deleteDocument, data);
}
