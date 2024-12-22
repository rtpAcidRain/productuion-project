import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { HTMLAttributeAnchorTarget, memo } from 'react';
import { Text, TextSize } from 'shared/ui/Text/Text';
import { Virtuoso, VirtuosoGrid } from 'react-virtuoso';
import cls from './ArticleList.module.scss';
import { Article } from '../../model/types/article';
import { ArticleVew } from '../../model/consts/articleConsts';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton';

interface ArticleListProps {
    className?: string,
    articles: Article[],
    view?: ArticleVew
    isLoading?: boolean,
    target?: HTMLAttributeAnchorTarget
    scrollElement?: HTMLElement,
    isNormalazed?: boolean,
    endReached?: () => void,
}

export const ArticleList = memo(
    (props: ArticleListProps) => {
        const {
            className,
            articles,
            view = ArticleVew.SMALL,
            isLoading,
            target,
            scrollElement,
            isNormalazed,
            endReached,
        } = props;

        const { t } = useTranslation();

        const renterArticle = (_:any, article: Article) => (
            <ArticleListItem
                key={article.id}
                article={article}
                view={view}
                className={cls.card}
                target={target}
            />
        );

        if (!isLoading && !articles.length) {
            return (
                <div className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
                    <Text size={TextSize.L} title={t('Статьи не найдены')} />
                </div>
            );
        }

        return (

            <div className={classNames(cls.ArticleList, { [cls.grid]: !isNormalazed }, [className, cls[view]])}>
                {isNormalazed
                    && (view === ArticleVew.BIG ? (
                        <Virtuoso
                            customScrollParent={scrollElement}
                            data={articles}
                            itemContent={renterArticle}
                            endReached={endReached}
                        />
                    ) : (
                        <VirtuosoGrid
                            customScrollParent={scrollElement}
                            data={articles}
                            itemContent={renterArticle}
                            endReached={endReached}
                        />
                    ))}
                {
                    !isNormalazed && (
                        articles.length > 0
                            ? articles.map((el, ind) => renterArticle(ind, el))
                            : null
                    )
                }
                {

                    isLoading
                        && (
                            <div className={classNames(cls.ArticleList, {}, [className, cls[view], cls.grid])}>
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
