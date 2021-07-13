import { convertStoriesToJestCases } from '@pluralsight/ps-design-system-util'
import { render } from '@testing-library/react'
import { axe } from 'jest-axe'
import React from 'react'

import { AsideLayout } from '../index'
import * as stories from '../__stories__/aside-layout.story'

describe('AsideLayout', () => {
  const cases = convertStoriesToJestCases(stories)

  it('renders', () => {
    const { getByTestId } = render(
      <AsideLayout
        aside={<div></div>}
        main={<div></div>}
        data-testid="undertest"
      ></AsideLayout>
    )

    expect(getByTestId('undertest')).toBeInTheDocument()
  })

  it('composes className in AsideLayout', () => {
    const { container } = render(
      <AsideLayout
        className="compose-classname"
        main={<div />}
        aside={<div />}
      />
    )

    expect(container.firstChild).toHaveClass(
      'psds-aside-layout compose-classname'
    )
  })

  it('composes className in AsideLayout.Aside', () => {
    const { container } = render(
      <AsideLayout.Aside className="compose-classname" />
    )

    expect(container.firstChild).toHaveClass(
      'psds-aside-layout__aside compose-classname'
    )
  })

  it('composes className in AsideLayout.Main', () => {
    const { container } = render(
      <AsideLayout.Main className="compose-classname" />
    )

    expect(container.firstChild).toHaveClass(
      'psds-aside-layout__main compose-classname'
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
