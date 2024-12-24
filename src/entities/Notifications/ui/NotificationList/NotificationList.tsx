import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { VStack } from '@/shared/ui/Stack';
import { Sceleton } from '@/shared/ui/Sceleton/Sceleton';
import { Text } from '@/shared/ui/Text/Text';
import { useNotifications } from '../../api/notificationApi';
import { NotificationItem } from '../NotificationItem/NotificationItem';

interface NotificationListProps {
    className?: string;
}

export const NotificationList = memo((props: NotificationListProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const { data, isLoading } = useNotifications(null, {
        pollingInterval: 10000,
    });

    if (isLoading) {
        return (
            <VStack
                gap="16"
                className={classNames('', {}, [className])}
            >
                <Sceleton width="100%" border="8px" height="80px" />
                <Sceleton width="100%" border="8px" height="80px" />
                <Sceleton width="100%" border="8px" height="80px" />
            </VStack>
        );
    }

    if (!data) {
        return (
            <div className={className}>
                <Text title={t('Уведомлений нет')} />
            </div>
        );
    }

    return (
        <VStack
            gap="16"
            className={classNames('', {}, [className])}
        >
            {data?.map((item) => (
                <NotificationItem key={item.id} item={item} />
            ))}
        </VStack>
    );
});
