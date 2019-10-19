import { TSaga } from 'types';
import apiDrug from './drug/saga';

export const entitiesSaga: TSaga[] = [
    apiDrug,
];
