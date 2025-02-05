import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { useArticleRecomendationsList } from '../../api/articleRecomendationsListApi';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text, TextSize } from '@/shared/ui/Text';
import { ArticleList } from '@/entities/Article';
import { VStack } from '@/shared/ui/Stack';

interface ArticleRecomendationsListProps {
    className?: string;
}

export const ArticleRecomendationsList = memo((props: ArticleRecomendationsListProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const { isLoading, data: articles, error } = useArticleRecomendationsList(3);

    if (isLoading || error || !articles) {
        return null;
    }

    return (
        <VStack gap="16" align="start" className={classNames('', {}, [className])}>
            <Text size={TextSize.L} title={t('Другие статьи')} />
            <ArticleList
                articles={articles}
                target="_blank"
            />
        </VStack>
    );
});
