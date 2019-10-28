import { TGetCollectionSuccess } from './types';

export const firestoreSuccess = <T>(type: string, data: T): TGetCollectionSuccess<T> => ({
    type: type,
    payload: data
});
