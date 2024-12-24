import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { SortOrder } from '@/shared/types';
import { ArticleSortField, ArticleType } from '@/entities/Article';
import {
    getArticlesPageInited,
} from '../../selectors/articlesPageSelectors';
import { articlesPageActions } from '../../slice/articlesPageSlice';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';

export const initArticlesPage = createAsyncThunk<
    void,
    URLSearchParams,
    ThunkConfig<string>
>(
    'articlesPage/initArticlesPage',
    async (
        searchParams,
        thunkAPI,
    ) => {
        const {
            getState, dispatch,
        } = thunkAPI;
        const inited = getArticlesPageInited(getState());

        if (!inited) {
            const orderFormUrl = searchParams.get('order') as SortOrder;
            const sortFormUrl = searchParams.get('sort') as ArticleSortField;
            const searchFormUrl = searchParams.get('search');
            const articleTypeFormUrl = searchParams.get('type') as ArticleType;

            if (orderFormUrl) {
                dispatch(articlesPageActions.setOrder(orderFormUrl));
            }

            if (sortFormUrl) {
                dispatch(articlesPageActions.setSort(sortFormUrl));
            }

            if (searchFormUrl) {
                dispatch(articlesPageActions.setSearch(searchFormUrl));
            }

            if (articleTypeFormUrl) {
                dispatch(articlesPageActions.setType(articleTypeFormUrl));
            }

            dispatch(articlesPageActions.initState());
            dispatch(fetchArticlesList({}));
        }
    },
);
