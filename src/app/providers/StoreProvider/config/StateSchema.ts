import {
    AnyAction, CombinedState, Dispatch, EnhancedStore, Reducer, ReducersMapObject,
} from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { ArticleDetailsSchema } from 'entities/Article';
import { CounterSchema } from 'entities/Counter';
import { ProfileSchema } from 'features/editableProfileCard';
import { UserSchema } from 'entities/User';
import { AddNewCommentSchema } from 'features/AddNewComment';
import { LoginSchema } from 'features/AuthByUsername';
import { UISchema } from 'features/UI';
import {
    ArticleDetailsPageSchema,
} from 'pages/ArticleDetailsPage';
import { ArticlesPageSchema } from 'pages/ArticlesPage';
import { rtkApi } from 'shared/api/rtkApi';

export interface StateSchema {
    counter: CounterSchema;
    user: UserSchema,
    ui: UISchema
    [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>
    // Async reducer
    loginForm?: LoginSchema
    profile?: ProfileSchema
    articleDetails?: ArticleDetailsSchema
    AddNewComment?: AddNewCommentSchema
    articlesPage?: ArticlesPageSchema
    articleDetailsPage?: ArticleDetailsPageSchema
}

export type StateSchemaKey = keyof StateSchema;

export type MountedReducers = OptionalRecord<StateSchemaKey, boolean>

export interface ReducerManager {
    getReducerMap: () => ReducersMapObject<StateSchema>,
    reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>,
    add: (key: StateSchemaKey, reducer: Reducer) => void,
    remove: (key: StateSchemaKey) => void,
    getMountedReducers: () => MountedReducers
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
    reducerManager: ReducerManager;
}

export interface ThunkExtraArg {
    api: AxiosInstance,
}

export interface ThunkConfig<T> {
    rejectValue: T;
    extra: ThunkExtraArg;
    state: StateSchema;
    dispatch?: Dispatch;
}
