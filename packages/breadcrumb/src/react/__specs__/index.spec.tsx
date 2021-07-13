import { convertStoriesToJestCases } from '@pluralsight/ps-design-system-util'
import { fireEvent, render } from '@testing-library/react'
import { axe } from 'jest-axe'
import React from 'react'

import Breadcrumb from '../index'
import * as stories from '../__stories__/index.story'

describe('Breadcrumb', () => {
  const cases = convertStoriesToJestCases(stories)
  it('forwards refs', () => {
    const ref = React.createRef<HTMLButtonElement>()
    render(
      <Breadcrumb onClick={jest.fn()} ref={ref}>
        Clicks once
      </Breadcrumb>
    )

    expect(ref.current).not.toBeNull()
  })

  it('composes className', () => {
    const { container } = render(
      <Breadcrumb className="compose-classname"></Breadcrumb>
    )

    expect(container.firstChild).toHaveClass(
      'psds-breadcrumb compose-classname'
    )
  })

  describe.each(cases)('%s story', (_name, Story) => {
    it('has no axe-core violations', async () => {
      const { container } = render(<Story {...Story.args} />)
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })

  describe('when disabled', () => {
    it('does not allow clicks', () => {
      const handleClick = jest.fn()
      const { container } = render(
        <Breadcrumb disabled onClick={handleClick}>
          Clicks once
        </Breadcrumb>
      )
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
      const button = container.querySelector('button') as HTMLButtonElement

      fireEvent.click(button)

      expect(handleClick).not.toHaveBeenCalled()
    })
  })
})
