import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { RoutePath } from '@/shared/config/routeConfig/routeConfig';
import { Avatar } from '@/shared/ui/Avatar/Avatar';
import { Dropdown } from '@/shared/ui/Popups';
import {
    User, userActions, isUserAdmin, isUserManager,
} from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

interface AvatarDropdownProps {
    className?: string,
    authData: User
}

export const AvatarDropdown = memo(
    (props: AvatarDropdownProps) => {
        const {
            className,
            authData,
        } = props;
        const isAdmin = useSelector(isUserAdmin);
        const isManager = useSelector(isUserManager);
        const isAdminPanelAvailible = isAdmin || isManager;

        const { t } = useTranslation();
        const dispatch = useAppDispatch();

        const onLogOut = useCallback(() => {
            dispatch(userActions.logout());
        }, [dispatch]);

        return (
            <Dropdown
                className={className}
                direction="right"
                items={[
                    ...(isAdminPanelAvailible ? [{
                        content: t('Админка'),
                        href: RoutePath.admin_panel,
                    }] : []),
                    {
                        content: t('Профиль'),
                        href: RoutePath.profile + authData.id,
                    },
                    {
                        content: t('Выйти'),
                        onClick: onLogOut,
                    },
                ]}
                trigger={<Avatar size={30} src={authData.avatar} />}
            />
        );
    },
);
