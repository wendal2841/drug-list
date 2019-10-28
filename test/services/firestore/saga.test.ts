import { call, put } from 'redux-saga/effects';
import * as saga from 'services/firestore/saga';
import {
    IGetCollection,
    IPostCollection,
    IPutCollection,
    IDeleteCollection
} from 'services/firestore/types';
import RSF from 'services/firebase';
import { firestoreSuccess } from 'services/firestore/actions';
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
            put(firestoreSuccess(type.GET.SUCCESS, expected))
        );
        expect(generator.next().done).toBeTruthy();
    });

    it('addDocument test', () => {
        //Given
        const type = new RestActionType('FIRESTORE');
        const action: IPostCollection<{ name: string }> = {
            type,
            collection: 'collection',
            data: {
                name: 'name'
            }
        };
        const id = 'adsfasdfasdf';

        //When
        const generator = saga.addDocument(action);

        //Then
        expect(generator.next().value).toEqual(
            call(RSF.firestore.addDocument, action.collection, action.data)
        );
        expect(generator.next({ id }).value).toEqual(
            put(firestoreSuccess(type.POST.SUCCESS, { id, ...action.data }))
        );
        expect(generator.next().done).toBeTruthy();
    });

    it('setDocument test', () => {
        //Given
        const type = new RestActionType('FIRESTORE');
        const action: IPutCollection<{ id: string, name: string }> = {
            type,
            collection: 'collection',
            data: {
                id: 'adsfasdfasdf',
                name: 'name'
            }
        };
        const collection = `${action.collection}/${action.data.id}`;

        //When
        const generator = saga.setDocument(action);

        //Then
        expect(generator.next().value).toEqual(
            call(RSF.firestore.setDocument, collection, action.data)
        );
        expect(generator.next().value).toEqual(
            put(firestoreSuccess(type.PUT.SUCCESS, action.data))
        );
        expect(generator.next().done).toBeTruthy();
    });

    it('deleteDocument test', () => {
        //Given
        const type = new RestActionType('FIRESTORE');
        const action: IDeleteCollection = {
            type,
            collection: 'collection',
            id: 'asdfasdfasdf',
        };
        const collection = `${action.collection}/${action.id}`;

        //When
        const generator = saga.deleteDocument(action);

        //Then
        expect(generator.next().value).toEqual(
            call(RSF.firestore.deleteDocument, collection)
        );
        expect(generator.next().value).toEqual(
            put(firestoreSuccess(type.DELETE.SUCCESS, action.id))
        );
        expect(generator.next().done).toBeTruthy();
    });
});
