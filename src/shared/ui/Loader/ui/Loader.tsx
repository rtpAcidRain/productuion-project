import { FC, memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Loader.module.scss';

interface LoaderProps {
    className?: string;
}

export const Loader = memo(
    (props: LoaderProps) => {
        const { className } = props;

        return (
            <div className={classNames(cls['lds-roller'], {}, [className])}>
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
            </div>
        );
    },
);
