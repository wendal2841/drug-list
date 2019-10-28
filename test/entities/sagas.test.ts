import { TSaga } from 'types';
import { entitiesSaga } from 'entities/sagas';
import apiMedicine from 'entities/medicines/saga';

it('entitiesSaga test', () => {
    //Give
    const expected: TSaga[] = [
        apiMedicine,
    ];

    //Then
    expect(entitiesSaga).toEqual(expected);
});
