import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ArticleCodeBlockComponent } from './ArticleCodeBlockComponent';

export default {
    title: '/ArticleCodeBlockComponent',
    component: ArticleCodeBlockComponent,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ArticleCodeBlockComponent>;

const Template: ComponentStory<typeof ArticleCodeBlockComponent> = (args) => <ArticleCodeBlockComponent {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
