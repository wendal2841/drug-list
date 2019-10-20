import { takeEvery } from 'redux-saga/effects';
import * as saga from 'entities/medicine/saga';
import { IGetMedicine } from 'entities/medicine/types';

describe('entities => medicine => saga', () => {
    it('apiDrugs test', () => {
        //When
        const generator = saga.default();

        //Then
        expect(generator.next().value).toEqual(
            takeEvery('MEDICINE__GET__REQUEST', saga.getMedicineList as IGetMedicine),
        );
        expect(generator.next().done).toBeTruthy();
    });
});
