import { Listbox as HListBox } from '@headlessui/react';
import { Fragment, ReactNode } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { DropdownDirection } from '@/shared/types/ui';
import { Button } from '../../../Button/Button';
import cls from './ListBox.module.scss';
import common from '../../styles/popup.module.scss';

export interface ListBoxItem {
    value: string,
    content: ReactNode,
    disabled?: boolean
}

interface ListBoxProps {
    items?: ListBoxItem[]
    className?: string
    value?: string;
    defaultValue?: string;
    onChange: <T extends string>(value: T) => void;
    readonly?: boolean,
    direction?: DropdownDirection
}

export const ListBox = (props: ListBoxProps) => {
    const {
        items,
        className,
        value,
        defaultValue,
        onChange,
        readonly,
        direction = 'bottom',
    } = props;

    return (
        <HListBox
            as="div"
            className={classNames(common.popup, {}, [className])}
            value={value}
            onChange={onChange}
            disabled={readonly}
        >
            <HListBox.Button className={classNames(common.trigger, {}, [cls.trigger])}>
                <Button disabled={readonly}>
                    {value ?? defaultValue}
                </Button>
            </HListBox.Button>
            <HListBox.Options className={classNames(common.options, {}, [cls.options, common[direction]])}>
                {items?.map((item) => (

                    <HListBox.Option
                        key={item.value}
                        value={item.value}
                        disabled={item.disabled}
                        as={Fragment}
                    >
                        {({ active, selected }) => (
                            <li className={
                                classNames(
                                    common.option,
                                    {
                                        [common.active]: active,
                                        [common.disabled]: item.disabled,
                                    },
                                    [
                                        cls.option,
                                    ],
                                )
                            }
                            >
                                {selected && '!!'}
                                {item.content}
                            </li>
                        )}
                    </HListBox.Option>
                ))}
            </HListBox.Options>
        </HListBox>
    );
};
