import { Popover as HPopover } from '@headlessui/react';
import { memo, ReactNode } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { DropdownDirection } from '@/shared/types/ui';
import common from '../../styles/popup.module.scss';
import cls from './Popover.module.scss';

interface PopoverProps {
    className?: string,
    trigger: ReactNode,
    direction?: DropdownDirection,
    children: ReactNode
}

export const Popover = memo(
    (props: PopoverProps) => {
        const {
            className,
            direction = 'left',
            trigger,
            children,
        } = props;
        return (
            <HPopover className={classNames(common.popup, {}, [className, cls.Popover])}>
                <HPopover.Button
                    as="div"
                    className={classNames(common.trigger, {}, [cls.trigger])}
                >
                    {trigger}
                </HPopover.Button>

                <HPopover.Panel className={classNames(common.options, {}, [cls.options, common[direction]])}>
                    {children}
                </HPopover.Panel>
            </HPopover>
        );
    },
);
