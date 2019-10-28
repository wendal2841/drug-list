import { TSaga } from 'types';
import apiMedicine from './medicines/saga';

export const entitiesSaga: TSaga[] = [
    apiMedicine,
];
