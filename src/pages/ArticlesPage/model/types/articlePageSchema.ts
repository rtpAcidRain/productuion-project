import { EntityState } from '@reduxjs/toolkit';
import { Article, ArticleVew } from 'entities/Article';

export interface ArticlesPageSchema extends EntityState<Article> {
    isLoading?: boolean,
    error?: string,

    view: ArticleVew

    // pagination
    page: number;
    limit?: number;
    hasMore: boolean;

    _inited: boolean;
}
