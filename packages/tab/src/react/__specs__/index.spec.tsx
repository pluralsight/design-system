import { convertStoriesToJestCases } from '@pluralsight/ps-design-system-util'
import { render } from '@testing-library/react'
import { axe } from 'jest-axe'
import React from 'react'

import Tab from '../index'
import * as stories from '../__stories__/index.story'

describe('Tab', () => {
  const cases = convertStoriesToJestCases(stories)

  it('renders', () => {
    const { getByTestId } = render(
      <Tab.List data-testid="undertest"></Tab.List>
    )

    expect(getByTestId('undertest')).toBeInTheDocument()
  })

  it('forwards className', () => {
    const { container } = render(
      <Tab.Panel className="compose-classname" labelledBy="" />
    )

    expect(container.firstChild).toHaveClass('compose-classname')
  })

  it('composes className for Tab.List', () => {
    const { container } = render(<Tab.List className="compose-classname" />)

    expect(container.firstChild).toHaveClass(
      'compose-classname psds-tab__list psds-theme--dark'
    )
  })

  it('composes className for Tab.ListItem', () => {
    const { container } = render(
      <Tab.ListItem className="compose-classname" href="" id="" />
    )

    expect(container.firstChild).toHaveClass(
      'psds-tab__list-item compose-classname'
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
