import { useTranslation } from 'react-i18next';
import { memo, useCallback, useMemo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { TabItem, Tabs } from '@/shared/ui/Tabs';
import { ArticleType } from '@/entities/Article';

interface ArticleTypeTabsProps {
    className?: string,
    value: ArticleType,
    onChange: (type: ArticleType) => void
}

export const ArticleTypeTabs = memo(
    (props: ArticleTypeTabsProps) => {
        const {
            className,
            value,
            onChange,
        } = props;
        const { t } = useTranslation();

        const typeTabs = useMemo<TabItem[]>(() => [
            {
                value: ArticleType.ALL,
                content: t('Все'),
            },
            {
                value: ArticleType.IT,
                content: t('IT'),
            },
            {
                value: ArticleType.ECONOMICS,
                content: t('Экономика'),
            },
            {
                value: ArticleType.SCIENCE,
                content: t('Наука'),
            },
        ], [t]);

        const onChangeType = useCallback((tab: TabItem) => {
            onChange(tab.value as ArticleType);
        }, [onChange]);

        return (

            <Tabs
                tabs={typeTabs}
                value={value}
                className={classNames('', {}, [className])}
                onTabClick={onChangeType}
            />
        );
    },
);
