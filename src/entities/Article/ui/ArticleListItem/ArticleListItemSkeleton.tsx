import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Card } from '@/shared/ui/Card';
import { Sceleton } from '@/shared/ui/Sceleton';
import { ArticleVew } from '../../model/consts/articleConsts';
import cls from './ArticleListItem.module.scss';

interface ArticleListItemSkeletonProps {
    className?: string,
    view: ArticleVew
}

export const ArticleListItemSkeleton = memo(
    (props: ArticleListItemSkeletonProps) => {
        const {
            className,
            view,
        } = props;

        if (view === ArticleVew.BIG) {
            return (
                <div className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}>
                    <Card className={cls.card}>
                        <div className={cls.header}>
                            <Sceleton border="50%" width={30} height={30} />
                            <Sceleton width={150} height={16} className={cls.username} />
                            <Sceleton className={cls.date} width={150} height={16} />
                        </div>
                        <Sceleton width={250} height={24} className={cls.title} />
                        <Sceleton className={cls.img} height={200} />
                        <div className={cls.footer}>
                            <Sceleton width={200} height={36} />
                        </div>
                    </Card>
                </div>
            );
        }

        return (
            <div className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}>
                <Card className={cls.card}>
                    <div className={cls.imageWrapper}>
                        <Sceleton width={200} height={200} className={cls.img} />
                    </div>
                    <div className={cls.infoWrapper}>
                        <Sceleton width={130} height={16} />
                    </div>
                    <Sceleton width={150} height={16} className={cls.title} />
                </Card>
            </div>
        );
    },
);
