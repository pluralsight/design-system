import { convertStoriesToJestCases } from '@pluralsight/ps-design-system-util'
import { render } from '@testing-library/react'
import { axe } from 'jest-axe'
import React from 'react'

import { PageWidthLayout } from '../index'
import * as stories from '../__stories__/page-width-layout.story'

describe('PageWidthLayout', () => {
  const cases = convertStoriesToJestCases(stories)

  it('renders', () => {
    const { getByTestId } = render(
      <PageWidthLayout data-testid="undertest">
        <div>something special</div>
      </PageWidthLayout>
    )

    expect(getByTestId('undertest')).toBeInTheDocument()
  })

  it('composes className', () => {
    const { container } = render(
      <PageWidthLayout className="compose-classname" />
    )

    expect(container.firstChild).toHaveClass(
      'psds-page-width-layout compose-classname'
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
