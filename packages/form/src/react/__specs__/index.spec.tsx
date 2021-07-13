import { convertStoriesToJestCases } from '@pluralsight/ps-design-system-util'
import { render } from '@testing-library/react'
import { axe } from 'jest-axe'
import React from 'react'

import Form from '../index'
import * as stories from '../__stories__/index.story'

const cases = convertStoriesToJestCases(stories)
describe('ButtonRow', () => {
  it('composes className', () => {
    const { container } = render(
      <Form.ButtonRow className="compose-classname" />
    )

    expect(container.firstChild).toHaveClass(
      'psds-form-button-row compose-classname'
    )
  })
})

describe('Divider', () => {
  it('composes className', () => {
    const { container } = render(<Form.Divider className="compose-classname" />)

    expect(container.firstChild).toHaveClass(
      'psds-form-divider compose-classname'
    )
  })
})

describe('VerticalLayout', () => {
  it('composes className', () => {
    const { container } = render(
      <Form.VerticalLayout className="compose-classname" />
    )

    expect(container.firstChild).toHaveClass(
      'psds-form-vertical-layout compose-classname'
    )
  })
})

describe.each(cases)('%s story', (_name, Story) => {
  it('has no axe-core violations', async () => {
    const { container } = render(<Story {...Story.args} />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
