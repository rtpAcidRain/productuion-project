import { createSelector } from '@reduxjs/toolkit';
import AboutIcon from '@/shared/assets/icons/aboutIc.svg';
import MainIcon from '@/shared/assets/icons/mainIc.svg';
import ArticlesIcon from '@/shared/assets/icons/article-20-20.svg';
import { getUserAuthData } from '@/entities/User';
import { SidebarItemType } from '../types/sidebar';
import { getRouteAbout, getRouteArticles, getRouteMain } from '@/shared/const/router';

export const getSidebarItems = createSelector(
    getUserAuthData,
    (userData) => {
        const sidebarItemsList: SidebarItemType[] = [
            {
                path: getRouteMain(),
                Icon: MainIcon,
                text: 'Главная',
            },
            {
                path: getRouteAbout(),
                Icon: AboutIcon,
                text: 'О нас',
            },

        ];

        if (userData) {
            sidebarItemsList.push(
                {
                    path: getRouteArticles(),
                    Icon: ArticlesIcon,
                    text: 'Статьи',
                    authOnly: true,
                },
            );
        }

        return sidebarItemsList;
    },
);
