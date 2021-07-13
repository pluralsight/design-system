import { colorsPink, colorsBlue } from '@pluralsight/ps-design-system-core'
import { action } from '@storybook/addon-actions'
import { Meta, Story } from '@storybook/react/types-6-0'
import glamorDefault, * as glamorExports from 'glamor'
import React from 'react'

import { PaddingDecorator, StoryGrid } from './shared'
import { Heading } from '../index'

const glamor = glamorDefault || glamorExports

export default {
  title: 'Components/Text/Heading',
  component: Heading,
  decorators: [PaddingDecorator]
} as Meta

const defaultArgs = {
  children: <h1>Heading</h1>,
  onClick: action('click')
}

const Template: Story<React.ComponentProps<typeof Heading>> = args => (
  <Heading {...args} />
)

export const Basic = Template.bind({})
Basic.args = { ...defaultArgs }

export const Colors: Story<React.ComponentProps<typeof Heading>> = args => (
  <StoryGrid cols={1}>
    {Object.values(Heading.colors).map((color, i) => (
      <Heading {...args} key={i} color={color}>
        <h1>{color}</h1>
      </Heading>
    ))}
  </StoryGrid>
)
Colors.args = { ...defaultArgs }

export const Sizes: Story<React.ComponentProps<typeof Heading>> = args => (
  <StoryGrid cols={1}>
    {Object.values(Heading.sizes).map((size, i) => (
      <Heading {...args} key={i} size={size}>
        <h1>{size}</h1>
      </Heading>
    ))}
  </StoryGrid>
)
Sizes.args = { ...defaultArgs }

export const StyleOverride = Template.bind({})
StyleOverride.args = {
  ...defaultArgs,
  style: { color: colorsPink[6] }
}
