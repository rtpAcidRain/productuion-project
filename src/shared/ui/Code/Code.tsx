import { classNames } from 'shared/lib/classNames/classNames';
import { ReactNode, memo, useCallback } from 'react';
import CupyIcon from 'shared/assets/icons/copy-20-20.svg';
import { Icon } from '../Icon/Icon';
import { Button, ButtonTheme } from '../Button/Button';
import cls from './Code.module.scss';

interface CodeProps {
    className?: string,
    text: string
}
export const Code = memo(
    (props: CodeProps) => {
        const { className, text } = props;

        const handleCopy = useCallback(() => {
            navigator.clipboard.writeText(text);
        }, [text]);

        return (
            <pre className={classNames(cls.Code, {}, [className])}>
                <Button onClick={handleCopy} className={cls.copyBtn} theme={ButtonTheme.CLEAR}>
                    <Icon Svg={CupyIcon} />
                </Button>
                <code>
                    {text}
                </code>
            </pre>

        );
    },
);
