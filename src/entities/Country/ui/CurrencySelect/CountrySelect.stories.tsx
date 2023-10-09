import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { CountrySelect } from './CountrySelect';

export default {
    title: 'entities/Country',
    component: CountrySelect,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof CountrySelect>;

const Template: ComponentStory<typeof CountrySelect> = () => <CountrySelect />;

export const Primary = Template.bind({});
Primary.args = {};
