import { ArticleList, ArticleVew } from 'entities/Article';
import {
    MutableRefObject,
    memo, useCallback,
} from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffects } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { getArticlesPageError, getArticlesPageIsLoading } from '../../model/selectors/articlesPageSelectors';
import { fetchNextArticlesPage } from '../../model/services/fetchNextArticlesPage/fetchNextArticlesPage';
import { initArticlesPage } from '../../model/services/initArticlesPage/initArticlesPage';
import { getArticles } from '../../model/slice/articlesPageSlice';

interface ArticleInfiniteListProps {
    className?: string,
    view: ArticleVew
    pageWrapperRef: MutableRefObject<HTMLElement>
}

export const ArticleInfiniteList = memo(
    (props: ArticleInfiniteListProps) => {
        const {
            className,
            view,
            pageWrapperRef,
        } = props;
        const articles = useSelector(getArticles.selectAll);
        const isLoading = useSelector(getArticlesPageIsLoading);
        const error = useSelector(getArticlesPageError);
        const [searchParams] = useSearchParams();
        const dispatch = useAppDispatch();

        const onLoadNextPart = useCallback(() => {
            dispatch(fetchNextArticlesPage());
            if (error) {
                console.log('Alarm: ', error);
            }
        }, [dispatch, error]);

        // useInitialEffects(() => {
        //     dispatch(initArticlesPage(searchParams));
        // });

        return (
            <ArticleList
                className={className}
                isLoading={isLoading}
                view={view}
                articles={
                    articles
                }
                isNormalazed
                endReached={onLoadNextPart}
                scrollElement={pageWrapperRef.current}
            />
        );
    },
);
