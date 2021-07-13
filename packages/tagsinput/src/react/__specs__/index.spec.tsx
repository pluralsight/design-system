import { convertStoriesToJestCases } from '@pluralsight/ps-design-system-util'
import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import React from 'react'

import * as stories from '../__stories__/index.story'
import TagsInput from '../index'

describe('TagsInput', () => {
  const cases = convertStoriesToJestCases(stories)

  it('composes className', () => {
    render(
      <TagsInput
        className="compose-classname"
        onChange={(_, nextValue) => {}}
        onKeyPress={() => {}}
        onSearchInputChange={() => {}}
        searchInputValue={''}
        value={[
          { label: 'first', value: 'first' },
          { label: 'second', value: 'second' }
        ]}
      />
    )
    const el = document.querySelector('.compose-classname')
    expect(el).toHaveClass('psds-tagsinput compose-classname')
  })

  describe.each(cases)('%s story', (_name, Story) => {
    it('has no axe-core violations', async () => {
      const { container } = render(<Story {...Story.args} />)
      const results = await axe(container)

      expect(results).toHaveNoViolations()
    })
  })

  describe('Basic story', () => {
    const { Basic } = stories

    it('focuses the input when label clicked', () => {
      render(<Basic {...(Basic.args as any)} />)
      const label = screen.getByLabelText('The label')
      const input = screen.getByRole('textbox')

      userEvent.click(label)

      expect(input).toHaveFocus()
    })
  })
})
