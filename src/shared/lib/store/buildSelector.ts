import { useSelector } from 'react-redux';
// eslint-disable-next-line acid-plugin2/layers-import
import { StateSchema } from '@/app/providers/StoreProvider/config/StateSchema';

type Selector<T, Args extends any[]> = (state: StateSchema, ...args: Args) => T;
type Hook<T, Args extends any[]> = (...args: Args) => T
type Result<T, Args extends any[]> = [Hook<T, Args>, Selector<T, Args>]

export function buildSelector<T, Args extends any[]>(selector: Selector<T, Args>): Result<T, Args> {
    const useSelectorHook: Hook<T, Args> = (
        ...args: Args
    ) => useSelector((state: StateSchema) => selector(state, ...args));

    return [useSelectorHook, selector];
}
