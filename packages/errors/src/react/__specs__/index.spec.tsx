import { convertStoriesToJestCases } from '@pluralsight/ps-design-system-util'
import { render } from '@testing-library/react'
import { axe } from 'jest-axe'
import React from 'react'

import ErrorPage from '../index'
import * as stories from '../__stories__/index.story'

describe('ErrorPage', () => {
  const cases = convertStoriesToJestCases(stories)

  it('renders', () => {
    const { getByTestId } = render(
      <ErrorPage
        data-testid="undertest"
        heading={<ErrorPage.Heading>Wow</ErrorPage.Heading>}
      />
    )

    expect(getByTestId('undertest')).toBeInTheDocument()
  })

  it('composes className in ErrorPage', () => {
    const { container } = render(
      <ErrorPage className="compose-classname" heading={<div />} />
    )

    expect(container.firstChild).toHaveClass('psds-errorpage compose-classname')
  })

  it('composes className in ErrorPage.Actions', () => {
    const { container } = render(
      <ErrorPage.Actions className="compose-classname" />
    )

    expect(container.firstChild).toHaveClass(
      'psds-errorpage__actions compose-classname'
    )
  })

  it('composes className in ErrorPage.Caption', () => {
    const { container } = render(
      <ErrorPage.Caption className="compose-classname" />
    )

    expect(container.firstChild).toHaveClass(
      'psds-errorpage__caption compose-classname'
    )
  })

  it('composes className in ErrorPage.ErrorCode', () => {
    const { container } = render(
      <ErrorPage.ErrorCode className="compose-classname" />
    )

    expect(container.firstChild).toHaveClass(
      'psds-errorpage__error-code compose-classname'
    )
  })

  it('composes className in ErrorPage.Heading', () => {
    const { container } = render(
      <ErrorPage.Heading className="compose-classname" />
    )

    expect(container.firstChild).toHaveClass(
      'psds-errorpage__heading compose-classname'
    )
  })

  it('composes className in ErrorPage.Illustration', () => {
    const { container } = render(
      <ErrorPage.Illustration className="compose-classname" />
    )

    expect(container.firstChild).toHaveClass(
      'psds-errorpage__illustration compose-classname'
    )
  })

  it('forwards ref', () => {
    const ref = React.createRef<HTMLDivElement>()
    render(
      <ErrorPage
        ref={ref}
        heading={<ErrorPage.Heading>Wow</ErrorPage.Heading>}
      />
    )
    expect(ref).not.toBeNull()
  })

  describe.each(cases)('%s story', (_name, Story) => {
    it('has no axe-core violations', async () => {
      const { container } = render(<Story {...Story.args} />)
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })
})
