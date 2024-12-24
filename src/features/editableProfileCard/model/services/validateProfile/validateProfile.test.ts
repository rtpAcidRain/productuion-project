import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';
import { validateProfile } from './validateProfile';
import { ValidateProfileError } from '../../consts/ValidateProfileError';

const data = {
    username: 'admin',
    age: 22,
    country: Country.Armenia,
    lastname: 'trata',
    first: 'asd',
    city: 'asd',
    currency: Currency.EUR,
};

describe('validateProfile.test', () => {
    test('success ', async () => {
        const result = validateProfile(data);

        expect(result).toEqual([]);
    });

    test('without first and lastname ', async () => {
        const result = validateProfile({ ...data, first: '', lastname: '' });

        expect(result).toEqual([
            ValidateProfileError.INCORRECT_USER_DATA,
        ]);
    });

    test('incorrect age', async () => {
        const result = validateProfile({ ...data, age: undefined });

        expect(result).toEqual([
            ValidateProfileError.INCORRECT_AGE,
        ]);
    });

    test('incorrect city', async () => {
        const result = validateProfile({ ...data, city: undefined });

        expect(result).toEqual([
            ValidateProfileError.INCORRECT_CITY,
        ]);
    });

    test('incorrect all', async () => {
        const result = validateProfile({});

        expect(result).toEqual([
            ValidateProfileError.INCORRECT_USER_DATA,
            ValidateProfileError.INCORRECT_AGE,
            ValidateProfileError.INCORRECT_CITY,
        ]);
    });
});
