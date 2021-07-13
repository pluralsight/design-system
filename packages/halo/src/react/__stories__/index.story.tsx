import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'

import Focusable from './focusable'
import Halo from '../index'

const defaultArgs = { children: <Focusable /> }

const StoryGrid: React.FC<{ cols?: number }> = props => {
  const { cols = 2, ...rest } = props

  return (
    <div
      style={{
        display: 'grid',
        gap: '20px',
        gridTemplateColumns: Array(cols).fill('1fr').join(' ')
      }}
      {...rest}
    />
  )
}

export default {
  title: 'Components/Halo',
  component: Halo
} as Meta

const Template: Story<React.ComponentProps<typeof Halo>> = args => (
  <Halo {...args} />
)

export const Basic = Template.bind({})
Basic.args = { ...defaultArgs }

export const Error = Template.bind({})
Error.args = { ...defaultArgs, error: true }

export const Visible = Template.bind({})
Visible.args = { ...defaultArgs, visible: true }

export const NotVisibleOnFocus = Template.bind({})
NotVisibleOnFocus.args = { ...defaultArgs, visibleOnFocus: false }

export const GapSizes: Story = () => (
  <StoryGrid>
    {Object.values(Halo.gapSizes).map((gapSize, i) => (
      <Halo key={i} gapSize={gapSize} visible>
        <Focusable>{gapSize}</Focusable>
      </Halo>
    ))}
  </StoryGrid>
)

export const Shapes: Story = () => (
  <StoryGrid>
    {Object.values(Halo.shapes).map((shape, i) => (
      <Halo key={i} shape={shape} visible>
        <Focusable>{shape}</Focusable>
      </Halo>
    ))}
  </StoryGrid>
)
