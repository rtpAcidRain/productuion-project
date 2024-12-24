import { memo, VFC } from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import cls from './Icon.module.scss';

interface IconProps {
    className?: string;
    Svg: VFC<React.SVGProps<SVGSVGElement>>
    inverted?: boolean;
}

export const Icon = memo(
    (props: IconProps) => {
        const {
            className,
            Svg,
            inverted = false,
        } = props;

        const mods: Mods = {
            [cls.primary]: !inverted,
            [cls.inverted]: inverted,
        };

        return (
            <Svg
                className={classNames('', mods, [className])}
            />
        );
    },
);
