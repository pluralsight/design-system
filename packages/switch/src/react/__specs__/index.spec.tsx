import { convertStoriesToJestCases } from '@pluralsight/ps-design-system-util'
import { fireEvent, screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import React from 'react'

import Switch from '../index'

import * as stories from '../__stories__/index.story'

describe('Switch', () => {
  const cases = convertStoriesToJestCases(stories)

  it('forwards ref', () => {
    const ref = React.createRef<HTMLLabelElement>()
    render(<Switch ref={ref} />)
    expect(ref).not.toBeNull()
  })

  it('composes className', () => {
    const { container } = render(<Switch className="compose-classname" />)
    console.log(container.firstChild)
    expect(container.firstChild).toHaveClass('compose-classname psds-switch')
  })

  describe('accessibility', () => {
    describe.each(cases)('%s story', (_name, Story) => {
      it('has no axe-core violations', async () => {
        const { container } = render(<Story {...Story.args} />)
        const results = await axe(container)

        expect(results).toHaveNoViolations()
      })
    })

    it('is tab focusable', () => {
      render(<Switch />)
      const el = screen.getAllByRole('checkbox')[0]
      userEvent.tab()

      expect(el).toHaveFocus()
    })

    it('disabled is not tab focusable', () => {
      render(<Switch disabled />)
      const el = screen.getAllByRole('checkbox')[0]
      userEvent.tab()

      expect(el).not.toHaveFocus()
    })
  })

  describe('Basic story', () => {
    const { Basic } = stories

    it('forwards className', () => {
      render(
        <Basic data-testid="undertest" className="testclass" {...Basic.args} />
      )

      const el = screen.getByTestId('undertest')
      expect(el).toHaveClass('testclass')
    })

    it('clicking the label calls the onClick handler', () => {
      const handleClick = jest.fn()

      const { container } = render(
        <Basic {...Basic.args} onClick={handleClick} />
      )

      const label = container.querySelector('label')!
      fireEvent.click(label)

      expect(handleClick).toHaveBeenCalled()
    })

    it('clicking the input calls the onClick handler', () => {
      const handleClick = jest.fn()

      const { container } = render(
        <Basic {...Basic.args} onClick={handleClick} />
      )

      const input = container.querySelector('input')!
      fireEvent.click(input)

      expect(handleClick).toHaveBeenCalled()
    })
  })
})
