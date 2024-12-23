import { NotificationList } from 'entities/Notifications';
import { memo } from 'react';
import NotificationIcon from 'shared/assets/icons/notification-20-20.svg';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Icon } from 'shared/ui/Icon/Icon';
import { Popover } from 'shared/ui/Popups';
import cls from './NotificationPopup.module.scss';

interface NotificationPopupProps {
    className?: string,
}

export const NotificationPopup = memo(
    (props: NotificationPopupProps) => {
        const { className } = props;
        return (
            <Popover
                direction="right"
                className={className}
                trigger={(
                    <Button theme={ButtonTheme.CLEAR}>
                        <Icon Svg={NotificationIcon} inverted />
                    </Button>
                )}
            >
                <NotificationList className={cls.notifications} />
            </Popover>
        );
    },
);
