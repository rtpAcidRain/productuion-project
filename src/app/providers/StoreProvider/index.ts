import StoreProvider from './ui/StoreProvider';
import { type AppDispatch, createReduxStore } from './config/store';
import type {
    StateSchema, ThunkExtraArg, ThunkConfig, ReduxStoreWithManager, StateSchemaKey,
} from './config/StateSchema';

export {
    StoreProvider,
    createReduxStore,
    StateSchema,
    AppDispatch,
    ThunkExtraArg,
    ThunkConfig,
    StateSchemaKey,
    ReduxStoreWithManager,
};
