import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import {
    ArticleSortField,
    ArticleSortSelector,
    ArticleType,
    ArticleTypeTabs,
    ArticleVew, ArticleViewToggler,
} from '@/entities/Article';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useDebounce } from '@/shared/lib/hooks/useDebounce/useDebounce';
import { SortOrder } from '@/shared/types';
import { Card } from '@/shared/ui/Card';
import { Input } from '@/shared/ui/Input';
import {
    getArticlesPageOrder,
    getArticlesPageSearch,
    getArticlesPageSort,
    getArticlesPageType,
} from '../../model/selectors/articlesPageSelectors';
import { fetchArticlesList } from '../../model/services/fetchArticlesList/fetchArticlesList';
import { articlesPageActions } from '../../model/slice/articlesPageSlice';
import cls from './ArticlesPageFilter.module.scss';

interface ArticlesPageFilterProps {
    className?: string,
    view: ArticleVew
}

export const ArticlesPageFilter = memo(
    (props: ArticlesPageFilterProps) => {
        const {
            className,
            view,
        } = props;
        const { t } = useTranslation();
        const dispatch = useAppDispatch();
        const sort = useSelector(getArticlesPageSort);
        const order = useSelector(getArticlesPageOrder);
        const search = useSelector(getArticlesPageSearch);
        const typeValue = useSelector(getArticlesPageType);

        const fetchData = useCallback(() => {
            dispatch(fetchArticlesList({ replace: true }));
        }, [dispatch]);

        const debounsedFetch = useDebounce(fetchData, 500);

        const onChangeView = useCallback((view: ArticleVew) => {
            dispatch(articlesPageActions.setView(view));
        }, [dispatch]);

        const onChangeSort = useCallback((newSort: ArticleSortField) => {
            dispatch(articlesPageActions.setSort(newSort));
            dispatch(articlesPageActions.setPage(1));
            fetchData();
        }, [dispatch, fetchData]);

        const onChangeOrder = useCallback((newOrder: SortOrder) => {
            dispatch(articlesPageActions.setOrder(newOrder));
            dispatch(articlesPageActions.setPage(1));
            fetchData();
        }, [dispatch, fetchData]);

        const onChangeSearch = useCallback((search: string) => {
            dispatch(articlesPageActions.setSearch(search));
            dispatch(articlesPageActions.setPage(1));
            debounsedFetch();
        }, [dispatch, debounsedFetch]);

        const onChangeType = useCallback((value: ArticleType) => {
            dispatch(articlesPageActions.setType(value));
            dispatch(articlesPageActions.setPage(1));
            fetchData();
        }, [dispatch, fetchData]);

        return (
            <div className={classNames('', {}, [className])}>
                <div className={cls.sortWrappper}>
                    <ArticleSortSelector
                        order={order}
                        sort={sort}
                        onChangeOrder={onChangeOrder}
                        onChangeSort={onChangeSort}
                    />
                    <ArticleViewToggler view={view} onViewClick={onChangeView} />
                </div>
                <Card>
                    <Input value={search} onChange={onChangeSearch} placeholder={`${t('Поиск')}...`} />
                </Card>
                <ArticleTypeTabs
                    value={typeValue}
                    className={cls.tabs}
                    onChange={onChangeType}
                />
            </div>
        );
    },
);
