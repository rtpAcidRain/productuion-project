import { CSSProperties, memo, useMemo } from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import cls from './Avatar.module.scss';
import { AppImage } from '../AppImage';
import { Sceleton } from '../Sceleton';
import UserIcon from '../../assets/icons/user-filled.svg';
import { Icon } from '../Icon';

interface AvatarProps {
    className?: string;
    src?: string;
    size?: number,
    alt?: string,
    fallbackInverted?: boolean
}

export const Avatar = memo(
    (props: AvatarProps) => {
        const {
            src,
            alt = '',
            className,
            size = 100,
            fallbackInverted,
            ...otherProps
        } = props;

        const styles = useMemo<CSSProperties>(() => ({
            width: size,
            height: size,
        }), [size]);

        const mods: Mods = {};

        const fallback = <Sceleton width={size} height={size} border="50%" />;
        const errorFallback = <Icon width={size} height={size} Svg={UserIcon} inverted={fallbackInverted} />;

        return (
            <AppImage
                className={classNames(cls.avatar, mods, [className])}
                style={styles}
                src={src}
                alt={alt}
                fallback={fallback}
                errorFallback={errorFallback}
                {...otherProps}
            />
        );
    },
);
