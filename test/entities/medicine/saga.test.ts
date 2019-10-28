import { call, takeEvery } from 'redux-saga/effects';
import * as saga from 'entities/medicine/saga';
import { IGetMedicine, IPostMedicine, IMedicine } from 'entities/medicine/types';
import { IAction } from 'types';
import RSF from 'services/firebase';
import { COLLECTION_PATH } from 'entities/medicine/constants';

describe('entities => medicine => saga', () => {
    it('apiMedicine test', () => {
        //When
        const generator = saga.default();

        //Then
        expect(generator.next().value).toEqual(
            takeEvery('MEDICINE__GET__REQUEST', saga.getMedicineList as IGetMedicine),
        );
        expect(generator.next().value).toEqual(
            takeEvery('MEDICINE__POST__REQUEST', saga.addMedicine as IPostMedicine),
        );
        expect(generator.next().done).toBeTruthy();
    });

    it('addMedicine test', () => {
        //Given
        const action: IAction<IMedicine> = {
            type: 'MEDICINE__POST__REQUEST',
            payload: {
                code: 'code',
                name: 'name',
                price: 100,
                shelfLife: 424352345,
                compositionAndFormOfRelease: 'compositionAndFormOfRelease',
                indication: 'indication',
                contraindications: 'contraindications',
            }
        };

        //When
        const generator = saga.addMedicine(action);

        //Then
        expect(generator.next().value).toEqual(call(RSF.firestore.addDocument, COLLECTION_PATH, action.payload));
        expect(generator.next().done).toBeTruthy();
    });

    it('getMedicineList test', () => {
        const data: IMedicine = {
            code: 'code',
            name: 'name',
            price: 100,
            shelfLife: 424352345,
            compositionAndFormOfRelease: 'compositionAndFormOfRelease',
            indication: 'indication',
            contraindications: 'contraindications',
        };
        const docs = [{ id: 'id', data: (): IMedicine => data }];

        //When
        const generator = saga.getMedicineList();

        //Then
        expect(generator.next().value).toEqual(call(RSF.firestore.getCollection, COLLECTION_PATH));
        expect(generator.next({ docs }).done).toBeTruthy();
    });
});
