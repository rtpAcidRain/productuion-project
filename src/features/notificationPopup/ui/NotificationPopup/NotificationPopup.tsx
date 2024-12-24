import { NotificationList } from 'entities/Notifications';
import { memo, useCallback, useState } from 'react';
import NotificationIcon from 'shared/assets/icons/notification-20-20.svg';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Icon } from 'shared/ui/Icon/Icon';
import { Popover } from 'shared/ui/Popups';
import { Drawer } from 'shared/ui/Drawer/Drawer';
import { BrowserView, MobileView } from 'react-device-detect';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './NotificationPopup.module.scss';

interface NotificationPopupProps {
    className?: string,
}

export const NotificationPopup = memo(
    (props: NotificationPopupProps) => {
        const { className } = props;

        const [isDrawerOpen, setIsDrawerOpen] = useState(false);

        const toggleDrawer = useCallback(() => {
            setIsDrawerOpen((prev) => !prev);
        }, []);

        const trigger = (
            <Button onClick={toggleDrawer} theme={ButtonTheme.CLEAR}>
                <Icon Svg={NotificationIcon} inverted />
            </Button>
        );

        return (
            <>
                <BrowserView>
                    <Popover
                        direction="right"
                        className={className}
                        trigger={trigger}
                    >
                        <NotificationList className={cls.notifications} />
                    </Popover>
                </BrowserView>
                <MobileView>
                    {trigger}
                    <Drawer isOpen={isDrawerOpen} onClose={toggleDrawer}>
                        <NotificationList className={classNames(cls.notifications, {}, [cls.mobile])} />
                    </Drawer>
                </MobileView>
            </>
        );
    },
);
