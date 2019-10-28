import { TSaga } from 'types';
import { entitiesSaga } from 'entities/sagas';
import apiMedicine from 'entities/medicine/saga';

it('rootSaga test', () => {
    //Give
    const expected: TSaga[] = [
        apiMedicine,
    ];

    //Then
    expect(entitiesSaga).toEqual(expected);
});
