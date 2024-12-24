import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ListBox } from '@/shared/ui/Popups';
import { Country } from '../../model/types/country';

interface CountrySelectProps {
    className?: string,
    value?: Country,
    onChange?: (value: Country) => void,
    readonly?: boolean
}

const options = [
    { value: Country.Armenia, content: Country.Armenia },
    { value: Country.Belarus, content: Country.Belarus },
    { value: Country.Kazakhstan, content: Country.Kazakhstan },
    { value: Country.Ukraine, content: Country.Ukraine },
    { value: Country.Russia, content: Country.Russia },
];
export const CountrySelect = memo((props: CountrySelectProps) => {
    const {
        className,
        value,
        onChange,
        readonly,
    } = props;
    const { t } = useTranslation();

    const onChangeHandler = useCallback((value: string) => {
        onChange?.(value as Country);
    }, [onChange]);

    return (
        <ListBox
            className={
                classNames(
                    '',
                    {},
                    [className],
                )
            }
            defaultValue={t('Старана')}
            items={options}
            value={value}
            onChange={onChangeHandler}
            readonly={readonly}
            direction="top"
        />
    );
});
