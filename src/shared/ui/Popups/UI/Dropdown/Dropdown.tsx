import { Menu } from '@headlessui/react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Fragment, ReactNode } from 'react';
import { DropdownDirection } from 'shared/types/ui';
import { AppLink } from '../../../AppLink/AppLink';
import cls from './Dropdown.module.scss';
import common from '../../styles/popup.module.scss';

export interface DropdownItem {
    disabled?: boolean;
    content?: ReactNode;
    onClick?: () => void;
    href?: string
}

interface DropdownProps {
    className?: string
    items: DropdownItem[]
    trigger: ReactNode
    direction?: DropdownDirection
}

export function Dropdown(props: DropdownProps) {
    const {
        className,
        items,
        trigger,
        direction = 'left',
    } = props;

    return (
        <Menu as="div" className={classNames(common.popup, {}, [className])}>
            <Menu.Button className={classNames(common.trigger, {}, [cls.trigger])}>
                {trigger}
            </Menu.Button>
            <Menu.Items className={classNames(common.options, {}, [cls.options, common[direction]])}>
                {items.map((item, i) => {
                    const content = ({ active }: {active: boolean}) => (
                        <button
                            // eslint-disable-next-line react/no-array-index-key
                            key={String(item.content)}
                            disabled={item.disabled}
                            className={classNames(common.option, { [common.active]: active }, [cls.option])}
                            onClick={item.onClick}
                            type="button"
                        >
                            {item.content}
                        </button>
                    );

                    if (item.href) {
                        return (
                            <Menu.Item as={AppLink} to={item.href} disabled={item.disabled}>
                                {content}
                            </Menu.Item>
                        );
                    }
                    return (
                        <Menu.Item as={Fragment} disabled={item.disabled}>
                            {content}
                        </Menu.Item>
                    );
                })}

            </Menu.Items>
        </Menu>
    );
}
