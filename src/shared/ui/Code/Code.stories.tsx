import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/app/providers/ThemeProvider';
import { Code } from './Code';

export default {
    title: 'shared/Code',
    component: Code,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Code>;

const Template: ComponentStory<typeof Code> = (args) => <Code {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    text: `
    import React from 'react';
    import { ComponentMeta, ComponentStory } from '@storybook/react';
    import { Code } from './Code';

    export default {
        title: 'shared/Code',
        component: Code,
        argTypes: {
            backgroundColor: { control: 'color' },
        },
    } as ComponentMeta<typeof Code>;

    const Template: ComponentStory<typeof Code> = (args) => <Code {...args} />;
    `,
};

export const PrimaryDark = Template.bind({});
PrimaryDark.args = {
    text: `
    import React from 'react';
    import { ComponentMeta, ComponentStory } from '@storybook/react';
    import { Code } from './Code';

    export default {
        title: 'shared/Code',
        component: Code,
        argTypes: {
            backgroundColor: { control: 'color' },
        },
    } as ComponentMeta<typeof Code>;

    const Template: ComponentStory<typeof Code> = (args) => <Code {...args} />;
    `,
};
PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)];
