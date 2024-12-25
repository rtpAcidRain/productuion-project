import { Rating } from '@/features/ArticleRating';
import { rtkApi } from '@/shared/api/rtkApi';

interface GetArticleArg { userId: string, articleId: string }

interface RateArticleArg extends GetArticleArg {
    rate: number,
    feedback?: string
}

const articleRatingApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getArticleRating: build.query<Rating[], GetArticleArg>({
            query: ({
                userId,
                articleId,
            }) => ({
                url: '/article-ratings',
                params: {
                    userId,
                    articleId,
                },
            }),
        }),
        rateArticle: build.mutation<void, RateArticleArg>({
            query: (arg) => ({
                url: '/article-ratings',
                method: 'POST',
                body: arg,
            }),
        }),
    }),
    overrideExisting: false,
});

export const useGetArticleRating = articleRatingApi.useGetArticleRatingQuery;
export const usSetArticleRating = articleRatingApi.useRateArticleMutation;
