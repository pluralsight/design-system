import { action } from '@storybook/addon-actions'
import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'

import { PaddingDecorator, StoryGrid } from './shared'
import { Label } from '../index'

export default {
  title: 'Components/Text/Label',
  component: Label,
  decorators: [PaddingDecorator]
} as Meta

const defaultArgs = {
  children: <span>Label</span>,
  onClick: action('click')
}

const Template: Story<React.ComponentProps<typeof Label>> = args => (
  <Label {...args} />
)

export const Basic = Template.bind({})
Basic.args = { ...defaultArgs }

export const Strong = Template.bind({})
Strong.args = { ...defaultArgs, strong: true }

export const Caps = Template.bind({})
Caps.args = { ...defaultArgs, caps: true }

export const Mono = Template.bind({})
Mono.args = { ...defaultArgs, mono: true }

export const StrongCaps = Template.bind({})
StrongCaps.args = { ...defaultArgs, caps: true, strong: true }

export const Sizes: Story<React.ComponentProps<typeof Label>> = args => (
  <StoryGrid cols={1}>
    {Object.values(Label.sizes).map((size, i) => (
      <Label {...args} key={i} size={size}>
        <span>{size}</span>
      </Label>
    ))}
  </StoryGrid>
)
Sizes.args = { ...defaultArgs }
