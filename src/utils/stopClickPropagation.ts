import { SyntheticEvent } from 'react';

export const stopClickPropagation = (e: SyntheticEvent): void => e.stopPropagation();
