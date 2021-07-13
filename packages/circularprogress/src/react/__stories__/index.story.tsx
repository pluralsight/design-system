import { Meta, Story } from '@storybook/react/types-6-0'
import * as core from '@pluralsight/ps-design-system-core'
import React from 'react'
import { storiesOf } from '@storybook/react'

import CircularProgress from '../../index'

export default {
  title: 'Components/CircularProgress',
  component: CircularProgress
} as Meta

export const ValuesAndSizes: Story = () => (
  <StoryGrid cols={Object.keys(CircularProgress.sizes).length + 1}>
    {[0, 25, 33, 50, 66, 75, 100].reduce<(Element | JSX.Element)[]>(
      (acc, value) => [
        ...acc,
        <div key={'val' + value}>{value}</div>,
        ...Object.values(CircularProgress.sizes).map(size => (
          <CircularProgress
            aria-label="course loading"
            key={size + value}
            value={value}
            size={size}
          />
        ))
      ],
      []
    )}
    <div>Indeterminate</div>
    {Object.values(CircularProgress.sizes).map(size => (
      <CircularProgress aria-label="course loading" size={size} key={size} />
    ))}
  </StoryGrid>
)

export const Animation: Story = () => {
  const AnimationDemo = () => {
    const [value, updateValue] = React.useState(0)

    React.useEffect(function () {
      const interval = setInterval(() => {
        const rando = Math.random() * 115
        updateValue(rando)
      }, 1500)

      return () => clearInterval(interval)
    }, [])

    return (
      <div>
        <CircularProgress aria-label="course loading" value={value} />

        <div style={{ color: core.colorsTextIcon.highOnDark }}>
          Value: {value}
        </div>
      </div>
    )
  }

  return <AnimationDemo />
}

export const StyleOverride: Story = () => (
  <CircularProgress
    aria-label="course loading"
    style={{ outline: '1px solid red' }}
  />
)

const StoryGrid: React.FC<{ cols?: number }> = props => {
  const { cols = 2, ...rest } = props

  return (
    <div
      style={{
        display: 'grid',
        gap: '20px',
        gridTemplateColumns: Array(cols).fill('1fr').join(' '),
        alignItems: 'center',
        justifyItems: 'left'
      }}
      {...rest}
    />
  )
}
