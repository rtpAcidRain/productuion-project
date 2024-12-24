import {
    PayloadAction,
    createEntityAdapter,
    createSlice,
} from '@reduxjs/toolkit';
import { StateSchema } from '@/app/providers/StoreProvider';
import { Comment } from '@/entities/Comment';
import { ArticleDetailsCommentSchema } from '../types/ArticleDetailsCommentSchema';
import { fetchCommentsByArticleId } from '../services/fetchCommentByArticleId/fetchCommentByArticleId';

const articleDetailsCommentAdapter = createEntityAdapter<Comment>({
    selectId: (comment) => comment.id,
});

export const getArticleComments = articleDetailsCommentAdapter.getSelectors<StateSchema>(
    (state) => state.articleDetailsPage?.comments || articleDetailsCommentAdapter.getInitialState(),
);

const articleDetailsCommentSlice = createSlice({
    name: 'articleDetailsCommentSlice',
    initialState: articleDetailsCommentAdapter.getInitialState<ArticleDetailsCommentSchema>({
        isLoading: true,
        error: undefined,
        ids: [],
        entities: {

        },

    }),
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCommentsByArticleId.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(
                fetchCommentsByArticleId.fulfilled,
                (
                    state,
                    action: PayloadAction<Comment[]>,
                ) => {
                    state.isLoading = false;
                    articleDetailsCommentAdapter.setAll(state, action.payload);
                },
            )
            .addCase(
                fetchCommentsByArticleId.rejected,
                (
                    state,
                    action,
                ) => {
                    state.isLoading = false;
                    state.error = action.payload;
                },
            );
    },
});

export const { reducer: articleDetailsCommentReducer } = articleDetailsCommentSlice;
