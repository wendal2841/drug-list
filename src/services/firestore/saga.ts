import { SagaIterator } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import {
    IQueryDocumentSnapshot,
    IDeleteCollection,
    IGetCollection,
    IPostCollection,
    TPutCollectionRequest
} from './types';
import RSF from 'services/firebase';
import { firestoreSuccess } from './actions';

export function* getCollection({ type, collection }: IGetCollection): SagaIterator {
    const querySnapshot = yield call(RSF.firestore.getCollection, collection);

    const data = querySnapshot.docs.map((it: IQueryDocumentSnapshot) => ({ id: it.id, ...it.data() }));

    yield put(firestoreSuccess(type.GET.SUCCESS, data));
}

export function* addDocument<T>({ type, collection, data }: IPostCollection<T>): SagaIterator {
    const { id } = yield call(RSF.firestore.addDocument, collection, data);

    yield put(firestoreSuccess(type.POST.SUCCESS, { id, ...data }));
}

export function* setDocument({ payload: { collection, data } }: TPutCollectionRequest): SagaIterator {
    yield call(RSF.firestore.setDocument, collection, data);
}

export function* deleteDocument({ type, collection, id }: IDeleteCollection): SagaIterator {
    yield call(RSF.firestore.deleteDocument, `${collection}/${id}`);

    yield put(firestoreSuccess(type.DELETE.SUCCESS, id));
}
