import { Meta, Story } from '@storybook/react/types-6-0'
import { PlaceholderIcon } from '@pluralsight/ps-design-system-icon'
import React from 'react'

import { periodicElements } from '../__fixtures__/options'
import Typeahead, { TypeaheadFilterFunction } from '../index'

const SetWidthDecorator = (Story: Story) => {
  return (
    <div style={{ width: '400px' }}>
      <Story />
    </div>
  )
}

export default {
  title: 'Components/Typeahead',
  component: Typeahead,
  decorators: [SetWidthDecorator]
} as Meta

const defaultArgs = {
  label: 'The label',
  subLabel: 'The sub label'
}

const Template: Story<React.ComponentProps<typeof Typeahead>> = args => {
  const options = React.useMemo(() => periodicElements, [])
  const [value, setValue] = React.useState<string>()
  return (
    <Typeahead
      {...args}
      onChange={(
        evt: React.ChangeEvent<HTMLInputElement> | null,
        selectedItem?: {
          label: React.ReactText
          value?: React.ReactText
        }
      ) => {
        setValue(evt?.target.value || '')
      }}
      options={options}
      value={value}
    />
  )
}

export const Basic = Template.bind({})
Basic.args = { ...defaultArgs }

export const BothInputAndAutoComplete = Template.bind({})
BothInputAndAutoComplete.args = {
  ...defaultArgs,
  'aria-autocomplete': 'both'
}

export const ReactNodeLabel = Template.bind({})
ReactNodeLabel.args = {
  ...defaultArgs
  // label: <Typeahead.Label>React node label</Typeahead.Label>
}

export const NoLabels = Template.bind({})
NoLabels.args = {
  ...defaultArgs,
  label: undefined,
  placeholder: 'Placeholder...', // NOTE: a11y requirement when there are no labels
  'aria-label': 'no label story typeahead',
  subLabel: undefined
}

export const Disabled = Template.bind({})
Disabled.args = { ...defaultArgs, disabled: true }

export const Error = Template.bind({})
Error.args = { ...defaultArgs, error: true }

export const IconPrefix = Template.bind({})
IconPrefix.args = { ...defaultArgs, prefix: <PlaceholderIcon /> }

export const CustomInputTag = Template.bind({})
CustomInputTag.args = {
  'aria-label': 'custom input tag with no label',
  renderInputTag: React.forwardRef((props, ref) => (
    <input
      {...props}
      ref={ref}
      placeholder="tag from render prop"
      style={{ outline: '1px dashed pink' }}
    />
  ))
}

export const CustomFilterFunction = Template.bind({})
const filterFunction: TypeaheadFilterFunction = (options, inputValue) =>
  options.filter(({ label }) =>
    `${label}`
      .toLowerCase()
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
      .startsWith((inputValue as string).toLowerCase())
  )
CustomFilterFunction.args = {
  ...defaultArgs,
  filterFunction
}
