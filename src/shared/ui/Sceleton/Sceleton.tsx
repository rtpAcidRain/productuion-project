import { CSSProperties, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Sceleton.module.scss';

interface SceletonProps {
    className?: string,
    height?: string | number;
    width?: string | number,
    border?: string
}

export const Sceleton = memo((props: SceletonProps) => {
    const {
        className,
        height,
        width,
        border,
    } = props;

    const styles: CSSProperties = {
        width,
        height,
        borderRadius: border,
    };

    return (
        <div className={classNames(cls.sceleton, {}, [className])} style={styles} />
    );
});
