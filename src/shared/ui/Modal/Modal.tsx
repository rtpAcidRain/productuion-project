import {
    memo,
    ReactNode,
} from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import { useModal } from '@/shared/lib/hooks/useModal/useModal';
import { Overlay } from '../Overlay/Overlay';
import Portal from '../Portal/Portal';
import cls from './Modal.module.scss';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';

interface ModalProps {
    className?: string,
    children?: ReactNode,
    isOpen?: boolean,
    onClose?: () => void,
    lazy?: boolean
}

export const Modal = memo(
    (props: ModalProps) => {
        const {
            className,
            children,
            isOpen,
            onClose,
            lazy,
        } = props;

        const { theme } = useTheme();
        const { isClosing, isMounted, close } = useModal({
            onClose,
            isOpen,
        });

        const mods: Mods = {
            [cls.opened]: isOpen,
            [cls.isClosing]: isClosing,
        };

        if (lazy && !isMounted) {
            return null;
        }

        return (
            <Portal>
                <div className={classNames(cls.modal, mods, [className, theme, 'app-modal'])}>
                    <Overlay onClick={close} />
                    <div className={cls.content}>
                        {children}
                    </div>
                </div>
            </Portal>
        );
    },
);
