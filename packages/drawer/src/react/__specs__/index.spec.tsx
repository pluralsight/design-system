import { convertStoriesToJestCases } from '@pluralsight/ps-design-system-util'
import { fireEvent, render } from '@testing-library/react'
import { axe } from 'jest-axe'
import React from 'react'

import Drawer from '../index'
import * as stories from '../__stories__/index.story'

describe('Drawer', () => {
  describe('when uncontrolled', () => {
    it('toggles open/close', async () => {
      const { getByTestId } = render(
        <Drawer>
          <Drawer.Summary data-testid="summary">
            <p>Click me to open</p>
          </Drawer.Summary>
          <Drawer.Details data-testid="details">
            <p>Drawer Content here</p>
          </Drawer.Details>
        </Drawer>
      )

      const btn = getByTestId('summary')
      const contentWrapper = getByTestId('details')
      expect(contentWrapper).toHaveAttribute('aria-hidden', 'true')
      fireEvent.click(btn)
      expect(contentWrapper).toHaveAttribute('aria-hidden', 'false')
      fireEvent.click(btn)
      expect(contentWrapper).toHaveAttribute('aria-hidden', 'true')
    })
  })

  it('when controlled', () => {
    const Controlled = () => {
      const [open, setOpen] = React.useState(false)
      return (
        <Drawer onToggle={() => setOpen(!open)} isOpen={open}>
          <Drawer.Summary data-testid="summary">
            <p>Click me to open</p>
          </Drawer.Summary>
          <Drawer.Details data-testid="details">
            <p>Drawer Content here</p>
          </Drawer.Details>
        </Drawer>
      )
    }
    const { getByTestId } = render(<Controlled />)
    const btn = getByTestId('summary')
    const contentWrapper = getByTestId('details')
    expect(contentWrapper).toHaveAttribute('aria-hidden', 'true')
    fireEvent.click(btn)
    expect(contentWrapper).toHaveAttribute('aria-hidden', 'false')
    fireEvent.click(btn)
    expect(contentWrapper).toHaveAttribute('aria-hidden', 'true')
  })

  it('composes className in Drawer.Summary', () => {
    const { container } = render(
      <Drawer.Summary className="compose-classname" />
    )

    expect(container.firstChild).toHaveClass(
      'psds-drawer__summary compose-classname'
    )
  })

  it('composes className in Drawer.Details', () => {
    const { container } = render(
      <Drawer.Details className="compose-classname" />
    )

    expect(container.firstChild).toHaveClass(
      'psds-drawer__details compose-classname'
    )
  })

  const cases = convertStoriesToJestCases(stories)
  describe.each(cases)('%s story', (_name, Story) => {
    it('has no axe-core violations', async () => {
      const { container } = render(<Story {...Story.args} />)
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })
})
