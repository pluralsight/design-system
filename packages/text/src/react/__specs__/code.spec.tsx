import { convertStoriesToJestCases } from '@pluralsight/ps-design-system-util'
import { render } from '@testing-library/react'
import { axe } from 'jest-axe'
import React from 'react'

import * as stories from '../__stories__/code.story'
import { Code } from '../index'

describe('Text', () => {
  describe('Code', () => {
    const cases = convertStoriesToJestCases(stories)

    it.todo('forwards the ref')

    it('composes className', () => {
      const { container } = render(
        <Code className="compose-classname">inline code</Code>
      )

      expect(container.firstChild).toHaveClass(
        'psds-text__code compose-classname'
      )
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
