import { colorsPink, colorsBlue } from '@pluralsight/ps-design-system-core'
import { action } from '@storybook/addon-actions'
import { Meta, Story } from '@storybook/react/types-6-0'
import glamorDefault, * as glamorExports from 'glamor'
import React from 'react'

import { PaddingDecorator, StoryGrid } from './shared'
import { P } from '../index'

const glamor = glamorDefault || glamorExports

export default {
  title: 'Components/Text/P',
  component: P,
  decorators: [PaddingDecorator]
} as Meta

const defaultArgs = {
  children: (
    <>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur aliquam
      pharetra arcu in commodo. Cras faucibus ex id ligula aliquam, eget porta
      tortor efficitur. Duis eget ultrices ligula. Pellentesque laoreet massa
      interdum, venenatis sem pretium, efficitur enim. Vestibulum id nisi a
      massa tincidunt malesuada vitae non risus. Sed eget convallis libero. Nam
      ac libero luctus, euismod lectus eget, cursus nibh.
    </>
  ),
  onClick: action('click')
}

const Template: Story<React.ComponentProps<typeof P>> = args => <P {...args} />

export const Basic = Template.bind({})
Basic.args = { ...defaultArgs }

export const WithEm = Template.bind({})
WithEm.args = {
  ...defaultArgs,
  children: (
    <>
      Cras faucibus ex id ligula aliquam, eget porta
      <em>this is em</em> tortor efficitur. Duis eget ultrices ligula.
      Pellentesque laoreet massa interdum. Vestibulum id nisi a massa
      <em>THIS IS EM</em> tincidunt malesuada vitae non risus. cursus nibh.
    </>
  )
}

export const Colors: Story<React.ComponentProps<typeof P>> = args => (
  <StoryGrid cols={1}>
    {Object.values(P.colors).map((color, i) => (
      <P {...args} key={i} color={color} />
    ))}
  </StoryGrid>
)
Colors.args = { ...defaultArgs }

export const Sizes: Story<React.ComponentProps<typeof P>> = args => (
  <StoryGrid cols={1}>
    {Object.values(P.sizes).map((size, i) => (
      <P {...args} key={i} size={size} />
    ))}
  </StoryGrid>
)
Sizes.args = { ...defaultArgs }

export const StyleOverride = Template.bind({})
StyleOverride.args = {
  ...defaultArgs,
  style: { color: colorsPink[6] }
}
