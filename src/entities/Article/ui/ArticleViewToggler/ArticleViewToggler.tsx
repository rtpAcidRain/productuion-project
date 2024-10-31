import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import ListIcon from 'shared/assets/icons/list-24-24.svg';
import TiledIcon from 'shared/assets/icons/tiled-24-24.svg';
import { Icon } from 'shared/ui/Icon/Icon';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { ArticleVew } from '../../model/types/article';
import cls from './ArticleViewToggler.module.scss';

interface ArticleViewTogglerProps {
    className?: string,
    view: ArticleVew,
    onViewClick?: (view: ArticleVew) => void
}

const viewTypes = [
    {
        view: ArticleVew.SMALL,
        icon: TiledIcon,
    },
    {
        view: ArticleVew.BIG,
        icon: ListIcon,
    },
];

export const ArticleViewToggler = memo(
    (props: ArticleViewTogglerProps) => {
        const {
            className,
            view,
            onViewClick,
        } = props;

        const onClick = (newView: ArticleVew) => () => {
            onViewClick?.(newView);
        };

        return (
            <div className={classNames(cls.ArticleViewToggler, {}, [className])}>
                {viewTypes.map((viewType) => (
                    <Button
                        key={viewType.view}
                        theme={ButtonTheme.CLEAR}
                        onClick={onClick(viewType.view)}
                        className={classNames('', { [cls.notSelected]: viewType.view === view })}
                    >
                        <Icon Svg={viewType.icon} />
                    </Button>
                ))}
            </div>
        );
    },
);
