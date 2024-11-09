import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { HTMLAttributeAnchorTarget, memo } from 'react';
import { Text, TextSize } from 'shared/ui/Text/Text';
import cls from './ArticleList.module.scss';
import { Article, ArticleVew } from '../../model/types/article';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton';

interface ArticleListProps {
    className?: string,
    articles: Article[],
    view?: ArticleVew
    isLoading?: boolean,
    target?: HTMLAttributeAnchorTarget
}

export const ArticleList = memo(
    (props: ArticleListProps) => {
        const {
            className,
            articles,
            view = ArticleVew.SMALL,
            isLoading,
            target,
        } = props;

        const { t } = useTranslation();

        function renterArticle(article: Article) {
            return (
                <ArticleListItem
                    key={article.id}
                    article={article}
                    view={view}
                    className={cls.card}
                    target={target}
                />
            );
        }

        if (!isLoading && !articles.length) {
            return (
                <div className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
                    <Text size={TextSize.L} title={t('Статьи не найдены')} />
                </div>
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
