import { convertStoriesToJestCases } from '@pluralsight/ps-design-system-util'
import { render } from '@testing-library/react'
import { axe } from 'jest-axe'
import React from 'react'

import * as stories from '../__stories__/heading.story'
import { Heading } from '../index'

describe('Text', () => {
  describe('Heading', () => {
    const cases = convertStoriesToJestCases(stories)

    it.todo('forwards the ref')

    it('composes className', () => {
      const { container } = render(
        <Heading className="compose-classname">
          <h1>test</h1>
        </Heading>
      )

      expect(container.firstChild).toHaveClass(
        'psds-text__heading compose-classname'
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
