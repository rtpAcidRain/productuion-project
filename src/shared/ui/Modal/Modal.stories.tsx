import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import Modal from './Modal';

export default {
    title: 'shared/Modal',
    component: Modal,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = (args) => <Modal {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    isOpen: true,
    className: 'app_light_theme',
    children:
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto cum exercitationem incidunt magnam maxime odit recusandae rem sint veniam voluptate?  Debitis eaque facilis itaque laborum, minima quia reprehenderit temporibus ut?\n',
};

export const PrimaryDark = Template.bind({});
PrimaryDark.args = {
    isOpen: true,
    className: 'app_dark_theme',
    children:
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto cum exercitationem incidunt magnam maxime odit recusandae rem sint veniam voluptate?  Debitis eaque facilis itaque laborum, minima quia reprehenderit temporibus ut?\n',
};
