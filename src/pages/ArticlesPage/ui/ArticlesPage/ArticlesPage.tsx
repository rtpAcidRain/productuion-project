import {
    MutableRefObject, memo,
    useRef,
} from 'react';
import { useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducerList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { Page } from 'widgets/Page/Page';
import {
    getArticlesPageView,
} from '../../model/selectors/articlesPageSelectors';
import { articlesPageReducer } from '../../model/slice/articlesPageSlice';
import { ArticlesPageFilter } from '../ArticlesPageFilter/ArticlesPageFilter';

import { ArticleInfiniteList } from '../ArticleInfiniteList/ArticleInfiniteList';
import cls from './ArticlesPage.module.scss';

interface ArticlesPageProps {
    className?: string,
}

const reducers: ReducerList = {
    articlesPage: articlesPageReducer,
};

const ArticlesPage = (props: ArticlesPageProps) => {
    const { className } = props;
    const view = useSelector(getArticlesPageView);
    const pageWrapperRef = useRef() as MutableRefObject<HTMLElement>;

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
            <div>
                <Page
                    innerRef={pageWrapperRef}
                    className={classNames('', {}, [className])}
                >
                    <ArticlesPageFilter view={view} />
                    <ArticleInfiniteList className={cls.ArticleList} pageWrapperRef={pageWrapperRef} view={view} />
                </Page>
            </div>
        </DynamicModuleLoader>

    );
};

export default memo(ArticlesPage);
