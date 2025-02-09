import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Avatar } from '@/shared/ui/Avatar';
import { Dropdown } from '@/shared/ui/Popups';
import {
    User, userActions, isUserAdmin, isUserManager,
} from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getRouteAdmin, getRouteProfile } from '@/shared/const/router';

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
                        href: getRouteAdmin(),
                    }] : []),
                    {
                        content: t('Профиль'),
                        href: getRouteProfile(authData.id),
                    },
                    {
                        content: t('Выйти'),
                        onClick: onLogOut,
                    },
                ]}
                trigger={<Avatar size={30} src={authData.avatar} fallbackInverted />}
            />
        );
    },
);
