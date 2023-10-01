import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import cls from './Text.module.scss';

export enum TextTheme {
    PRIMARY='primary',
    ERROR='error'
}

interface TextProps {
    className?: string,
    title?:string;
    text?: string;
    theme?: TextTheme;
}

export const Text = memo((props: TextProps) => {
    const {
        className,
        title,
        text,
        theme = TextTheme.PRIMARY,
    } = props;
    const { t } = useTranslation();

    return (
        <div
            className={classNames(cls.text, {}, [className, cls[theme]])}
        >
            {title && <p className={cls.title}>{title}</p>}
            {text && <p className={cls.text}>{text}</p>}
        </div>
    );
});
