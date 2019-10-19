import { TSaga } from 'types';
import { entitiesSaga } from 'entities/sagas';
import apiDrug from 'entities/drug/saga';

it('rootSaga test', () => {
    //Give
    const expected: TSaga[] = [
        apiDrug,
    ];

    //Then
    expect(entitiesSaga).toEqual(expected);
});
