import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import EyeIcon from 'shared/assets/icons/eye-20-20.svg';
import { classNames } from 'shared/lib/classNames/classNames';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Card } from 'shared/ui/Card/Card';
import { Icon } from 'shared/ui/Icon/Icon';
import { Text } from 'shared/ui/Text/Text';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import {
    Article, ArticleBlockType, ArticleTextBlock, ArticleVew,
} from '../../model/types/article';
import cls from './ArticleListItem.module.scss';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';

interface ArticleListItemProps {
    className?: string,
    article: Article,
    view: ArticleVew
}

export const ArticleListItem = memo(
    (props: ArticleListItemProps) => {
        const {
            className,
            article,
            view,
        } = props;
        const { t } = useTranslation();
        const navigate = useNavigate();
        const onOpenArticle = useCallback(() => {
            navigate(RoutePath.article_details + article.id);
        }, [article.id, navigate]);

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
                        <img src={article.img} className={cls.img} alt={article.title} />
                        {textBlock && (
                            <ArticleTextBlockComponent block={textBlock} className={cls.textBlock} />
                        )}
                        <div className={cls.footer}>
                            <Button theme={ButtonTheme.OUTLINE} onClick={onOpenArticle}>
                                {t('Читать далее...')}
                            </Button>
                            {articleVews}
                        </div>
                    </Card>
                </div>
            );
        }

        return (
            <div className={classNames(cls.ArticleListItem, {}, [className, cls[view]])} onClick={onOpenArticle}>
                <Card className={cls.card}>
                    <div className={cls.imageWrapper}>
                        <img src={article.img} className={cls.img} alt={article.title} />
                        <Text text={article.createdAt} className={cls.date} />
                    </div>
                    <div className={cls.infoWrapper}>
                        {articleTypes}
                        {articleVews}
                    </div>
                    <Text text={article.title} className={cls.title} />
                </Card>
            </div>
        );
    },
);
