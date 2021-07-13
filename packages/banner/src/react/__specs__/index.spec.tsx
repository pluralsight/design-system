import { convertStoriesToJestCases } from '@pluralsight/ps-design-system-util'
import { render } from '@testing-library/react'
import { axe } from 'jest-axe'
import React from 'react'

import Banner from '../index'
import * as stories from '../__stories__/index.story'

describe('Banner', () => {
  const cases = convertStoriesToJestCases(stories)

  it('renders', () => {
    const { getByTestId } = render(
      <Banner data-testid="undertest">text</Banner>
    )

    expect(getByTestId('undertest')).toBeInTheDocument()
  })

  it('composes className', () => {
    const { container } = render(<Banner className="compose-classname" />)

    expect(container.firstChild).toHaveClass('psds-banner compose-classname')
  })

  describe.each(cases)('% story', (_name, Story) => {
    it('has no axe-core violations', async () => {
      const { container } = render(<Story {...Story.args} />)
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })

  it('forwards refs', () => {
    const ref = React.createRef<HTMLDivElement>()
    const buttonRef = React.createRef<HTMLButtonElement>()

    render(
      <Banner ref={ref}>
        text <Banner.Button ref={buttonRef}>button</Banner.Button>
      </Banner>
    )

    expect(ref.current).not.toBeNull()
    expect(buttonRef.current).not.toBeNull()
  })
})
