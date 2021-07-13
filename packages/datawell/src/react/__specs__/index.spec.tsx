import { convertStoriesToJestCases } from '@pluralsight/ps-design-system-util'
import { render } from '@testing-library/react'
import { axe } from 'jest-axe'
import React from 'react'

import DataWell from '../index'
import * as stories from '../__stories__/index.story'

describe('DataWell', () => {
  const cases = convertStoriesToJestCases(stories)

  it('renders', () => {
    const { getByTestId } = render(
      <DataWell data-testid="undertest" label="Dog count">
        234,345
      </DataWell>
    )

    expect(getByTestId('undertest')).toBeInTheDocument()
  })

  it('forwards refs', () => {
    const ref = React.createRef<HTMLDivElement>()

    render(
      <DataWell ref={ref} label="Dog count">
        234,345
      </DataWell>
    )

    expect(ref.current).not.toBeNull()
  })

  it('composes className', () => {
    const { container } = render(
      <DataWell className="compose-classname" label="someLabel" />
    )

    expect(container.firstChild).toHaveClass('psds-datawell compose-classname')
  })

  describe.each(cases)('%s story', (_name, Story) => {
    it('has no axe-core violations', async () => {
      const { container } = render(<Story {...Story.args} />)
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })
})
