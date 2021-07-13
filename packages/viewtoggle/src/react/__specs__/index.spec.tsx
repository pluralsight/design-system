import { convertStoriesToJestCases } from '@pluralsight/ps-design-system-util'
import { render } from '@testing-library/react'
import { axe } from 'jest-axe'
import React from 'react'

import ViewToggle from '../index'
import * as stories from '../__stories__/index.story'

describe('ViewToggle', () => {
  const cases = convertStoriesToJestCases(stories)

  it('forwards ref', () => {
    const ref = React.createRef<HTMLDivElement>()
    render(<ViewToggle ref={ref} />)
    expect(ref).not.toBeNull()
  })

  it('composes className', () => {
    const { container } = render(<ViewToggle className="compose-classname" />)

    expect(container.firstChild).toHaveClass(
      'psds-viewtoggle psds-theme--dark compose-classname'
    )
  })

  describe('.Option component', () => {
    it('exists', () => expect(ViewToggle.Option).toBeDefined())

    it('forwards ref', () => {
      const ref = React.createRef<HTMLButtonElement>()
      render(<ViewToggle.Option ref={ref} />)
      expect(ref).not.toBeNull()
    })
  })

  describe.each(cases)('%s story', (_name, Story) => {
    it('has no axe-core violations', async () => {
      const { container } = render(<Story {...Story.args} />)
      const results = await axe(container)

      expect(results).toHaveNoViolations()
    })
  })
})
