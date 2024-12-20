import { rtkApi } from 'shared/api/rtkApi';

const recommendationsApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getArticleRecomendationsList: build.query({
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
