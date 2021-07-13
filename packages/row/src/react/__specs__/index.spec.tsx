import { convertStoriesToJestCases } from '@pluralsight/ps-design-system-util'
import { screen, render } from '@testing-library/react'
import { axe } from 'jest-axe'
import React from 'react'

import Row from '../index'
import * as stories from '../__stories__/index.story'

describe('Row', () => {
  const cases = convertStoriesToJestCases(stories)

  it('renders', () => {
    const { getByTestId } = render(<Row data-testid="undertest" />)

    expect(getByTestId('undertest')).toBeInTheDocument()
  })

  it('forwards ref', () => {
    const ref = React.createRef<HTMLDivElement>()
    render(<Row ref={ref}></Row>)
    expect(ref).not.toBeNull()
  })

  it('composes className', () => {
    const { container } = render(<Row className="compose-classname" />)

    expect(container.firstChild).toHaveClass('psds-row  compose-classname')
  })

  it('composes className for Row.FullOverlayLink', () => {
    const { container } = render(
      <Row.FullOverlayLink className="compose-classname" />
    )

    expect(container.firstChild).toHaveClass(
      'psds-row__full-overlay-link  compose-classname'
    )
  })

  it('composes className for Row.Image', () => {
    const { container } = render(
      <Row.Image src="" className="compose-classname" />
    )

    expect(container.firstChild).toHaveClass(
      'psds-row__image  compose-classname'
    )
  })

  it('forwards className for Row.Text', () => {
    const { container } = render(<Row.Text className="compose-classname" />)

    expect(container.firstChild).toHaveClass('compose-classname')
  })

  it('forwards className for Row.TextLink', () => {
    const { container } = render(
      <Row.TextLink className="compose-classname">
        <a>link</a>
      </Row.TextLink>
    )

    expect(container.firstChild).toHaveClass(
      'psds-row__text-link compose-classname'
    )
  })

  describe('accessibility', () => {
    describe.each(cases)('%s story', (_name, Story) => {
      it('has no axe-core violations', async () => {
        const { container } = render(<Story {...Story.args} />)
        const results = await axe(container)
        expect(results).toHaveNoViolations()
      })
    })
  })
})
