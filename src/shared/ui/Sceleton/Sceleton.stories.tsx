import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/app/providers/ThemeProvider';
import { Sceleton } from './Sceleton';

export default {
    title: 'shared/Sceleton',
    component: Sceleton,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Sceleton>;

const Template: ComponentStory<typeof Sceleton> = (args) => <Sceleton {...args} />;

export const Normal = Template.bind({});
Normal.args = {
    width: '100%',
    height: 200,
};

export const Circle = Template.bind({});
Circle.args = {
    width: 100,
    height: 100,
    border: '50%',
};

export const NormalDark = Template.bind({});
NormalDark.args = {
    width: '100%',
    height: 200,
};
NormalDark.decorators = [ThemeDecorator(Theme.DARK)];

export const CircleDark = Template.bind({});
CircleDark.args = {
    width: 100,
    height: 100,
    border: '50%',
};
CircleDark.decorators = [ThemeDecorator(Theme.DARK)];
