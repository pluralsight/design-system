import CircularProgress from '@pluralsight/ps-design-system-circularprogress'
import { action } from '@storybook/addon-actions'
import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'

import Context, { initialContext } from '../context'
import Steps from '../index'
import { FixedWidthContainer } from './shared'

const { Step } = Steps

export default {
  title: 'Components/Steps/Step',
  component: Step,
  decorators: [
    StoryFn => (
      <FixedWidthContainer>
        <StoryFn />
      </FixedWidthContainer>
    )
  ]
} as Meta

export const Large: Story = () => {
  return (
    <Context.Provider value={{ ...initialContext, size: 'large' }}>
      <Step status="completed">Grapple case shot</Step>
    </Context.Provider>
  )
}

export const Medium: Story = () => {
  return (
    <Context.Provider value={{ ...initialContext, size: 'medium' }}>
      <Step status="completed">Grapple case shot</Step>
    </Context.Provider>
  )
}

export const LargeLongTitle: Story = () => {
  return (
    <Context.Provider value={{ ...initialContext, size: 'large' }}>
      <Step status="completed">
        Hang the jib measured fer yer chains aft list long clothes transom
        pinnace barque American Main cog.
      </Step>
    </Context.Provider>
  )
}

export const MediumLongTitle: Story = () => {
  return (
    <Context.Provider value={{ ...initialContext, size: 'medium' }}>
      <Step status="completed">
        Hang the jib measured fer yer chains aft list long clothes transom
        pinnace barque American Main cog.
      </Step>
    </Context.Provider>
  )
}

export const LargeDescription: Story = () => {
  return (
    <Context.Provider value={{ ...initialContext, size: 'large' }}>
      <Step
        description="Scuttle rigging booty pink six pounders code of conduct mizzen schooner scallywag long clothes."
        status="completed"
      >
        Fathom belaying pin
      </Step>
    </Context.Provider>
  )
}

export const MediumDescription: Story = () => {
  return (
    <Context.Provider value={{ ...initialContext, size: 'medium' }}>
      <Step
        description="Scuttle rigging booty pink six pounders code of conduct mizzen schooner scallywag long clothes."
        status="completed"
      >
        Fathom belaying pin
      </Step>
    </Context.Provider>
  )
}

export const LargeInteractive: Story = () => {
  return (
    <Context.Provider value={{ ...initialContext, size: 'large' }}>
      <Step
        description="Yo-ho-ho hardtack no prey, no pay crack Jennys tea cup draught case shot gally doubloon poop deck reef sails."
        onClick={action('clicked')}
        status="completed"
      >
        Gaff knave plunder
      </Step>
    </Context.Provider>
  )
}

export const MediumInteractive: Story = () => {
  return (
    <Context.Provider value={{ ...initialContext, size: 'medium' }}>
      <Step
        description="Yo-ho-ho hardtack no prey, no pay crack Jennys tea cup draught case shot gally doubloon poop deck reef sails."
        onClick={action('clicked')}
        status="completed"
      >
        Gaff knave plunder
      </Step>
    </Context.Provider>
  )
}

export const HideCounters: Story = () => {
  return (
    <Context.Provider
      value={{ ...initialContext, counter: false, size: 'medium' }}
    >
      <Step status="completed">Grapple case shot</Step>
      <Step status="current">Grapple case shot</Step>
      <Step status="incomplete">Grapple case shot</Step>
    </Context.Provider>
  )
}

export const CustomMarker: Story = () => {
  const ProgressMarker: React.FC<React.ComponentProps<typeof Steps.Marker>> =
    props => {
      const value = {
        incomplete: 0,
        current: 60,
        completed: 100
      }[props.status]

      return <CircularProgress size="small" value={value} aria-label="" />
    }

  return (
    <Context.Provider value={{ ...initialContext, size: 'medium' }}>
      <Step marker={ProgressMarker} status="completed">
        Grapple case shot
      </Step>

      <Step marker={ProgressMarker} status="current">
        Grapple case shot
      </Step>

      <Step marker={ProgressMarker} status="incomplete">
        Grapple case shot
      </Step>
    </Context.Provider>
  )
}
