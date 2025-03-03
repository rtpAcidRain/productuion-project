import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { Text } from '@/shared/ui/Text';
import { VStack } from '@/shared/ui/Stack';
import { Comment } from '../../model/types/comment';
import { CommentCard } from '../CommentCard/CommentCard';

interface CommentListProps {
    className?: string,
    comments?: Comment[],
    isLoading?: boolean
}
export const CommentList = memo(
    (props: CommentListProps) => {
        const { className, comments, isLoading } = props;
        const { t } = useTranslation();

        if (isLoading) {
            return (
                <VStack gap="16" className={className}>
                    <CommentCard isLoading />
                    <CommentCard isLoading />
                    <CommentCard isLoading />
                </VStack>
            );
        }

        return (
            <VStack gap="16" className={className}>
                {comments?.length ? comments.map((comment) => (
                    <CommentCard key={comment.id} comment={comment} isLoading={isLoading} />
                )) : <Text text={t('Нет комментариев')} />}
            </VStack>
        );
    },
);
