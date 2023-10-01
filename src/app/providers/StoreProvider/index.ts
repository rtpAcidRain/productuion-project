import StoreProvider from './ui/StoreProvider';
import { AppDispatch, createReduxStore } from './config/store';
import {
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
