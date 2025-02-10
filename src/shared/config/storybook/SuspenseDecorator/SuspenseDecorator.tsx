import { Story } from '@storybook/react';
import { Suspense } from 'react';

export const SuspenseDecorator = (StoryCoomponent: Story) => (
    <Suspense>
        <StoryCoomponent />
    </Suspense>
);
