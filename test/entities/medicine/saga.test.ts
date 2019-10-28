import { call, takeEvery } from 'redux-saga/effects';
import * as saga from 'entities/medicines/saga';
import { IGetMedicineRequest, IPostMedicineRequest, IMedicine } from 'entities/medicines/types';
import { IAction } from 'types';
import RSF from 'services/firebase';
import { COLLECTION_PATH } from 'entities/medicines/constants';
import { getCollection } from 'services/firestore/saga';
import { MEDICINE } from 'entities/medicines/constants';

describe('entities => medicines => saga', () => {
    it('apiMedicine test', () => {
        //When
        const generator = saga.default();

        //Then
        expect(generator.next().value).toEqual(
            takeEvery('MEDICINE__GET__REQUEST', saga.getMedicines as IGetMedicineRequest),
        );
        expect(generator.next().value).toEqual(
            takeEvery('MEDICINE__POST__REQUEST', saga.addMedicine as IPostMedicineRequest),
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

    it('getMedicines test', () => {
        const data = { type: MEDICINE, collection: COLLECTION_PATH };

        //When
        const generator = saga.getMedicines();

        //Then
        expect(generator.next().value).toEqual(call(getCollection, data));
        expect(generator.next().done).toBeTruthy();
    });
});
