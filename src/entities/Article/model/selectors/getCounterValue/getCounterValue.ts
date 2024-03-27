import { createSelector } from '@reduxjs/toolkit';
import { CounterSchema } from '../../types/article';
import { getCounter } from '../getCounter/getCounter';

export const getCounterValue = createSelector(
    getCounter,
    (counter: CounterSchema) => counter.value,
);
