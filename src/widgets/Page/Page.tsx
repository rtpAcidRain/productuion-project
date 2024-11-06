import { classNames } from 'shared/lib/classNames/classNames';
import {
    MutableRefObject, ReactNode, memo, useRef, UIEvent,
} from 'react';
import { useInfiniteScroll } from 'shared/lib/hooks/useInfiniteScroll/useInfiniteScroll';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getUiScrollByPath, uiActions } from 'features/UI';
import { useLocation } from 'react-router-dom';
import { useInitialEffects } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useSelector } from 'react-redux';
import { StateSchema } from 'app/providers/StoreProvider';
import { useThrottle } from 'shared/lib/hooks/useThrottle/useThrottle';
import cls from './Page.module.scss';

interface PageProps {
    className?: string,
    children: ReactNode;
    onScrollEnd?: () => void
}

export const Page = memo(
    (props: PageProps) => {
        const { className, children, onScrollEnd } = props;

        const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
        const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;

        const dispatch = useAppDispatch();
        const { pathname } = useLocation();
        const scrollPosition = useSelector((state: StateSchema) => getUiScrollByPath(state, pathname));

        useInfiniteScroll({
            triggerRef,
            wrapperRef,
            callback: onScrollEnd,
        });

        useInitialEffects(() => {
            wrapperRef.current.scrollTop = scrollPosition;
        });

        const onScroll = useThrottle((e: UIEvent<HTMLDivElement>) => {
            dispatch(uiActions.setScrollPosition({
                path: pathname,
                position: e.currentTarget.scrollTop,
            }));
        }, 500);

        return (
            <section
                ref={wrapperRef}
                className={classNames(cls.Page, {}, [className])}
                onScroll={onScroll}
            >
                {children}
                {onScrollEnd && <div ref={triggerRef} className={cls.triggerRef} />}
            </section>
        );
    },
);
