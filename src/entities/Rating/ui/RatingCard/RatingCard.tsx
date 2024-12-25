import { useTranslation } from 'react-i18next';
import { memo, useCallback, useState } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './RatingCard.module.scss';
import { Card } from '@/shared/ui/Card/Card';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text/Text';
import { StarRating } from '@/shared/ui/StarRating/StarRating';
import { Modal } from '@/shared/ui/Modal/Modal';
import { Input } from '@/shared/ui/Input/Input';
import { Button, ButtonTheme } from '@/shared/ui/Button/Button';
import { Drawer } from '@/shared/ui/Drawer/Drawer';

interface RatingCardProps {
    className?: string;
    title?: string;
    feedbackTitle?: string;
    hasFeedback?: boolean;
    onCancel?: (starsCount: Number) => void;
    onAccept?: (starsCount: number, feedback?: string) => void;
}

export const RatingCard = memo((props: RatingCardProps) => {
    const {
        className,
        title,
        feedbackTitle,
        hasFeedback,
        onCancel,
        onAccept,
    } = props;
    const { t } = useTranslation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [starsCount, setStarsCount] = useState(0);
    const [feedback, setFeedback] = useState('');

    const toggleModal = useCallback(() => {
        setIsModalOpen((prev) => !prev);
    }, []);

    const onSelectStars = useCallback((selectedStars: number) => {
        setStarsCount(selectedStars);
        if (hasFeedback) {
            toggleModal();
        } else {
            onAccept?.(selectedStars);
        }
    }, [hasFeedback, onAccept, toggleModal]);

    const acceptHandle = useCallback(() => {
        toggleModal();
        onAccept?.(starsCount, feedback);
    }, [feedback, onAccept, starsCount, toggleModal]);

    const cancelHandle = useCallback(() => {
        toggleModal();
        onCancel?.(starsCount);
    }, [onCancel, starsCount, toggleModal]);

    const modalContent = (
        <VStack gap="32">
            <Text title={feedbackTitle} />
            <Input placeholder={t('Ваш отзыв')} />
            <HStack gap="16" justify="end">
                <Button theme={ButtonTheme.OUTLINERED} onClick={cancelHandle}>
                    {t('Закрыть')}
                </Button>
                <Button onClick={acceptHandle}>
                    {t('Отправить')}
                </Button>
            </HStack>
        </VStack>
    );

    return (
        <Card className={classNames(cls.RatingCard, {}, [className])}>
            <VStack gap="8">
                <Text title={title} />
                <StarRating size={40} onSelect={onSelectStars} />
            </VStack>
            <BrowserView><Modal isOpen={isModalOpen} lazy>{modalContent}</Modal></BrowserView>
            <MobileView><Drawer isOpen={isModalOpen} lazy onClose={cancelHandle}>{modalContent}</Drawer></MobileView>

        </Card>
    );
});
