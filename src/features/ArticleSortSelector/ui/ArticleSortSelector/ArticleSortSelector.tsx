import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { SortOrder } from '@/shared/types';
import { Select, SelectOption } from '@/shared/ui/Select';
import cls from './ArticleSortSelector.module.scss';
import { ArticleSortField } from '@/entities/Article';

interface ArticleSortSelectorProps {
    className?: string,
    sort: ArticleSortField,
    order: SortOrder,
    onChangeOrder: (newOrder: SortOrder) => void,
    onChangeSort: (newSort: ArticleSortField) => void,
}

export const ArticleSortSelector = memo(
    (props: ArticleSortSelectorProps) => {
        const {
            className,
            sort,
            order,
            onChangeOrder,
            onChangeSort,
        } = props;

        const { t } = useTranslation();

        const orderOptions = useMemo<SelectOption<SortOrder>[]>(() => [
            {
                value: 'asc',
                content: t('Возраставнию'),
            },
            {
                value: 'desc',
                content: t('Убыванию'),
            },
        ], [t]);

        const sortFieldOptions = useMemo<SelectOption<ArticleSortField>[]>(() => [
            {
                value: ArticleSortField.CREATED,
                content: t('Дате создания'),
            },
            {
                value: ArticleSortField.TITLE,
                content: t('Названию'),
            },
            {
                value: ArticleSortField.VIEWS,
                content: t('Просмотрам'),
            },
        ], [t]);

        return (
            <div className={classNames(cls.ArticleSortSelector, {}, [className])}>
                <Select<ArticleSortField>
                    options={sortFieldOptions}
                    label={t('Сортировать по')}
                    value={sort}
                    onChange={onChangeSort}
                />
                <Select<SortOrder>
                    options={orderOptions}
                    label={t('по')}
                    value={order}
                    onChange={onChangeOrder}
                />

            </div>
        );
    },
);
