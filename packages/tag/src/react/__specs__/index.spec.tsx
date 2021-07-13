import { convertStoriesToJestCases } from '@pluralsight/ps-design-system-util'
import { screen, render } from '@testing-library/react'
import { axe } from 'jest-axe'
import React from 'react'

import Tag from '../index'
import * as vars from '../../vars/index'

import * as stories from '../__stories__/index.story'

describe('Tag', () => {
  const cases = convertStoriesToJestCases(stories)

  describe('.sizes', () => {
    it('exists', () => {
      expect(Tag.sizes).toEqual(vars.sizes)
    })
  })

  it('forwards ref', () => {
    const ref = React.createRef<HTMLDivElement>()
    // @ts-ignore: ignore ref error this component is properly setup with forwardRef
    render(<Tag ref={ref} />)
    expect(ref).not.toBeNull()
  })

  it('composes className', () => {
    render(<Tag className="compose-classname" data-testid="undertest" />)
    const el = screen.getByTestId('undertest')
    expect(el).toHaveClass('psds-tag psds-theme--dark psds-tag--size-medium')
  })

  describe.each(cases)('%s story', (_name, Story) => {
    it('has no axe-core violations', async () => {
      const { container } = render(<Story {...Story.args} />)
      const results = await axe(container)

      expect(results).toHaveNoViolations()
    })
  })

  describe('Basic story', () => {
    const { Basic } = stories

    it('renders a div el', () => {
      render(<Basic data-testid="undertest" {...Basic.args} />)
      const el = screen.getByTestId('undertest')

      expect(el).toBeInTheDocument()
      expect(el.tagName.toLowerCase()).toEqual('div')
    })
  })

  describe('Link story', () => {
    const { Link } = stories

    it('renders an anchor el', () => {
      render(<Link data-testid="undertest" {...Link.args} />)
      const el = screen.getByTestId('undertest')

      expect(el).toBeInTheDocument()
      expect(el.tagName.toLowerCase()).toEqual('a')
    })
  })
})
