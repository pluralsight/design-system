import { convertStoriesToJestCases } from '@pluralsight/ps-design-system-util'
import { render } from '@testing-library/react'
import { axe } from 'jest-axe'
import React from 'react'

import NavCookieBanner from '../index'

import * as stories from '../__stories__/index.story'

describe('NavCookieBanner', () => {
  const cases = convertStoriesToJestCases(stories)

  it('forwards ref', () => {
    const ref = React.createRef<HTMLDivElement>()
    render(<NavCookieBanner ref={ref} />)
    expect(ref).not.toBeNull()
  })

  it('composes className', () => {
    const { container } = render(
      <NavCookieBanner className="compose-classname" />
    )

    expect(container.firstChild).toHaveClass(
      'psds-navcookiebanner compose-classname'
    )
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

    it('forwards className', () => {
      const { getByTestId } = render(
        <Basic data-testid="undertest" className="testclass" {...Basic.args} />
      )

      const el = getByTestId('undertest')
      expect(el).toHaveClass('testclass')
    })
  })
})
