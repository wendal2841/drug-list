import { firestoreSuccess } from 'services/firestore/actions';
import { TGetCollectionSuccess } from 'services/firestore/types';
import { RestActionType } from 'utils/restActionType';

describe('services => firestore => actions', () => {
    it('firestoreSuccess test', () => {
        //Given
        const type = new RestActionType('FIRESTORE');
        const data = { data: 'data' };
        const expected: TGetCollectionSuccess<{ data: string }> = {
            type: type.GET.SUCCESS,
            payload: data
        };

        //When
        const actual = firestoreSuccess(type.GET.SUCCESS, data);

        //Then
        expect(actual).toEqual(expected);
    });
});
