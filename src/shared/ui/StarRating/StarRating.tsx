import { memo, useState } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import StarIcon from '../../assets/icons/star.svg';
import { Icon } from '../Icon/Icon';
import cls from './StarRating.module.scss';

interface StarRatingProps {
    className?: string,
    size?: number;
    selectedStars?: number
    onSelect?: (starsCount: number) => void;
}

const stars = [1, 2, 3, 4, 5];

export const StarRating = memo(
    (props: StarRatingProps) => {
        const {
            className,
            size = 30,
            selectedStars = 0,
            onSelect,
        } = props;
        const [currendStarCount, setCurrentStarsCount] = useState(selectedStars);
        const [isSelected, setIsSelected] = useState(Boolean(selectedStars));

        const onHover = (starsCount: number) => () => {
            if (!isSelected) {
                setCurrentStarsCount(starsCount);
            }
        };

        const onLeave = () => {
            if (!isSelected) {
                setCurrentStarsCount(0);
            }
        };

        const onClick = (starsCount: number) => () => {
            if (!isSelected) {
                onSelect?.(starsCount);
                setCurrentStarsCount(starsCount);
                setIsSelected(true);
            }
        };

        return (
            <div className={classNames('', { [cls.disabled]: isSelected }, [className])} data-testid="StarRating">
                {stars.map(
                    (starNumber) => (
                        <Icon
                            height={size}
                            width={size}
                            Svg={StarIcon}
                            key={starNumber}
                            className={classNames(cls.starIcon, {
                                [cls.hovered]: currendStarCount >= starNumber,
                                [cls.normal]: currendStarCount < starNumber,

                            }, [])}
                            onMouseLeave={onLeave}
                            onMouseEnter={onHover(starNumber)}
                            onClick={onClick(starNumber)}
                            data-testid={`StarRating.${starNumber}`}
                            data-selected={currendStarCount >= starNumber}

                        />
                    ),
                )}
            </div>
        );
    },
);
