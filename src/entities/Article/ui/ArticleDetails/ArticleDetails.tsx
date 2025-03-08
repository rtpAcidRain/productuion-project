import { useTranslation } from 'react-i18next';
import { memo, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { DynamicModuleLoader, ReducerList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Text, TextAlign, TextSize } from '@/shared/ui/Text';
import { Sceleton } from '@/shared/ui/Sceleton';
import { Avatar } from '@/shared/ui/Avatar';
import EyeIcon from '@/shared/assets/icons/eye-20-20.svg';
import CalendarIcon from '@/shared/assets/icons/calendar-20-20.svg';
import { Icon } from '@/shared/ui/Icon';
import { HStack, VStack } from '@/shared/ui/Stack';
import { ArticleBlockType } from '../../model/consts/articleConsts';
import { ArticleCodeBlockComponent } from '../ArticleCodeBlockComponent/ArticleCodeBlockComponent';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';
import {
    getArticleDetailsData,
    getArticleDetailsError,
    getArticleDetailsIsLoading,
} from '../../model/selectors/articleDetails';
import { articleDetailsReducer } from '../../model/slice/articleDetailsSlice';
import cls from './ArticleDetails.module.scss';
import { fetchArticleById } from '../../model/services/fetchArticleById/fetchArticleById';
import { ArticleBlock } from '../../model/types/article';
import { ArticleImageBlockComponent } from '../ArticleImageBlockComponent/ArticleImageBlockComponent';

interface ArticleDetailsProps {
    className?: string,
    id: string;
}

const reducers: ReducerList = {
    articleDetails: articleDetailsReducer,
};

export const ArticleDetails = memo((props: ArticleDetailsProps) => {
    const { className, id } = props;
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const isLoading = useSelector(getArticleDetailsIsLoading);
    const article = useSelector(getArticleDetailsData);
    const error = useSelector(getArticleDetailsError);

    const renderBlock = useCallback((block: ArticleBlock) => {
        switch (block.type) {
        case ArticleBlockType.CODE:
            return <ArticleCodeBlockComponent key={block.id} block={block} className={cls.block} />;
        case ArticleBlockType.IMAGE:
            return <ArticleImageBlockComponent key={block.id} block={block} className={cls.block} />;
        case ArticleBlockType.TEXT:
            return <ArticleTextBlockComponent key={block.id} className={cls.block} block={block} />;

        default:
            return null;
        }
    }, []);

    useEffect(() => {
        if (__PROJECT__ !== 'storybook') {
            dispatch(fetchArticleById(id));
        }
    }, [dispatch, id]);

    let content;

    if (isLoading) {
        content = (
            <VStack gap="16">
                <Sceleton className={cls.avatar} width={200} height={200} border="50%" />
                <Sceleton className={cls.title} width={300} height={32} />
                <Sceleton className={cls.sceleton} width={600} height={24} />
                <Sceleton className={cls.sceleton} width="100%" height={200} />
                <Sceleton className={cls.sceleton} width="100%" height={200} />
            </VStack>
        );
    }

    if (error) {
        content = (
            <Text
                data-testid="ArticleDetails.Error"
                align={TextAlign.CENTER}
                title={t('Произошла ошибка при загрузке статьи.')}
            />
        );
    }

    if (article) {
        content = (
            <div data-testid="ArticleDetails.Success">
                <HStack justify="center">
                    <Avatar
                        size={200}
                        src={article.img}
                        className={cls.avatar}
                    />
                </HStack>
                <VStack gap="4" align="start">
                    <Text
                        className={cls.title}
                        title={article.title}
                        text={article.subtitle}
                        size={TextSize.L}
                    />
                    <HStack align="start" gap="8">
                        <Icon Svg={EyeIcon} />
                        <Text text={String(article.views)} />
                    </HStack>

                    <HStack align="start" gap="8">
                        <Icon Svg={CalendarIcon} />
                        <Text text={article.createdAt} />
                    </HStack>
                </VStack>
                {article.blocks.map(renderBlock)}
            </div>
        );
    }

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <VStack gap="16" className={className}>
                {content}
            </VStack>
        </DynamicModuleLoader>
    );
});
