import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ArticlesPageFilter } from './ArticlesPageFilter';

export default {
    title: 'pages/Articles/ArticlesPageFilter',
    component: ArticlesPageFilter,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ArticlesPageFilter>;

const Template: ComponentStory<typeof ArticlesPageFilter> = (args) => <ArticlesPageFilter {...args} />;

export const Primary = Template.bind({});
Primary.args = {

};
