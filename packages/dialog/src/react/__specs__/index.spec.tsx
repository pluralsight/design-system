import { convertStoriesToJestCases } from '@pluralsight/ps-design-system-util'
import { render } from '@testing-library/react'
import { axe } from 'jest-axe'
import React from 'react'

import Dialog from '../index'
import * as stories from '../__stories__/index.story'

describe('Dialog', () => {
  const cases = convertStoriesToJestCases(stories)

  it('renders', () => {
    const { getByTestId } = render(
      <Dialog data-testid="undertest">Render me</Dialog>
    )

    expect(getByTestId('undertest')).toBeInTheDocument()
  })

  it('forwards ref', () => {
    const ref = React.createRef<HTMLDivElement>()
    render(<Dialog ref={ref}>A label</Dialog>)
    expect(ref).not.toBeNull()
  })

  it('composes className', () => {
    const { container } = render(
      <Dialog disableFocusOnMount className="compose-classname"></Dialog>
    )

    expect(container.firstChild).toHaveClass('psds-dialog compose-classname')
  })

  describe.each(cases)('%s story', (_name, Story) => {
    it('has no axe-core violations', async () => {
      const { container } = render(<Story {...Story.args} />)
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })
})
