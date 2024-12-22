import { ComponentMeta, ComponentStory } from '@storybook/react';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import { ArticleDetailsPageComents } from './ArticleDetailsPageComents';

export default {
    title: 'pages/ArticleDetailsPage/ArticleDetailsPageComents',
    component: ArticleDetailsPageComents,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ArticleDetailsPageComents>;

const Template: ComponentStory<typeof ArticleDetailsPageComents> = (args) => <ArticleDetailsPageComents {...args} />;

export const Primary = Template.bind({});
Primary.args = {

};
Primary.decorators = [StoreDecorator({})];
