import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Avatar } from '@/shared/ui/Avatar/Avatar';
import { Text } from '@/shared/ui/Text/Text';
import { Sceleton } from '@/shared/ui/Sceleton/Sceleton';
import { AppLink } from '@/shared/ui/AppLink/AppLink';
import { RoutePath } from '@/shared/const/router';
import { HStack, VStack } from '@/shared/ui/Stack';
import cls from './CommentCard.module.scss';
import { Comment } from '../../model/types/comment';

interface CommentCardProps {
    className?: string,
    comment?: Comment,
    isLoading?: boolean
}
export const CommentCard = memo(
    (props: CommentCardProps) => {
        const { className, comment, isLoading } = props;

        if (isLoading) {
            return (
                <VStack gap="8" align="start" className={classNames(cls.CommentCard, {}, [className, cls.loading])}>
                    <HStack gap="8">
                        <Sceleton width={30} height={30} border="50%" />
                        <Sceleton height={16} width={100} />
                    </HStack>
                    <Sceleton width="100%" height={50} />
                </VStack>
            );
        }

        if (!comment) {
            return null;
        }

        return (
            <VStack align="start" gap="8" className={classNames(cls.CommentCard, {}, [className])}>
                <AppLink to={`${RoutePath.profile}${comment.user.id}`}>
                    <HStack gap="8">
                        {comment.user.avatar && <Avatar size={30} src={comment.user.avatar} />}
                        <Text text={comment.user.username} />
                    </HStack>
                </AppLink>
                <Text text={comment.text} />
            </VStack>
        );
    },
);
