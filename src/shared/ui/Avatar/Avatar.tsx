import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { CSSProperties, memo, useMemo } from 'react';
import cls from './Avatar.module.scss';

interface AvatarProps {
    className?: string;
    src?: string;
    size?: number,
    alt?: string
}

export const Avatar = memo(
    (props: AvatarProps) => {
        const {
            src,
            alt = '',
            className,
            size,
            ...otherProps
        } = props;

        const styles = useMemo<CSSProperties>(() => ({
            width: size || 100,
            height: size || 100,
        }), [size]);

        const mods: Mods = {};

        return (
            <img
                className={classNames(cls.avatar, mods, [className])}
                style={styles}
                src={src}
                alt={alt}
                {...otherProps}
            />
        );
    },
);
