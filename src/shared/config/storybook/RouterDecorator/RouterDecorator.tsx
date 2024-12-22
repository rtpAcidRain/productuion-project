import { Story } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';

export const RouterDecorator = (StoryCoomponent: Story) => (
    <BrowserRouter>
        <StoryCoomponent />
    </BrowserRouter>
);
