import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ArticleViewToggler } from './ArticleViewToggler';

export default {
    title: 'shared/ArticleViewToggler',
    component: ArticleViewToggler,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ArticleViewToggler>;

const Template: ComponentStory<typeof ArticleViewToggler> = (args) => <ArticleViewToggler {...args} />;

export const Primary = Template.bind({});
Primary.args = {

};
