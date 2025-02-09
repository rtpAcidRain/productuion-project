import { EntityState } from '@reduxjs/toolkit';
import {
    Article, ArticleVew, ArticleSortField, ArticleType,
} from '@/entities/Article';
import { SortOrder } from '@/shared/types/sort';

export interface ArticlesPageSchema extends EntityState<Article> {
    isLoading?: boolean;
    error?: string;
    _inited: boolean;

    // pagination
    page: number;
    limit: number;
    hasMore: boolean;

    // filtres
    view: ArticleVew;
    order: SortOrder,
    sort: ArticleSortField,
    search: string
    type: ArticleType
}
