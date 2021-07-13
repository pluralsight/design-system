import { convertStoriesToJestCases } from '@pluralsight/ps-design-system-util'
import { render } from '@testing-library/react'
import { axe } from 'jest-axe'
import React from 'react'

import * as stories from '../__stories__/p.story'
import { P } from '../index'

describe('Text', () => {
  describe('P', () => {
    const cases = convertStoriesToJestCases(stories)

    it.todo('forwards the ref')

    it('composes className', () => {
      const { container } = render(<P className="compose-classname" />)

      expect(container.firstChild).toHaveClass('psds-text__p compose-classname')
    })

    it.todo('supports polymorphism')

    describe.each(cases)('%s story', (_name, Story) => {
      it('has no axe-core violations', async () => {
        const { container } = render(<Story {...Story.args} />)
        const results = await axe(container)

        expect(results).toHaveNoViolations()
      })
    })
  })
})
