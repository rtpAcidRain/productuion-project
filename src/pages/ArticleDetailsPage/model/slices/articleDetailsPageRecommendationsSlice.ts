import {
    PayloadAction,
    createEntityAdapter,
    createSlice,
} from '@reduxjs/toolkit';
import { StateSchema } from '@/app/providers/StoreProvider';
import { Article } from '@/entities/Article';
import { ArticleDetailsPageRecommendationsSchema } from '../types/ArticleDetailsPageRecommendationsSchema';
import { fetchRecomendationsList } from '../services/fetchArticleRecommendations/fetchArticleRecommendations';

const articleDetailsPageRecommendationsAdapter = createEntityAdapter<Article>({
    selectId: (article) => article.id,
});

export const getArticlePageRecommendations = articleDetailsPageRecommendationsAdapter.getSelectors<StateSchema>(
    (state) => state.articleDetailsPage?.recommendations || articleDetailsPageRecommendationsAdapter.getInitialState(),
);

const articleDetailsPageRecommendationsSlice = createSlice({
    name: 'articleDetailsPageRecommendationsSlice',
    initialState: articleDetailsPageRecommendationsAdapter.getInitialState<ArticleDetailsPageRecommendationsSchema>({
        isLoading: false,
        error: undefined,
        ids: [],
        entities: {

        },

    }),
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchRecomendationsList.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(
                fetchRecomendationsList.fulfilled,
                (
                    state,
                    action: PayloadAction<Article[]>,
                ) => {
                    state.isLoading = false;
                    articleDetailsPageRecommendationsAdapter.setAll(state, action.payload);
                },
            )
            .addCase(
                fetchRecomendationsList.rejected,
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

export const { reducer: articleDetailsPageRecommendationsReducer } = articleDetailsPageRecommendationsSlice;
