import { layout } from '@pluralsight/ps-design-system-core'
import { PlaceholderIcon } from '@pluralsight/ps-design-system-icon'
import { action } from '@storybook/addon-actions'
import { Meta, Story } from '@storybook/react/types-6-0'
import { DecoratorFn } from '@storybook/react'
import glamorDefault, * as glamorExports from 'glamor'
import React from 'react'

import Dropdown from '../index'

const glamor = glamorDefault || glamorExports

const PaddingDecorator: DecoratorFn = storyFn => (
  <div {...glamor.css({ height: '100vh', padding: layout.spacingLarge })}>
    {storyFn()}
  </div>
)

const StoryGrid: React.FC<{ cols?: number }> = props => {
  const { cols = 2, ...rest } = props

  return (
    <div
      {...glamor.css({
        display: 'grid',
        gap: '20px',
        gridTemplateColumns: Array(cols).fill('1fr').join(' ')
      })}
      {...rest}
    />
  )
}

const defaultArgs = {
  onFocus: action('on focus'),
  onBlur: action('on blur'),
  label: 'The label',
  menu: (
    <>
      <Dropdown.Item onClick={action('click item 1')} value={1}>
        Item 1
      </Dropdown.Item>
      <Dropdown.Item onClick={action('click item 2')} value={2}>
        Item 2
      </Dropdown.Item>
      <Dropdown.Item onClick={action('click item 3')} value={3}>
        Item 3
      </Dropdown.Item>
    </>
  ),
  placeholder: 'Some placeholder',
  subLabel: 'The sub label'
}
export default {
  title: 'Components/Dropdown',
  component: Dropdown,
  decorators: [PaddingDecorator]
} as Meta

const Template: Story<React.ComponentProps<typeof Dropdown>> = args => (
  <Dropdown {...args} />
)

export const Basic = Template.bind({})
Basic.args = { ...defaultArgs }

export const Sizes: Story = () => {
  return (
    <div>
      <Dropdown label="Medium" placeholder="Select one" />
      <Dropdown
        label="Small"
        size={Dropdown.sizes.small}
        placeholder="Select one"
      />
    </div>
  )
}

export const LabelOnly = Template.bind({})
LabelOnly.args = {
  ...defaultArgs,
  subLabel: undefined
}

export const SubLabelOnly = Template.bind({})
SubLabelOnly.args = {
  ...defaultArgs,
  'aria-label': 'You need an a11y label',
  label: undefined
}

export const NoLabels = Template.bind({})
NoLabels.args = {
  ...defaultArgs,
  'aria-label': 'You need an a11y label',
  label: undefined,
  subLabel: undefined
}

export const Disabled = Template.bind({})
Disabled.args = { ...defaultArgs, disabled: true }

export const Error = Template.bind({})
Error.args = { ...defaultArgs, error: true }

export const PreselectedValue = Template.bind({})
PreselectedValue.args = { ...defaultArgs, value: 2 }

export const PreselectedByLabel = Template.bind({})
PreselectedByLabel.args = { ...defaultArgs, value: 'Item 3' }

export const PreselectedValueUnknown = Template.bind({})
PreselectedValueUnknown.args = {
  ...defaultArgs,
  placeholder: "Can't find item",
  value: 'unknown'
}

export const DisabledItems = Template.bind({})
DisabledItems.args = {
  ...defaultArgs,
  menu: (
    <>
      <Dropdown.Item>Item 1</Dropdown.Item>
      <Dropdown.Item disabled>Disabled Item</Dropdown.Item>
      <Dropdown.Item>Item 3</Dropdown.Item>
    </>
  )
}

export const MaxHeight = Template.bind({})
MaxHeight.args = {
  ...defaultArgs,
  menu: (
    <>
      {Array(15)
        .fill(null)
        .map((_, index) => (
          <Dropdown.Item key={index} value={index}>
            {`Item: ${index}`}
          </Dropdown.Item>
        ))}
    </>
  )
}

export const ListWithIcons = Template.bind({})
ListWithIcons.args = {
  ...defaultArgs,
  menu: (
    <>
      <Dropdown.Item value={1}>Item 1</Dropdown.Item>
      <Dropdown.Item icon={<PlaceholderIcon />} value={2}>
        Item 2
      </Dropdown.Item>
      <Dropdown.Item value={3}>Item 3</Dropdown.Item>
    </>
  )
}

export const ListWithDivider = Template.bind({})
ListWithDivider.args = {
  ...defaultArgs,
  menu: (
    <>
      <Dropdown.Item value={1}>Item 1</Dropdown.Item>
      <Dropdown.Item value={2}>Item 2</Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item value={3}>Item 3</Dropdown.Item>
    </>
  )
}

export const SuperLongItemLabel = Template.bind({})
SuperLongItemLabel.args = {
  ...defaultArgs,
  menu: (
    <>
      <Dropdown.Item>
        This level really is the longest level that anyone has ever seen. There
        is none longer
      </Dropdown.Item>
    </>
  )
}

export const LongPlaceholder = Template.bind({})
LongPlaceholder.args = {
  ...defaultArgs,
  placeholder: 'This one is longer than any menu item'
}

export const Appearances: Story = () => (
  <StoryGrid cols={1}>
    {Object.values(Dropdown.sizes).map(size =>
      Object.values(Dropdown.appearances).map(app => (
        <Dropdown
          appearance={app}
          key={`${size}-${app}`}
          label={`${size} ${app}`}
          size={size}
          placeholder="Some placeholder"
        />
      ))
    )}
  </StoryGrid>
)

export const AppearancesWithError: Story = () => (
  <StoryGrid cols={1}>
    {Object.values(Dropdown.sizes).map(size =>
      Object.values(Dropdown.appearances).map(app => (
        <Dropdown
          appearance={app}
          key={`${size}-${app}`}
          error
          label={`${size} ${app}`}
          size={size}
          placeholder="Some placeholder"
        />
      ))
    )}
  </StoryGrid>
)

export const CompareGaps: Story = () => (
  <StoryGrid cols={1}>
    <Dropdown label="Problem field" placeholder="Some placeholder" />

    <Dropdown error label="Problem field" placeholder="Some placeholder" />

    <Dropdown
      appearance={Dropdown.appearances.subtle}
      label="Problem field"
      placeholder="Some placeholder"
    />

    <Dropdown
      appearance={Dropdown.appearances.subtle}
      error
      label="Problem field"
      placeholder="Some placeholder"
    />
  </StoryGrid>
)

export const CompareDisabled: Story = () => (
  <StoryGrid cols={1}>
    <Dropdown
      label="Normal"
      subLabel="Still normal"
      placeholder="I'm normal, see"
    />

    <Dropdown
      label="I'm not usable"
      subLabel="Neither am I"
      disabled
      placeholder="I'm untouchable"
    />
  </StoryGrid>
)

export const Stacked: Story = () => (
  <>
    <div>
      <Dropdown
        label="Level"
        placeholder="Select one"
        menu={
          <>
            <Dropdown.Item>One item</Dropdown.Item>
            <Dropdown.Item>Two item</Dropdown.Item>
            <Dropdown.Item>Three item</Dropdown.Item>
            <Dropdown.Item>Three and the amazing item</Dropdown.Item>
          </>
        }
      />
    </div>

    <div>
      <Dropdown
        label="Level"
        placeholder="Select another one"
        menu={
          <>
            <Dropdown.Item>One item</Dropdown.Item>
            <Dropdown.Item>Two item</Dropdown.Item>
            <Dropdown.Item>Three item</Dropdown.Item>
            <Dropdown.Item icon={<PlaceholderIcon />}>
              Three and the amazing item
            </Dropdown.Item>
          </>
        }
      />
    </div>
  </>
)
