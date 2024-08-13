import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { Text } from 'shared/ui/Text/Text';
import cls from './CommentList.module.scss';
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
        return (
            <div className={classNames(cls.CommentList, {}, [className])}>
                {comments?.length ? comments.map((comment) => (
                    <CommentCard key={comment.id} className={cls.comment} comment={comment} isLoading={isLoading} />
                )) : <Text text={t('Нет комментариев')} />}
            </div>
        );
    },
);
