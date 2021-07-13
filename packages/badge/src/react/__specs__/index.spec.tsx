import { convertStoriesToJestCases } from '@pluralsight/ps-design-system-util'
import { screen, render } from '@testing-library/react'
import { axe } from 'jest-axe'
import React from 'react'

import Badge from '../index'
import * as stories from '../__stories__/index.story'

describe('Badge', () => {
  const cases = convertStoriesToJestCases(stories)

  it('renders', () => {
    const { getByTestId } = render(
      <Badge data-testid="undertest">Render me</Badge>
    )

    expect(getByTestId('undertest')).toBeInTheDocument()
  })

  it('forwards ref', () => {
    const ref = React.createRef<HTMLDivElement>()
    render(<Badge ref={ref}>A label</Badge>)
    expect(ref).not.toBeNull()
  })

  it('composes className', () => {
    const { container } = render(<Badge className="compose-classname" />)

    expect(container.firstChild).toHaveClass('psds-badge compose-classname')
  })

  describe.each(cases)('%s story', (_name, Story) => {
    it('has no axe-core violations', async () => {
      const { container } = render(<Story {...Story.args} />)
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })
})
