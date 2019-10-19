import { IDrug } from 'entities/drug/types';
import * as React from 'react';

export const drugRow = (item: IDrug) => (
    <div>{ JSON.stringify(item) }</div>
);
