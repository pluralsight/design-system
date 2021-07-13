import { convertStoriesToJestCases } from '@pluralsight/ps-design-system-util'
import { axe } from 'jest-axe'
import React from 'react'
import { render } from '@testing-library/react'

import CircularProgress from '../index'
import * as stories from '../__stories__/index.story'

describe('CircularProgress', () => {
  const cases = convertStoriesToJestCases(stories)

  it('renders', () => {
    const { getByTestId } = render(
      <CircularProgress
        data-testid="mock-component"
        aria-label="course loading"
      />
    )

    expect(getByTestId('mock-component')).toBeInTheDocument()
  })

  it('forwards refs', () => {
    const ref = React.createRef<HTMLDivElement>()

    render(<CircularProgress ref={ref} aria-label="course loading" />)

    expect(ref.current).not.toBeNull()
  })

  it('composes className', () => {
    const { container } = render(
      <CircularProgress className="compose-classname" aria-label="someLabel" />
    )

    expect(container.firstChild).toHaveClass(
      'psds-circularprogress--size-medium compose-classname'
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
