import {
    MutableRefObject, ReactNode, memo,
} from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Page.module.scss';
import { TestProps } from '@/shared/types/tests';

interface PageProps extends TestProps{
    className?: string,
    children: ReactNode;
    innerRef?: MutableRefObject<HTMLElement>
}

export const Page = memo(
    (props: PageProps) => {
        const { className, children, innerRef } = props;

        return (
            <section
                ref={innerRef}
                className={classNames(cls.Page, {}, [className])}
                data-testid={props['data-testid'] ?? 'Page'}
            >
                {children}
            </section>
        );
    },
);
