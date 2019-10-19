import { takeEvery } from 'redux-saga/effects';
import * as saga from 'entities/drug/saga';
import { IGetDrugs } from 'entities/drug/types';

describe('entities => drug => saga', () => {
    it('apiDrugs test', () => {
        //When
        const generator = saga.default();

        //Then
        expect(generator.next().value).toEqual(
            takeEvery('DRUGS__GET__REQUEST', saga.getDrugs as IGetDrugs),
        );
        expect(generator.next().done).toBeTruthy();
    });
});
