import { call, put } from 'redux-saga/effects';
import * as saga from 'services/firestore/saga';
import {
    IGetCollection,
    TPostCollectionRequest,
    TPutCollectionRequest,
    TDeleteCollectionRequest
} from 'services/firestore/types';
import RSF from 'services/firebase';
import { getFirestoreSuccess } from 'services/firestore/actions';
import { RestActionType } from 'utils/restActionType';

describe('services => firestore => saga', () => {
    it('getCollection test', () => {
        //Given
        const type = new RestActionType('FIRESTORE');
        const action: IGetCollection = {
            type,
            collection: 'collection'
        };
        const data = { name: 'name' };
        const docs = [{ id: 'id', data: (): object => data }];
        const expected = docs.map(it => ({ id: it.id, ...it.data() }));

        //When
        const generator = saga.getCollection(action);

        //Then
        expect(generator.next().value).toEqual(
            call(RSF.firestore.getCollection, action.collection)
        );
        expect(generator.next({ docs }).value).toEqual(
            put(getFirestoreSuccess(type, expected))
        );
        expect(generator.next().done).toBeTruthy();
    });

    it('addDocument test', () => {
        //Given
        const action: TPostCollectionRequest = {
            type: 'FIRESTORE__POST__REQUEST',
            payload: {
                collection: 'collection',
                data: {
                    name: 'name'
                }
            }
        };
        const docRef = 'docRef';

        //When
        const generator = saga.addDocument(action);

        //Then
        expect(generator.next().value).toEqual(
            call(RSF.firestore.addDocument, action.payload.collection, action.payload.data)
        );
        expect(generator.next(docRef).done).toBeTruthy();
    });

    it('setDocument test', () => {
        //Given
        const action: TPutCollectionRequest = {
            type: 'FIRESTORE__PUT__REQUEST',
            payload: {
                collection: 'collection',
                data: {
                    name: 'name'
                }
            }
        };

        //When
        const generator = saga.setDocument(action);

        //Then
        expect(generator.next().value).toEqual(
            call(RSF.firestore.setDocument, action.payload.collection, action.payload.data)
        );
        expect(generator.next().done).toBeTruthy();
    });

    it('deleteDocument test', () => {
        //Given
        const action: TDeleteCollectionRequest = {
            type: 'FIRESTORE__DELETE__REQUEST',
            payload: {
                collection: 'collection'
            }
        };

        //When
        const generator = saga.deleteDocument(action);

        //Then
        expect(generator.next().value).toEqual(
            call(RSF.firestore.deleteDocument, action.payload.collection)
        );
        expect(generator.next().done).toBeTruthy();
    });
});
