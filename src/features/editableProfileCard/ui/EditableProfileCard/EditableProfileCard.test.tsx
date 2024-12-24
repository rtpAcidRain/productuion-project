import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';
import { Currency } from '@/entities/Currency';
import { Country } from '@/entities/Country';
import { Profile } from '@/entities/Profile';
import { $api } from '@/shared/api/api';
import { profileReducer } from '../../model/slice/ProfileSlice';
import { EditableProfileCard } from './EditableProfileCard';

const profile: Profile = {
    id: '1',
    first: 'admin',
    lastname: 'admin',
    age: 465,
    currency: Currency.USD,
    country: Country.Kazakhstan,
    city: 'Zamandas',
    username: 'admin123',
};

const options = {
    initialState: {
        profile: {
            readonly: true,
            data: profile,
            form: profile,
        },
        user: {
            authData: { id: '1' },
        },
    },
    asyncReducers: {
        profile: profileReducer,
    },
};

describe('EditableProfileCard', () => {
    test('readinly has to be off', async () => {
        componentRender(<EditableProfileCard id="1" />, options);
        await userEvent.click(screen.getByTestId('EditableProfileHeader.EditButton'));
        expect(screen.getByTestId('EditableProfileHeader.CancelButton')).toBeInTheDocument();
    });

    test('cancel edities', async () => {
        componentRender(<EditableProfileCard id="1" />, options);
        await userEvent.click(screen.getByTestId('EditableProfileHeader.EditButton'));
        await userEvent.clear(screen.getByTestId('ProfileCard.Firstname'));
        await userEvent.clear(screen.getByTestId('ProfileCard.Lastname'));
        await userEvent.type(screen.getByTestId('ProfileCard.Firstname'), 'user');
        await userEvent.type(screen.getByTestId('ProfileCard.Lastname'), 'user');
        expect(screen.getByTestId('ProfileCard.Firstname')).toHaveValue('user');
        expect(screen.getByTestId('ProfileCard.Lastname')).toHaveValue('user');
        await userEvent.click(screen.getByTestId('EditableProfileHeader.CancelButton'));
        expect(screen.getByTestId('ProfileCard.Firstname')).toHaveValue('admin');
        expect(screen.getByTestId('ProfileCard.Lastname')).toHaveValue('admin');
    });

    test('error has to appear', async () => {
        componentRender(<EditableProfileCard id="1" />, options);
        await userEvent.click(screen.getByTestId('EditableProfileHeader.EditButton'));
        await userEvent.clear(screen.getByTestId('ProfileCard.Firstname'));
        await userEvent.click(screen.getByTestId('EditableProfileHeader.SaveButton'));
        expect(screen.getByTestId('EditableProfileCard.Error.Paragraph')).toBeInTheDocument();
    });

    test('it is has to save', async () => {
        const mockPutReq = jest.spyOn($api, 'put');
        componentRender(<EditableProfileCard id="1" />, options);
        await userEvent.click(screen.getByTestId('EditableProfileHeader.EditButton'));
        await userEvent.type(screen.getByTestId('ProfileCard.Firstname'), 'user1');
        await userEvent.click(screen.getByTestId('EditableProfileHeader.SaveButton'));
        expect(mockPutReq).toHaveBeenCalled();
    });
});
