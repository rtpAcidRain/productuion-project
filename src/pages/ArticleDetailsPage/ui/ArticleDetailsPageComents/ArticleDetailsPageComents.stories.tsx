import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ArticleDetailsPageComents } from './ArticleDetailsPageComents';

export default {
    title: 'shared/ArticleDetailsPageComents',
    component: ArticleDetailsPageComents,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ArticleDetailsPageComents>;

const Template: ComponentStory<typeof ArticleDetailsPageComents> = (args) => <ArticleDetailsPageComents {...args} />;

export const Primary = Template.bind({});
Primary.args = {

};
