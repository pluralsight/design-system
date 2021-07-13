import { PlaceholderIcon } from '@pluralsight/ps-design-system-icon'
import Theme from '@pluralsight/ps-design-system-theme'
import { RefFor } from '@pluralsight/ps-design-system-util'
import { action } from '@storybook/addon-actions'
import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'

import Button from '../index'

const defaultArgs = { children: 'click me', onClick: action('click') }

export default {
  title: 'Components/Button',
  component: Button
} as Meta

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

const Template: Story<React.ComponentProps<typeof Button>> = args => (
  <Button {...args} />
)

export const Basic = Template.bind({})
Basic.args = { ...defaultArgs }

export const WithIcon = Template.bind({})
WithIcon.args = { ...defaultArgs, icon: <PlaceholderIcon /> }

export const AsLink = Template.bind({})
AsLink.args = { ...defaultArgs, href: 'https://duckduckgo.com' }

export const AsLinkWithIcon = Template.bind({})
AsLinkWithIcon.args = {
  ...defaultArgs,
  href: 'https://duckduckgo.com',
  icon: <PlaceholderIcon />
}

export const Disabled = Template.bind({})
Disabled.args = { ...defaultArgs, disabled: true }

export const DisabledWithIcon = Template.bind({})
DisabledWithIcon.args = {
  ...defaultArgs,
  disabled: true,
  icon: <PlaceholderIcon />
}

export const IconOnly = Template.bind({})
IconOnly.args = {
  ...defaultArgs,
  children: undefined,
  icon: <PlaceholderIcon />
}

export const LoadingWithIcon = Template.bind({})
LoadingWithIcon.args = {
  ...defaultArgs,
  'aria-label': 'loading',
  loading: true,
  icon: <PlaceholderIcon />
}

export const LoadingWithLabelNoIcon = Template.bind({})
LoadingWithLabelNoIcon.args = {
  ...defaultArgs,
  'aria-label': 'loading',
  loading: true
}

export const StyleOverride = Template.bind({})
StyleOverride.args = { ...defaultArgs, style: { background: 'red' } }

export const Layouts: Story = () => (
  <>
    {Object.values(Button.layouts).map((layout, i) => (
      <div
        key={i}
        style={{
          outline: '1px dashed pink',
          margin: 8,
          width: '400px'
        }}
      >
        <Button layout={layout}>{layout}</Button>
      </div>
    ))}
  </>
)

export const Appearances: Story = () => (
  <StoryGrid>
    {Object.values(Button.appearances).map((app, i) => (
      <Button key={i} appearance={app}>
        {app}
      </Button>
    ))}
  </StoryGrid>
)
export const AppearancesWithIcon: Story = () => (
  <StoryGrid>
    {Object.values(Button.appearances).map((app, i) => (
      <Button key={i} appearance={app} icon={<PlaceholderIcon />}>
        {app}
      </Button>
    ))}
  </StoryGrid>
)
export const AppearancesDisabled: Story = () => (
  <StoryGrid>
    {Object.values(Button.appearances).map((app, i) => (
      <Button key={i} appearance={app} disabled>
        {app}
      </Button>
    ))}
  </StoryGrid>
)

export const Sizes: Story = () => (
  <StoryGrid>
    {Object.values(Button.sizes).map((size, i) => (
      <Button key={i} size={size}>
        {size}
      </Button>
    ))}
  </StoryGrid>
)
export const SizesWithIcon: Story = () => (
  <StoryGrid>
    {Object.values(Button.sizes).map((size, i) => (
      <Button key={i} size={size} icon={<PlaceholderIcon />}>
        {size}
      </Button>
    ))}
  </StoryGrid>
)
export const IconAlignments: Story = () => (
  <StoryGrid>
    {Object.values(Button.iconAligns).map((iconAlign, i) => (
      <Button key={i} iconAlign={iconAlign} icon={<PlaceholderIcon />}>
        {iconAlign}
      </Button>
    ))}
  </StoryGrid>
)

export const ThemeNesting: Story = () => (
  <Theme name={Theme.names.dark}>
    <Button appearance={Button.appearances.flat}>{Theme.names.dark}</Button>

    <Theme name={Theme.names.light}>
      <Button appearance={Button.appearances.flat}>{Theme.names.light}</Button>

      <Theme name={Theme.names.dark}>
        <Button appearance={Button.appearances.flat}>{Theme.names.dark}</Button>
      </Theme>
    </Theme>
  </Theme>
)

export const Variations: Story = () => (
  <StoryGrid cols={4}>
    {Object.values(Button.appearances).map(app => (
      <React.Fragment key={app}>
        {Object.values(Button.sizes).map(size => (
          <Button key={`key-${app}-${size}`} appearance={app} size={size}>
            {app}
          </Button>
        ))}
      </React.Fragment>
    ))}
  </StoryGrid>
)

export const VertAlignment: Story = () => (
  <StoryGrid cols={Object.values(Button.appearances).length}>
    {Object.values(Button.appearances).map(app => (
      <React.Fragment key={app}>
        {Object.values(Button.sizes).map(size => (
          <Button key={`key-${app}-${size}`} appearance={app} size={size}>
            {app}
          </Button>
        ))}
      </React.Fragment>
    ))}
  </StoryGrid>
)

export const ExampleAutofocus: Story = () => {
  const Example: React.FC = () => {
    const ref = React.useRef<HTMLButtonElement>()
    React.useEffect(() => {
      if (ref && ref.current) ref.current.focus()
    }, [])

    return <Button ref={ref as RefFor<'button'>}>Should be focused</Button>
  }

  return <Example />
}

export const LoadingTransition: Story = () => {
  const Example: React.FC = () => {
    const [loading, setLoading] = React.useState<boolean>(false)

    React.useEffect(() => {
      const timer = setInterval(() => {
        setLoading(!loading)
      }, 1500)

      return () => clearInterval(timer)
    }, [loading])

    return <Button loading={loading}>Wait for it</Button>
  }

  return <Example />
}

export const LoadingTransitionStartTrue: Story = () => {
  const Example: React.FC = () => {
    const [loading, setLoading] = React.useState<boolean>(true)

    React.useEffect(() => {
      const timer = setInterval(() => {
        setLoading(!loading)
      }, 1500)

      return () => clearInterval(timer)
    }, [loading])

    return (
      <Button aria-label={loading ? 'Loading...' : undefined} loading={loading}>
        Wait for it
      </Button>
    )
  }

  return <Example />
}
