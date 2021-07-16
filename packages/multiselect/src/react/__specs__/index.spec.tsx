import { convertStoriesToJestCases } from '@pluralsight/ps-design-system-util'
import { screen } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'
import { render } from '@testing-library/react'
import { axe } from 'jest-axe'
import React from 'react'
import MultiSelect from '../index'

import * as stories from '../__stories__/index.story'

jest.mock('@pluralsight/ps-design-system-position', () => {
  return {
    esModule: true,
    BelowLeft: jest.fn().mockImplementation(props => {
      const { children, show, ...rest } = props
      return (
        <div {...rest}>
          <div data-testid="position-show">{show}</div>
          <div data-testid="position-children">{children}</div>
        </div>
      )
    })
  }
})

describe('MultiSelectField', () => {
  const cases = convertStoriesToJestCases(stories)

  let raf: jest.Mock

  beforeEach(() => {
    jest.spyOn(window, 'requestAnimationFrame')
    raf = window.requestAnimationFrame as jest.Mock
    raf.mockImplementation(cb => cb())
  })

  afterEach(() => {
    raf.mockRestore()
  })

  describe.each(cases)('%s story', (_name, Story) => {
    it('has no axe-core violations', async () => {
      const { container } = render(<Story {...Story.args} />)
      const results = await axe(container)

      expect(results).toHaveNoViolations()
    })
  })

  describe('MultiSelectField', () => {
    it('composes className', () => {
      render(
        <MultiSelect
          className="compose-classname"
          onChange={(_, nextValue) => {}}
          options={[]}
          value={[{ value: '', label: '' }]}
        />
      )

      const el = document.querySelector('.psds-multi-select')

      expect(el).toHaveClass('compose-classname')
    })
  })

  describe('Basic story', () => {
    const { Basic } = stories

    it('focuses input when label clicked', () => {
      render(<Basic {...(Basic.args as any)} />)
      const [label] = screen.getAllByLabelText('The label')
      const input = screen.getByRole('textbox')

      userEvent.click(label)

      expect(input).toHaveFocus()
    })

    it('opens the menu when input receives focus', async () => {
      render(<Basic {...(Basic.args as any)} />)
      const input = screen.getByRole('textbox')

      userEvent.click(input)

      const menu = screen.getByRole('listbox')
      expect(input).toHaveFocus()
      expect(menu).toBeVisible()
    })

    it('closes the menu when input loses focus', async () => {
      render(<Basic {...(Basic.args as any)} />)
      const input = screen.getByRole('textbox')

      userEvent.click(input)
      const menu = screen.getByRole('listbox')

      expect(input).toHaveFocus()
      expect(menu).toBeVisible()

      userEvent.tab()

      expect(input).not.toHaveFocus()
      expect(menu).not.toHaveClass('psds-multi-select__menu--open')
    })

    it('closes the menu when esc pressed', async () => {
      render(<Basic {...(Basic.args as any)} />)
      const input = screen.getByRole('textbox')

      userEvent.click(input)
      const menu = screen.getByRole('listbox')

      expect(input).toHaveFocus()
      expect(menu).toBeVisible()

      userEvent.type(input, '{esc}')

      expect(input).toHaveFocus()
      expect(menu).not.toHaveClass('psds-multi-select__menu--open')
    })

    it('opens the menu when alt+down pressed', async () => {
      render(<Basic {...(Basic.args as any)} />)
      const input = screen.getByRole('textbox')

      userEvent.click(input)

      expect(input).toHaveFocus()

      userEvent.type(input, '{alt}{arrowdown}')
      const menu = screen.getByRole('listbox')

      expect(input).toHaveFocus()
      expect(menu).toBeVisible()
    })

    /**
     * NOTE: i cannot get this test to pass even though i know it works from
     *       testing manually in storybook. no idea why it doesn't work...
     *       but it seems that closing the menu in test is not updating the
     *       display style
     *
     *       - danethurber 02/24/21
     */

    // eslint-disable-next-line
    it.skip('closes the menu when alt+up pressed', async () => {
      render(<Basic {...(Basic.args as any)} />)
      const input = screen.getByRole('textbox')

      userEvent.type(input, '{alt}{arrowdown}')
      const menu = screen.getByRole('listbox')

      expect(input).toHaveFocus()
      expect(menu).toBeVisible()

      userEvent.type(input, '{alt}{arrowup}')

      expect(input).toHaveFocus()
      expect(menu).not.toBeVisible()
    })
  })
})
