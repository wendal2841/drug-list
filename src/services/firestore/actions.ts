import { TGetCollectionSuccess } from './types';
import { RestActionType } from 'utils/restActionType';

export const getFirestoreSuccess = (type: RestActionType, data: object): TGetCollectionSuccess => ({
    type: type.GET.SUCCESS,
    payload: data
});
