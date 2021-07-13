import { convertStoriesToJestCases } from '@pluralsight/ps-design-system-util'
import { render, screen, fireEvent } from '@testing-library/react'
import { axe } from 'jest-axe'
import React from 'react'

import Scrollable from '../index'

import * as stories from '../__stories__/index.story'

describe('Scrollable', () => {
  const cases = convertStoriesToJestCases(stories)

  it('composes className', () => {
    const { container } = render(<Scrollable className="compose-classname" />)

    expect(container.firstChild).toHaveClass(
      'compose-classname psds-scrollable__outer'
    )
  })

  it('forwards the ref', () => {
    const ref = React.createRef<HTMLDivElement>()
    render(<Scrollable ref={ref} />)
    expect(ref).not.toBeNull()
  })

  it('calls passed onScroll handlers', () => {
    const ref = React.createRef<HTMLDivElement>()
    const onScroll = jest.fn()
    render(<Scrollable ref={ref} onScroll={onScroll} />)
    fireEvent.scroll(ref.current as Element, { target: { scrollY: 25 } })

    expect(onScroll).toHaveBeenCalled()
  })

  describe.each(cases)('%s story', (_name, Story) => {
    it('has no axe-core violations', async () => {
      const { container } = render(<Story {...Story.args} />)
      const results = await axe(container)

      expect(results).toHaveNoViolations()
    })
  })
})
