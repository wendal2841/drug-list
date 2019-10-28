import { SagaIterator } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import {
    IQueryDocumentSnapshot,
    TDeleteCollectionRequest,
    IGetCollection,
    TPostCollectionRequest,
    TPutCollectionRequest
} from './types';
import RSF from 'services/firebase';
import { getFirestoreSuccess } from './actions';

export function* getCollection({ type, collection }: IGetCollection): SagaIterator {
    const querySnapshot = yield call(RSF.firestore.getCollection, collection);

    const data = querySnapshot.docs.map((it: IQueryDocumentSnapshot) => ({ id: it.id, ...it.data() }));

    yield put(getFirestoreSuccess(type, data));
}

export function* addDocument({ payload: { collection, data } }: TPostCollectionRequest): SagaIterator {
    const docRef = yield call(RSF.firestore.addDocument, collection, data);

    console.log(docRef);
}

export function* setDocument({ payload: { collection, data } }: TPutCollectionRequest): SagaIterator {
    yield call(RSF.firestore.setDocument, collection, data);
}

export function* deleteDocument({ payload: { collection } }: TDeleteCollectionRequest): SagaIterator {
    yield call(RSF.firestore.deleteDocument, collection);
}
