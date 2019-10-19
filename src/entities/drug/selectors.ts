import { IStore } from 'types';

export const getDrugs = (store: IStore) => store.entities.drug.drugs;
