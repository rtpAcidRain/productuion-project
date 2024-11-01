import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Text } from 'shared/ui/Text/Text';
import { Sceleton } from 'shared/ui/Sceleton/Sceleton';
import { AppLink } from 'shared/ui/AppLink/AppLink';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
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
                <div className={classNames(cls.CommentCard, {}, [className, cls.loading])}>
                    <div className={cls.header}>
                        <Sceleton className={cls.avatar} width={30} height={30} border="50%" />
                        <Sceleton className={cls.username} height={16} width={100} />
                    </div>
                    <Sceleton className={cls.text} width="100%" height={50} />
                </div>
            );
        }

        if (!comment) {
            return null;
        }

        return (
            <div className={classNames(cls.CommentCard, {}, [className])}>
                <AppLink to={`${RoutePath.profile}${comment.user.id}`} className={cls.header}>
                    {comment.user.avatar && <Avatar className={cls.avatar} size={30} src={comment.user.avatar} />}
                    <Text className={cls.username} text={comment.user.username} />
                </AppLink>
                <Text className={cls.text} text={comment.text} />
            </div>
        );
    },
);