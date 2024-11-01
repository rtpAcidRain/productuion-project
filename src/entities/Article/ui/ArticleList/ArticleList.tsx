import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import cls from './ArticleList.module.scss';
import { Article, ArticleVew } from '../../model/types/article';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton';

interface ArticleListProps {
    className?: string,
    articles: Article[],
    view?: ArticleVew
    isLoading?: boolean,
}

export const ArticleList = memo(
    (props: ArticleListProps) => {
        const {
            className,
            articles,
            view = ArticleVew.SMALL,
            isLoading,
        } = props;

        const { t } = useTranslation();

        function renterArticle(article: Article) {
            return (
                <ArticleListItem
                    key={article.id}
                    article={article}
                    view={view}
                    className={cls.card}
                />
            );
        }

        return (
            <div className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
                {
                    articles.length > 0
                        ? articles.map(renterArticle)
                        : null
                }
                {
                    isLoading
                    && (
                        <div className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
                            {
                                new Array(view === ArticleVew.SMALL ? 9 : 3)
                                    .fill(0)
                                    .map((_, index) => (
                                        // eslint-disable-next-line
                                <ArticleListItemSkeleton className={cls.card} key={index} view={view} />
                                    ))
                            }
                        </div>
                    )
                }
            </div>
        );
    },
);
