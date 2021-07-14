import { action } from '@storybook/addon-actions'
import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'

import TextArea from '../index'

export default {
  title: 'Components/TextArea',
  component: TextArea
} as Meta

const Template: Story<React.ComponentProps<typeof TextArea>> = args => (
  <TextArea {...args} />
)

export const Label = Template.bind({})
Label.args = { label: 'Some label' }

export const NoLabel = Template.bind({})
NoLabel.args = { label: undefined }

export const SubLabel = Template.bind({})
SubLabel.args = { subLabel: 'Some sublabel' }

export const LabelAndSubLabel = Template.bind({})
LabelAndSubLabel.args = {
  label: 'Some label',
  subLabel: 'Some sublabel'
}

export const Placeholder = Template.bind({})
Placeholder.args = { placeholder: 'some placeholder' }

export const AllLabels: Story = () => (
  <>
    <TextArea
      label="Some label"
      placeholder="Some placeholder"
      subLabel="Some sub label"
      maxLength={23}
    />

    <TextArea
      appearance={TextArea.appearances.subtle}
      label="Some label"
      placeholder="Some placeholder"
      subLabel="Some sub label"
    />
  </>
)

export const ErrorCompare: Story = () => (
  <>
    <TextArea
      label="Normal"
      subLabel="Still normal"
      placeholder="I'm normal, see"
    />

    <TextArea
      label="I'm in an error state"
      subLabel="Here"
      error
      value="Wow, here is all the content wrapped up inside.Wow, here is all the content wrapped up inside.Wow, here is all the content wrapped up inside.   "
    />
  </>
)

export const DisabledCompare: Story = () => (
  <>
    <TextArea
      label="Normal"
      subLabel="Still normal"
      placeholder="I'm normal, see"
    />

    <TextArea
      label="I'm not usable"
      subLabel="Neither am I"
      disabled
      placeholder="I'm untouchable"
    />
  </>
)

export const MoreThanFourRows = Template.bind({})
MoreThanFourRows.args = { label: '6 rows of text', rows: 6 }

export const LessThanFourRows = Template.bind({})
LessThanFourRows.args = { label: 'Min height engages', rows: 1 }

export const PropName = Template.bind({})
PropName.args = {
  placeholder: 'I have a form name',
  name: 'myFieldNameOfPower'
}

export const PropOnChange = Template.bind({})
PropOnChange.args = {
  placeholder: 'Change me',
  onChange: action('I changed')
}

export const Focus = Template.bind({})
PropOnChange.args = {
  placeholder: 'Focus on me!',
  onBlur: action('Blurred'),
  onFocus: action('Focused')
}

export const FullWidthLayout: Story = () => (
  <div style={{ border: '1px solid blue', width: '800px' }}>
    <TextArea
      label="max-width still applies"
      style={{ display: 'block', width: '100%' }}
    />
    <TextArea
      error
      label="remove max-width"
      style={{ display: 'block', width: '100%', maxWidth: 'none' }}
    />
  </div>
)
