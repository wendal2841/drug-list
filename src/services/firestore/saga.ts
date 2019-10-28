import { SagaIterator } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import {
    IQueryDocumentSnapshot,
    IGetCollection,
    IPostCollection,
    IPutCollection,
    IDeleteCollection,
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

export function* setDocument<T extends { id: string }>({ type, collection, data }: IPutCollection<T>): SagaIterator {
    yield call(RSF.firestore.setDocument, `${collection}/${data.id}`, data);

    yield put(firestoreSuccess(type.PUT.SUCCESS, data));
}

export function* deleteDocument({ type, collection, id }: IDeleteCollection): SagaIterator {
    yield call(RSF.firestore.deleteDocument, `${collection}/${id}`);

    yield put(firestoreSuccess(type.DELETE.SUCCESS, id));
}
