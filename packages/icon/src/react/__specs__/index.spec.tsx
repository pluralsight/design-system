import { convertStoriesToJestCases } from '@pluralsight/ps-design-system-util'
import { render } from '@testing-library/react'
import { axe } from 'jest-axe'
import React from 'react'

import Icon from '../index'
import * as Icons from '../icons'
import * as stories from '../__stories__/index.story'
import * as vars from '../../vars'

describe('Icon', () => {
  describe('.colors', () => {
    it('should be exposed', () => expect(Icon.colors).toEqual(vars.colors))
  })

  describe('.sizes', () => {
    it('should be exposed', () => expect(Icon.sizes).toEqual(vars.sizes))
  })

  it('forwards refs', () => {
    const ref = React.createRef<HTMLDivElement>()
    render(<Icon ref={ref} />)
    expect(ref.current).not.toBeNull()
  })

  it('composes className', () => {
    const { container } = render(<Icon className="compose-classname" />)

    expect(container.firstChild).toHaveClass('psds-icon compose-classname')
  })

  it('should allow overriding the aria-label of the svg', () => {
    const { container } = render(<Icons.SearchIcon aria-label="test label" />)
    const svg = container.querySelector('svg')
    expect(svg).toHaveAttribute('aria-label', 'test label')
  })

  const cases = convertStoriesToJestCases(stories)
  describe('accessibility', () => {
    describe.each(cases)('%s story', (_name, Story) => {
      it('has no axe-core violations', async () => {
        const { container } = render(<Story {...Story.args} />)
        const results = await axe(container)
        expect(results).toHaveNoViolations()
      })
    })
  })
})
