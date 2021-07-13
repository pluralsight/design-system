import { convertStoriesToJestCases } from '@pluralsight/ps-design-system-util'
import { render } from '@testing-library/react'
import { axe } from 'jest-axe'
import React from 'react'

import { EqualColumnLayout } from '../index'
import * as stories from '../__stories__/equal-column-layout.story'

describe('EqualColumnLayout', () => {
  const cases = convertStoriesToJestCases(stories)

  it('renders', () => {
    const { getByTestId } = render(
      <EqualColumnLayout count={2} data-testid="undertest">
        <div>1</div>
        <div>2</div>
      </EqualColumnLayout>
    )

    expect(getByTestId('undertest')).toBeInTheDocument()
  })

  it('composes className', () => {
    const { container } = render(
      <EqualColumnLayout className="compose-classname" count={2} />
    )

    expect(container.firstChild).toHaveClass(
      'psds-equal-column-layout compose-classname'
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
