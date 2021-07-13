import Link from '@pluralsight/ps-design-system-link'
import { action } from '@storybook/addon-actions'
import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'

import Banner from '../index'

export default {
  title: 'Components/Banner',
  component: Banner
} as Meta

const Template: Story = args => <Banner {...args} />

const defaultArgs = { children: 'Banner text' }

export const Basic = Template.bind({})
Basic.args = defaultArgs

export const Colors: Story = () => (
  <StoryGrid>
    {Object.values(Banner.colors).map((color, i) => (
      <Banner key={i} color={color} onClick={action('click')}>
        {color}
      </Banner>
    ))}
  </StoryGrid>
)

export const OnClick = Template.bind({})
OnClick.args = { ...defaultArgs, onClick: action('click X') }

export const OnClickLongText = Template.bind({})
OnClickLongText.args = {
  ...defaultArgs,
  children: `this is the long text. this is the long text. this is the long text. this
  is the long text. this is the long text. this is the long text. this is
  the long text. this is the long text. this is the long text. this is the
  long text. this is the long text. this is the long text.{' '} `,
  onClick: action('click X')
}

export const ChildAnchor = Template.bind({})
ChildAnchor.args = {
  ...defaultArgs,
  children: (
    <>
      this is the text with an <a href="https://duckduckgo.com">anchor tag</a>.
    </>
  )
}

export const ChildAnchorYellow = Template.bind({})
ChildAnchorYellow.args = {
  ...defaultArgs,
  color: Banner.colors.yellow,
  children: (
    <>
      this is the text with an <a href="https://duckduckgo.com">anchor tag</a>.
    </>
  )
}

export const ChildLink = Template.bind({})
ChildLink.args = {
  ...defaultArgs,
  children: (
    <>
      this is the text with an{' '}
      <Link>
        <a href="https://duckduckgo.com">Link component</a>
      </Link>
    </>
  )
}

export const StyleProp = Template.bind({})
StyleProp.args = {
  ...defaultArgs,
  style: { outline: '3px solid red' }
}

export const Button: Story = () => {
  return (
    <StoryGrid>
      {Object.values(Banner.colors).map((color, i) => (
        <Banner key={i} color={color} onClick={action('click')}>
          {color} with button{' '}
          <Banner.Button className="overridden">Button</Banner.Button>
        </Banner>
      ))}
    </StoryGrid>
  )
}

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
