import {
    ArticleList,
} from 'entities/Article';
import {
    MutableRefObject, memo, useCallback, useRef,
} from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducerList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffects } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { Page } from 'widgets/Page/Page';
import { useSearchParams } from 'react-router-dom';
import { fetchNextArticlesPage } from '../../model/services/fetchNextArticlesPage/fetchNextArticlesPage';
import {
    getArticlesPageError,
    getArticlesPageIsLoading,
    getArticlesPageView,
} from '../../model/selectors/articlesPageSelectors';
import { initArticlesPage } from '../../model/services/initArticlesPage/initArticlesPage';
import { articlesPageReducer, getArticles } from '../../model/slice/articlesPageSlice';
import { ArticlesPageFilter } from '../ArticlesPageFilter/ArticlesPageFilter';

import cls from './ArticlesPage.module.scss';

interface ArticlesPageProps {
    className?: string,
}

const reducers: ReducerList = {
    articlesPage: articlesPageReducer,
};

const ArticlesPage = (props: ArticlesPageProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const articles = useSelector(getArticles.selectAll);
    const isLoading = useSelector(getArticlesPageIsLoading);
    const view = useSelector(getArticlesPageView);
    const error = useSelector(getArticlesPageError);
    const [searchParams] = useSearchParams();
    const pageWrapperRef = useRef() as MutableRefObject<HTMLElement>;

    const onLoadNextPart = useCallback(() => {
        dispatch(fetchNextArticlesPage());
        if (error) {
            console.log('Alarm: ', error);
        }
    }, [dispatch, error]);

    useInitialEffects(() => {
        dispatch(initArticlesPage(searchParams));
    });

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
            <div>
                <Page
                    innerRef={pageWrapperRef}
                    className={classNames('', {}, [className])}
                >
                    <ArticlesPageFilter view={view} />
                    <ArticleList
                        className={cls.ArticleList}
                        isLoading={isLoading}
                        view={view}
                        articles={
                            articles
                        }
                        isNormalazed
                        endReached={onLoadNextPart}
                        scrollElement={pageWrapperRef.current}
                    />
                </Page>
            </div>
        </DynamicModuleLoader>

    );
};

export default memo(ArticlesPage);
