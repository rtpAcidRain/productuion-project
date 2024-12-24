import { TestAsyncThunk } from '@/shared/lib/tests/testAsyncThunk/testAsyncThunk';
import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';
import { updateProfileData } from './updateProfileData';
import { ValidateProfileError } from '../../consts/ValidateProfileError';

const data = {
    username: 'admin',
    age: 22,
    country: Country.Armenia,
    lastname: 'trata',
    first: 'asd',
    city: 'asd',
    currency: Currency.EUR,
    id: '1',
};

describe('fetchProfileData.test', () => {
    test('success ', async () => {
        const thunk = new TestAsyncThunk(updateProfileData, {
            profile: {
                form: data,
            },
        });

        thunk.api.put.mockReturnValue(
            Promise.resolve({
                data,
            }),
        );

        const result = await thunk.callThunk();

        expect(thunk.api.put).toHaveBeenCalled();
        expect(result.meta.requestStatus).toBe('fulfilled');
        expect(result.payload).toEqual(data);
    });

    test('error ', async () => {
        const thunk = new TestAsyncThunk(updateProfileData, {
            profile: {
                form: data,
            },
        });
        thunk.api.put.mockReturnValue(Promise.resolve({ status: 403 }));

        const result = await thunk.callThunk();

        expect(result.meta.requestStatus).toBe('rejected');
        expect(result.payload).toEqual([
            ValidateProfileError.SERVER_ERROR,
        ]);
    });

    test('validate error', async () => {
        const thunk = new TestAsyncThunk(updateProfileData, {
            profile: {
                form: { ...data, lastname: '' },
            },
        });

        const result = await thunk.callThunk();

        expect(result.meta.requestStatus).toBe('rejected');
        expect(result.payload).toEqual([
            ValidateProfileError.INCORRECT_USER_DATA,
        ]);
    });
});
