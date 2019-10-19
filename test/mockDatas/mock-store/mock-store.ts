import { IStore } from 'types';
import { IStoreEntities } from 'entities/tupes';
import { mockStoreEntities } from './mock-store-entities';

export class MockStore implements IStore {
    entities: IStoreEntities = mockStoreEntities;
}
