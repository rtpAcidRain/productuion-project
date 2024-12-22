import { Story } from '@storybook/react';
import { Suspense } from 'react';

export const Suspenseecorator = (StoryCoomponent: Story) => (
    <Suspense>
        <StoryCoomponent />
    </Suspense>
);
