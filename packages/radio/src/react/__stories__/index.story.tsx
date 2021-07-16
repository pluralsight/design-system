import { colorsTextIcon, layout } from '@pluralsight/ps-design-system-core'
import { action } from '@storybook/addon-actions'
import { Meta, Story } from '@storybook/react/types-6-0'
import { DecoratorFn } from '@storybook/react'
import glamorDefault, * as glamorExports from 'glamor'
import React from 'react'

import Radio from '../index'

const glamor = glamorDefault || glamorExports

const PaddingDecorator: DecoratorFn = storyFn => (
  <div {...glamor.css({ height: '100vh', padding: layout.spacingLarge })}>
    {storyFn()}
  </div>
)

interface StoryArgs extends React.ComponentProps<typeof Radio.Group> {
  options: { label: string; value: React.ReactText }[]
}

const defaultArgs: StoryArgs = {
  label: 'The label',
  name: 'radio-name',
  onBlur: action('on blur'),
  onChange: action('on change'),
  onFocus: action('on focus'),
  options: [
    { label: 'Red', value: 'red' },
    { label: 'Green', value: 'green' },
    { label: 'Blue', value: 'blue' }
  ],
  placeholder: 'Some placeholder',
  subLabel: 'The sub label'
}

export default {
  title: 'Components/Radio',
  component: Radio.Group,
  decorators: [PaddingDecorator],
  parameters: { layout: 'fullscreen', center: { disabled: true } }
} as Meta

const Template: Story<StoryArgs> = args => {
  const { options, ...rest } = args

  return (
    <Radio.Group {...rest}>
      {options.map(option => (
        <Radio.Button
          key={option.value}
          label={option.label}
          value={option.value}
        />
      ))}
    </Radio.Group>
  )
}

export const Basic = Template.bind({})
Basic.args = { ...defaultArgs }

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

export const Disabled: Story = () => {
  const options = [
    { label: 'Red', value: 'red' },
    { label: 'Green', value: 'green', disabled: true },
    { label: 'Blue', value: 'blue' }
  ]
  return (
    <div>
      <Radio.Group disabled name="someName" label="Group disabled">
        {options.map(option => (
          <Radio.Button
            key={option.value}
            label={option.label}
            value={option.value}
          />
        ))}
      </Radio.Group>
      <Radio.Group name="anotherName" label="Individual button disabled">
        {options.map(option => (
          <Radio.Button
            key={option.value}
            label={option.label}
            value={option.value}
            disabled={option.disabled}
          />
        ))}
      </Radio.Group>
    </div>
  )
}

export const Error = Template.bind({})
Error.args = { ...defaultArgs, error: true }

export const PreSelected = Template.bind({})
PreSelected.args = { ...defaultArgs, value: defaultArgs.options[0].value }

export const Controlled: Story<StoryArgs> = args => {
  const { onChange, options, value: outerValue, ...rest } = args

  const [value, setValue] = React.useState(outerValue || options[1].value)

  React.useEffect(() => {
    if (!outerValue) return
    if (outerValue === value) return

    setValue(outerValue)
  }, [outerValue, value])

  const handleChange = (
    evt?: React.MouseEvent,
    nextValue?: React.ReactText
  ) => {
    if (!nextValue) return
    setValue(nextValue)

    if (onChange) onChange(evt, nextValue)
  }

  const handleButtonClick: React.MouseEventHandler<HTMLButtonElement> = evt => {
    handleChange(evt, 'blue')
  }

  return (
    <>
      <div style={{ color: colorsTextIcon.highOnDark }}>
        Selected: {value}
        <br />
        <button onClick={handleButtonClick}>set to blue</button>
      </div>

      <br />

      <Radio.Group onChange={handleChange} value={value} {...rest}>
        {options.map(option => (
          <Radio.Button
            key={option.value}
            label={option.label}
            value={option.value}
          />
        ))}
      </Radio.Group>
    </>
  )
}
Controlled.args = { ...defaultArgs }

export const MultipleStacked: Story<StoryArgs> = args => {
  const { options, ...rest } = args

  return (
    <>
      <Radio.Group {...rest}>
        {options.map(option => (
          <Radio.Button
            key={option.value}
            label={option.label}
            value={option.value}
          />
        ))}
      </Radio.Group>

      <Radio.Group {...rest}>
        {options.map(option => (
          <Radio.Button
            key={option.value}
            label={option.label}
            value={option.value}
          />
        ))}
      </Radio.Group>
    </>
  )
}
MultipleStacked.args = { ...defaultArgs, label: undefined, subLabel: undefined }
