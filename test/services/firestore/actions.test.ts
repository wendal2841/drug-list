import { getFirestoreSuccess } from 'services/firestore/actions';
import { TGetCollectionSuccess } from 'services/firestore/types';
import { RestActionType } from 'utils/restActionType';

describe('services => firestore => actions', () => {
    it('getFirestoreSuccess test', () => {
        //Given
        const type = new RestActionType('FIRESTORE');
        const data = { data: 'data' };
        const expected: TGetCollectionSuccess = {
            type: type.GET.SUCCESS,
            payload: data
        };

        //When
        const actual = getFirestoreSuccess(type, data);

        //Then
        expect(actual).toEqual(expected);
    });
});
