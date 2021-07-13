import { convertStoriesToJestCases } from '@pluralsight/ps-design-system-util'
import { fireEvent, screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import React from 'react'

import SearchInput from '../index'
import * as stories from '../__stories__/index.story'

describe('SearchInput', () => {
  const cases = convertStoriesToJestCases(stories)

  it('forwards the ref', () => {
    const ref = React.createRef<HTMLInputElement>()
    render(<SearchInput ref={ref} />)
    expect(ref).not.toBeNull()
  })

  it('composes className', () => {
    // Always forwards to Select.Button so this test for that component to
    const { container } = render(<SearchInput className="compose-classname" />)

    expect(container.firstChild).toHaveClass(
      'compose-classname psds-searchinput'
    )
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

    it('forwards id', () => {
      render(<Basic id="testid" {...Basic.args} />)

      const input = document.querySelector('#testid')
      expect(input).toBeInTheDocument()
    })

    it('focuses the input when clear button clicked', () => {
      render(<Basic {...Basic.args} />)

      const input = screen.getByRole('searchbox')
      const clearBtn = screen.getByRole('button')

      fireEvent.click(clearBtn)

      expect(input).toHaveFocus()
    })

    it('clears input when clear button clicked', () => {
      render(<Basic {...Basic.args} />)

      const input = screen.getByRole('searchbox')
      const clearBtn = screen.getByRole('button')

      userEvent.type(input, 'Hello World!')
      expect(input).toHaveValue('Hello World!')

      fireEvent.click(clearBtn)

      expect(input).toHaveValue('')
    })
  })
})
