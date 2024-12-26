import {
    MutableRefObject,
    memo, useCallback,
} from 'react';
import { useSelector } from 'react-redux';
import { ArticleList, ArticleVew } from '@/entities/Article';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getArticlesPageError, getArticlesPageIsLoading } from '../../model/selectors/articlesPageSelectors';
import { fetchNextArticlesPage } from '../../model/services/fetchNextArticlesPage/fetchNextArticlesPage';
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
        const dispatch = useAppDispatch();

        const onLoadNextPart = useCallback(() => {
            dispatch(fetchNextArticlesPage());
            if (error) {
                console.log('Alarm: ', error);
            }
        }, [dispatch, error]);

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
