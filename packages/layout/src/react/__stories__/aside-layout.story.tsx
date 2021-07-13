import { Meta, Story } from '@storybook/react/types-6-0'

import React from 'react'

import Button from '@pluralsight/ps-design-system-button'
import * as core from '@pluralsight/ps-design-system-core'
import Link from '@pluralsight/ps-design-system-link'

import { AsideLayout } from '..'

export default {
  title: 'Components/AsideLayout',
  component: AsideLayout
} as Meta

export const Positions: Story = () => (
  <div style={{ color: 'white', padding: '64px' }}>
    {Object.values(AsideLayout.asidePositions).map(position => (
      <div style={{ outline: '1px solid red' }} key={position}>
        <AsideLayout
          asidePosition={position}
          aside={
            <AsideLayout.Aside>
              This is ASIDE stuff that goes here. This is aside stuff that goes
              here. This is aside stuff that goes here. This is aside stuff that
              goes here.
            </AsideLayout.Aside>
          }
          main={
            <AsideLayout.Main>
              This is MAIN stuff that goes here. This is main stuff that goes
              here. This is main stuff that goes here. This is main stuff that
              goes here.
            </AsideLayout.Main>
          }
        />
      </div>
    ))}
  </div>
)
export const ShortMainContent: Story = () => (
  <div style={{ color: 'white' }}>
    <AsideLayout
      aside={
        <AsideLayout.Aside>
          This is aside stuff that goes here. This is aside stuff that goes
          here. This is aside stuff that goes here. This is aside stuff that
          goes here.
        </AsideLayout.Aside>
      }
      main={<AsideLayout.Main>Very little</AsideLayout.Main>}
    />
  </div>
)

export const ShortAsideContent: Story = () => (
  <div style={{ color: 'white' }}>
    <AsideLayout
      aside={<AsideLayout.Aside>Very short</AsideLayout.Aside>}
      main={
        <AsideLayout.Main>
          This is main stuff that goes here. This is main stuff that goes here.
          This is main stuff that goes here. This is main stuff that goes here.
        </AsideLayout.Main>
      }
    />
  </div>
)

export const WideFixedAsideContent: Story = () => (
  <div style={{ color: 'white' }}>
    <AsideLayout
      aside={
        <AsideLayout.Aside>
          <div style={{ width: '700px', height: '50px', background: 'red' }}>
            Fixed width thing, overflows
          </div>
        </AsideLayout.Aside>
      }
      main={
        <AsideLayout.Main>
          This is main stuff that goes here. This is main stuff that goes here.
          This is main stuff that goes here. This is main stuff that goes here.
        </AsideLayout.Main>
      }
    />
  </div>
)

export const AsideStyleOverride: Story = () => (
  <div style={{ color: 'white' }}>
    <AsideLayout
      aside={
        <AsideLayout.Aside style={{ overflow: 'hidden' }}>
          <div style={{ width: '700px', height: '50px', background: 'red' }}>
            Fixed width thing, overflow hidden by aside override
          </div>
        </AsideLayout.Aside>
      }
      main={
        <AsideLayout.Main>
          This is main stuff that goes here. This is main stuff that goes here.
          This is main stuff that goes here. This is main stuff that goes here.
        </AsideLayout.Main>
      }
    />
  </div>
)
