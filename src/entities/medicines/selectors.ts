import { IStore } from 'types';
import { IMedicine } from './types';

export const getMedicines = (store: IStore): IMedicine[] => store.entities.medicines;
