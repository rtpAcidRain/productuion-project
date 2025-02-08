import { bindActionCreators, createSlice } from '@reduxjs/toolkit';
import { SliceCaseReducers, CreateSliceOptions } from '@reduxjs/toolkit/dist';
import { useMemo } from 'react';
import { useAppDispatch } from '../hooks/useAppDispatch/useAppDispatch';

export function buildSlice
<State, CaseReducers extends SliceCaseReducers<State>, Name extends string = string>(options: CreateSliceOptions<State, CaseReducers, Name>) {
    const slice = createSlice(options);
    const useActions = () => {
        const dispatch = useAppDispatch();

        // @ts-ignore
        return useMemo(():typeof slice.actions => bindActionCreators(slice.actions, dispatch), [dispatch]);
    };
    return {
        ...slice,
        useActions,
    };
}
