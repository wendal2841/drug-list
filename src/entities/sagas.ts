import { TSaga } from 'types';
import apiMedicine from './medicine/saga';

export const entitiesSaga: TSaga[] = [
    apiMedicine,
];
