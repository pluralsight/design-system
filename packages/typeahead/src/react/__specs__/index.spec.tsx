import { Story } from '@storybook/react/types-6-0'
import { screen, findByText, getByText } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'
import { render } from '@testing-library/react'
import { axe } from 'jest-axe'
import React from 'react'

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

describe('TypeaheadField', () => {
  const cases = generateCasesFromStories(stories)

  let raf: jest.Mock

  beforeEach(() => {
    jest.spyOn(window, 'requestAnimationFrame')
    raf = window.requestAnimationFrame as jest.Mock
    raf.mockImplementation(cb => cb())
  })

  afterEach(() => {
    raf.mockRestore()
  })

  // TODO: Re-enable when #1894 merges
  describe.skip.each(cases)('%s story', (_name, Story) => {
    it('should pass an basic axe a11y audit', async () => {
      const { container } = render(<Story {...Story.args} />)
      const results = await axe(container)

      expect(results).toHaveNoViolations()
    })
  })

  describe('Basic story', () => {
    const { Basic, CustomFilterFunction } = stories

    it('should focus input when label clicked', () => {
      render(<Basic {...(Basic.args as any)} />)
      const label = screen.getByText('The label')
      const input = screen.getByRole('textbox')

      userEvent.click(label)

      expect(input).toHaveFocus()
    })

    it('should open the menu when input receives focus', async () => {
      render(<Basic {...(Basic.args as any)} />)
      const input = await screen.findByRole('textbox')

      userEvent.click(input)
      const menu = await screen.findByRole('listbox')
      expect(input).toHaveFocus()
      expect(menu).toBeInTheDocument()
    })

    // TODO: reenable
    it.skip('should close the menu when input loses focus', async () => {
      render(<Basic {...(Basic.args as any)} />)
      const input = await screen.findByRole('textbox')

      userEvent.click(input)
      const menu = await screen.findByRole('listbox')

      expect(input).toHaveFocus()
      expect(menu).toBeInTheDocument()

      input.blur()
      expect(menu).not.toBeVisible()
    })

    // TODO: reenable
    it.skip('should close the menu when esc pressed', async () => {
      render(<Basic {...(Basic.args as any)} />)
      const input = await screen.findByRole('textbox')

      userEvent.click(input)
      const menu = await screen.findByRole('listbox')

      expect(input).toHaveFocus()
      expect(menu).toBeInTheDocument()
      userEvent.type(input, '{esc}')
      expect(menu).not.toBeVisible()
    })

    it('should open the menu when alt+down pressed', async () => {
      render(<Basic {...(Basic.args as any)} />)
      const input = screen.getByRole('textbox')

      userEvent.click(input)

      expect(input).toHaveFocus()

      userEvent.type(input, '{alt}{arrowdown}')
      const menu = await screen.findByRole('listbox')

      expect(input).toHaveFocus()
      expect(menu).toBeInTheDocument()
    })

    it('should filter using String.includes', async () => {
      render(<Basic {...(Basic.args as any)} />)
      const input = await screen.findByRole('textbox')

      userEvent.click(input)
      const menu = await screen.findByRole('listbox')
      expect(input).toHaveFocus()
      expect(menu).toBeInTheDocument()
      userEvent.type(input, 'on')
      expect(await findByText(menu, 'Boron')).toBeInTheDocument()
      expect(screen.queryByText('Hydrogen')).toBeNull()
    })

    it('should filter using String.startsWith', async () => {
      render(<CustomFilterFunction {...(CustomFilterFunction.args as any)} />)
      const input = await screen.findByRole('textbox')

      userEvent.click(input)
      const menu = await screen.findByRole('listbox')
      expect(input).toHaveFocus()
      expect(menu).toBeInTheDocument()
      userEvent.type(input, 'h')
      expect(await findByText(menu, 'Hydrogen')).toBeInTheDocument()
      expect(screen.queryByText('Boron')).toBeNull()
    })
  })
})

function generateCasesFromStories(
  obj: Record<string, unknown>
): [string, Story][] {
  const keys = Object.keys(obj)

  return keys.reduce<any>((acc, key) => {
    if (key === 'default') return acc
    return [...acc, [key, obj[key]]]
  }, [])
}
