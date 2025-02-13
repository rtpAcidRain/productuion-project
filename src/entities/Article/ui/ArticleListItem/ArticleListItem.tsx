import { HTMLAttributeAnchorTarget, memo } from 'react';
import { useTranslation } from 'react-i18next';
import EyeIcon from '@/shared/assets/icons/eye-20-20.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import { AppLink } from '@/shared/ui/AppLink';
import { Avatar } from '@/shared/ui/Avatar';
import { Button, ButtonTheme } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card';
import { Icon } from '@/shared/ui/Icon';
import { Text } from '@/shared/ui/Text';
import { ArticleBlockType, ArticleVew } from '../../model/consts/articleConsts';
import {
    Article, ArticleTextBlock,
} from '../../model/types/article';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';
import cls from './ArticleListItem.module.scss';
import { getRouteArticle } from '@/shared/const/router';
import { AppImage } from '@/shared/ui/AppImage';
import { Sceleton } from '@/shared/ui/Sceleton';

interface ArticleListItemProps {
    className?: string,
    article: Article,
    view: ArticleVew,
    target?: HTMLAttributeAnchorTarget,
}

export const ArticleListItem = memo(
    (props: ArticleListItemProps) => {
        const {
            className,
            article,
            view,
            target,
        } = props;
        const { t } = useTranslation();

        const articleTypes = <Text text={article.type.join(', ')} className={cls.types} />;
        const articleVews = (
            <>
                <Text text={String(article.views)} className={cls.views} />
                <Icon Svg={EyeIcon} />
            </>
        );

        if (view === ArticleVew.BIG) {
            const textBlock = article.blocks.find((block) => block.type === ArticleBlockType.TEXT) as ArticleTextBlock;
            return (
                <div className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}>
                    <Card className={cls.card}>
                        <div className={cls.header}>
                            <Avatar size={30} src={article.user.avatar} />
                            <Text text={article.user.username} className={cls.username} />
                            <Text text={article.createdAt} className={cls.date} />
                        </div>
                        <Text title={article.title} className={cls.title} />
                        {articleTypes}
                        <AppImage
                            fallback={
                                <Sceleton width="100%" height={250} />
                            }
                            src={article.img}
                            className={cls.img}
                            alt={article.title}
                        />
                        {textBlock && (
                            <ArticleTextBlockComponent block={textBlock} className={cls.textBlock} />
                        )}
                        <div className={cls.footer}>
                            <AppLink to={getRouteArticle(article.id)} target={target}>
                                <Button theme={ButtonTheme.OUTLINE}>
                                    {t('Читать далее...')}
                                </Button>
                            </AppLink>
                            {articleVews}
                        </div>
                    </Card>
                </div>
            );
        }

        return (
            <AppLink
                to={getRouteArticle(article.id)}
                target={target}
                className={
                    classNames(
                        cls.ArticleListItem,
                        {},
                        [className, cls[view]],
                    )
                }
            >
                <Card className={cls.card}>
                    <div className={cls.imageWrapper}>
                        <AppImage
                            fallback={
                                <Sceleton width={200} height={200} />
                            }
                            src={article.img}
                            className={cls.img}
                            alt={article.title}
                        />
                        <Text text={article.createdAt} className={cls.date} />
                    </div>
                    <div className={cls.infoWrapper}>
                        {articleTypes}
                        {articleVews}
                    </div>
                    <Text text={article.title} className={cls.title} />
                </Card>
            </AppLink>
        );
    },
);
