import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import {
    getUserAuthData,
} from '@/entities/User';
import { LoginModal } from '@/features/AuthByUsername';
import { AvatarDropdown } from '@/features/avatarDropdown';
import { NotificationPopup } from '@/features/notificationPopup';
import { classNames } from '@/shared/lib/classNames/classNames';
import { AppLink, AppLinkTheme } from '@/shared/ui/AppLink';
import { Button, ButtonTheme } from '@/shared/ui/Button';
import { HStack } from '@/shared/ui/Stack';
import { Text, TextTheme } from '@/shared/ui/Text';
import cls from './Navbar.module.scss';
import { getRouteArticleNew } from '@/shared/const/router';

interface NavbarProps {
    className?: string;
}

export const Navbar = memo(({ className }: NavbarProps) => {
    const { t } = useTranslation();
    const [isAuthModal, setIsAuthModal] = useState(false);
    const authData = useSelector(getUserAuthData);

    const onToggleModal = useCallback(() => {
        setIsAuthModal((prev) => !prev);
    }, []);

    if (authData) {
        return (
            <header className={classNames(cls.Navbar, {}, [className])}>
                <Text className={cls.appName} theme={TextTheme.INVERTED} title={t('Acid App')} />
                <AppLink theme={AppLinkTheme.SECONDARY} to={getRouteArticleNew()} className={cls.createBtn}>
                    {t('Создать статью')}
                </AppLink>
                <HStack gap="16" className={cls.actions} max={false}>
                    <NotificationPopup />
                    <AvatarDropdown authData={authData} />
                </HStack>
            </header>
        );
    }

    return (
        <header className={classNames(cls.Navbar, {}, [className])}>
            <Button
                theme={ButtonTheme.CLEAR_INVERTED}
                className={cls.links}
                onClick={onToggleModal}
            >
                {t('Войти')}
            </Button>
            {isAuthModal && (
                <LoginModal
                    isOpen={isAuthModal}
                    onClose={onToggleModal}
                />
            )}
        </header>
    );
});
