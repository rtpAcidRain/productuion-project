import { useSelector } from 'react-redux';
// eslint-disable-next-line acid-plugin2/layers-import
import { StateSchema } from '@/app/providers/StoreProvider/config/StateSchema';

type Selector<T> = (state: StateSchema) => T;
type Result<T> = [() => T, Selector<T>]

export function buildSelector<T>(selector: Selector<T>): Result<T> {
    const useSelectorHook = () => useSelector(selector);

    return [useSelectorHook, selector];
}
