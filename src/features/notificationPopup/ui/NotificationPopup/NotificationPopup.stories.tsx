import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { NotificationPopup } from './NotificationPopup';

export default {
    title: 'shared/NotificationPopup',
    component: NotificationPopup,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof NotificationPopup>;

const Template: ComponentStory<typeof NotificationPopup> = (args) => <NotificationPopup {...args} />;

export const Primary = Template.bind({});
Primary.args = {

};
