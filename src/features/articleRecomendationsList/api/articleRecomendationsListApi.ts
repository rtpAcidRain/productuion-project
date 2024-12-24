import { Article } from '@/entities/Article';
import { rtkApi } from '@/shared/api/rtkApi';

const recommendationsApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getArticleRecomendationsList: build.query<Article[], number>({
            query: (limit) => ({
                url: '/articles',
                params: {
                    _limit: limit,
                },
            }),
        }),
    }),
    overrideExisting: false,
});

export const useArticleRecomendationsList = recommendationsApi.useGetArticleRecomendationsListQuery;
