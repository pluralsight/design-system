import { convertStoriesToJestCases } from '@pluralsight/ps-design-system-util'
import { render } from '@testing-library/react'
import { axe } from 'jest-axe'
import React from 'react'

import ScreenReaderOnly from '../index'

import * as stories from '../__stories__/index.story'

describe('ScreenReaderOnly', () => {
  const cases = convertStoriesToJestCases(stories)

  it('forwards the ref', () => {
    const ref = React.createRef<HTMLDivElement>()

    render(<ScreenReaderOnly ref={ref} />)
    expect(ref).not.toBeNull()
  })

  it('composes className', () => {
    const { container } = render(
      <ScreenReaderOnly className="compose-classname" />
    )

    expect(container.firstChild).toHaveClass(
      'psds-screenreader-only compose-classname'
    )
  })

  it('supports polymorphism', () => {
    expect.assertions(0)

    render(
      <ScreenReaderOnly as="span" ref={React.createRef<HTMLSpanElement>()} />
    )
    render(
      <ScreenReaderOnly
        as="button"
        ref={React.createRef<HTMLButtonElement>()}
      />
    )
  })

  describe.each(cases)('%s story', (_name, Story) => {
    it('has no axe-core violations', async () => {
      const { container } = render(<Story {...Story.args} />)
      const results = await axe(container)

      expect(results).toHaveNoViolations()
    })
  })
})
