import { createSelector } from '@reduxjs/toolkit';
import { RoutePath } from '@/shared/config/routeConfig/routeConfig';
import AboutIcon from '@/shared/assets/icons/aboutIc.svg';
import MainIcon from '@/shared/assets/icons/mainIc.svg';
import ProfileIcon from '@/shared/assets/icons/profile-20-20.svg';
import ArticlesIcon from '@/shared/assets/icons/article-20-20.svg';
import { getUserAuthData } from '@/entities/User';
import { SidebarItemType } from '../types/sidebar';

export const getSidebarItems = createSelector(
    getUserAuthData,
    (userData) => {
        const sidebarItemsList: SidebarItemType[] = [
            {
                path: RoutePath.main,
                Icon: MainIcon,
                text: 'Главная',
            },
            {
                path: RoutePath.about,
                Icon: AboutIcon,
                text: 'О нас',
            },

        ];

        if (userData) {
            sidebarItemsList.push(
                {
                    path: RoutePath.articles,
                    Icon: ArticlesIcon,
                    text: 'Статьи',
                    authOnly: true,
                },
            );
        }

        return sidebarItemsList;
    },
);
