import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { memo, VFC } from 'react';
import cls from './Icon.module.scss';

interface IconProps {
    className?: string;
    Svg: VFC<React.SVGProps<SVGSVGElement>>
}

export const Icon = memo(
    (props: IconProps) => {
        const {
            className,
            Svg,
        } = props;

        const mods: Mods = {};

        return (
            <Svg
                className={classNames(cls.icon, mods, [className])}
            />
        );
    },
);
