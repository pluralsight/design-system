import { convertStoriesToJestCases } from '@pluralsight/ps-design-system-util'
import { screen, render } from '@testing-library/react'
import { axe } from 'jest-axe'
import React from 'react'

import Tooltip from '../index'
import * as stories from '../__stories__/index.story'

describe('Tooltip', () => {
  const cases = convertStoriesToJestCases(stories)

  it('renders', () => {
    const { getByTestId } = render(
      <Tooltip data-testid="undertest">Render me</Tooltip>
    )

    expect(getByTestId('undertest')).toBeInTheDocument()
  })

  it('forwards ref', () => {
    const ref = React.createRef<HTMLDivElement>()
    render(<Tooltip ref={ref}>Render me</Tooltip>)
    expect(ref).not.toBeNull()
  })

  it('composes className', () => {
    const { container } = render(
      <Tooltip className="compose-classname">Render me</Tooltip>
    )

    expect(container.firstChild).toHaveClass(
      'psds-tooltip psds-tooltip--appearance-basic compose-classname'
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
