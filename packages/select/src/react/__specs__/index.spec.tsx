import { convertStoriesToJestCases } from '@pluralsight/ps-design-system-util'
import { fireEvent, screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import React from 'react'

import Select from '../index'
import * as vars from '../../vars/index'

import * as stories from '../__stories__/index.story'

const pressArrowDown = (el = document?.activeElement) => {
  fireEvent.keyDown(el as HTMLElement, { key: 'ArrowDown', code: 'ArrowDown' })
}
const pressArrowUp = (el = document?.activeElement) => {
  fireEvent.keyDown(el as HTMLElement, { key: 'ArrowUp', code: 'ArrowUp' })
}
const pressEnter = (el = document?.activeElement) => {
  fireEvent.keyDown(el as HTMLElement, { key: 'Enter', code: 'Enter' })
}
const pressEscape = () => {
  fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' })
}
const pressSpace = (el = document?.activeElement) => {
  fireEvent.keyDown(el as HTMLElement, { key: ' ', code: 'Space' })
}

describe('Select', () => {
  const cases = convertStoriesToJestCases(stories)

  it('forwards ref', () => {
    const ref = React.createRef<HTMLButtonElement>()
    render(<Select ref={ref} />)
    expect(ref).not.toBeNull()
  })

  it('composes className for Select/Select.Button', () => {
    // Always forwards to Select.Button so this test for that component to
    const { container } = render(<Select className="compose-classname" />)

    expect(container.firstChild).toHaveClass(
      'compose-classname psds-select__button'
    )
  })

  it('composes className for Select.Selected', () => {
    // Always forwards to Select.Button so this test for that component to
    const { container } = render(
      <Select.Selected
        className="compose-classname"
        placeholder="placeholder"
        selectedItem={{ label: 'placeholder', value: 'placeholder' }}
      />
    )

    expect(container.firstChild).toHaveClass(
      'compose-classname psds-select__selected'
    )
  })

  describe('.Button component', () => {
    it('exists', () => expect(Select.Button).toBeDefined())

    it('forwards ref', () => {
      const ref = React.createRef<HTMLButtonElement>()
      render(<Select.Button ref={ref} />)
      expect(ref).not.toBeNull()
    })
  })

  describe('.Selected component', () => {
    it('exists', () => expect(Select.Selected).toBeDefined())
  })

  describe.each(cases)('%s story', (_name, Story) => {
    it('has no axe-core violations', async () => {
      const { container } = render(<Story {...Story.args} />)
      const results = await axe(container)

      expect(results).toHaveNoViolations()
    })
  })

  describe('.sizes', () => {
    it('exists', () => {
      expect(Select.sizes).toEqual(vars.sizes)
    })
  })

  describe('Basic story', () => {
    const { Basic } = stories

    it('button click opens the menu', async () => {
      render(<Basic {...(Basic.args as any)} />)

      const button = screen.getByRole('button', { name: /Select/ })
      userEvent.click(button)

      const menu = await screen.findByRole('listbox')
      expect(menu).toBeInTheDocument()
    })

    it('disabled click does NOT open the menu', () => {
      render(<Basic {...(Basic.args as any)} disabled />)

      const button = screen.getByRole('button', { name: /Select/ })
      userEvent.click(button)

      const menu = screen.queryByRole('listbox')
      expect(menu).not.toBeInTheDocument()
    })

    it('pressing Space opens the menu', async () => {
      render(<Basic {...(Basic.args as any)} />)

      const button = screen.getByRole('button', { name: /Select/ })
      button.focus()

      pressSpace()

      const menu = await screen.findByRole('listbox')
      expect(menu).toBeInTheDocument()
    })

    it('pressing Enter opens the menu', async () => {
      render(<Basic {...(Basic.args as any)} />)

      const button = screen.getByRole('button', { name: /Select/ })
      button.focus()

      pressEnter()

      const menu = await screen.findByRole('listbox')
      expect(menu).toBeInTheDocument()
    })

    it('pressing ArrowDown opens the menu', async () => {
      render(<Basic {...(Basic.args as any)} />)

      const button = screen.getByRole('button', { name: /Select/ })
      button.focus()

      pressArrowDown()

      const menu = await screen.findByRole('listbox')
      expect(menu).toBeInTheDocument()
    })

    it('pressing Escape closes the menu', async () => {
      let menu
      render(<Basic {...(Basic.args as any)} />)

      const button = screen.getByRole('button', { name: /Select/ })
      button.focus()

      pressArrowDown()

      menu = await screen.findByRole('listbox')
      expect(menu).toBeInTheDocument()

      pressEscape()

      menu = screen.queryByRole('listbox')
      expect(menu).not.toBeInTheDocument()
    })

    it('click selects an item', async () => {
      render(<Basic {...(Basic.args as any)} />)

      const button = screen.getByRole('button', { name: /Select/ })
      userEvent.click(button)

      const item = await screen.findByRole('option', { name: /Can edit/ })
      userEvent.click(item)

      expect(button).toHaveTextContent('Can edit')
    })

    it('navigates by arrows, selects by enter', async () => {
      render(<Basic {...(Basic.args as any)} />)

      const button = screen.getByRole('button', { name: /Select/ })
      button.focus()
      pressEnter()

      const menu = await screen.findByRole('listbox')

      pressArrowDown()
      pressArrowUp()
      pressArrowUp()
      pressEnter()

      expect(button).toHaveTextContent('Make Owner')
      expect(menu).not.toBeInTheDocument()
    })

    it('re-navigates, active index is maintained on selection', async () => {
      render(<Basic {...(Basic.args as any)} />)

      const button = screen.getByRole('button', { name: /Select/ })
      button.focus()
      pressEnter()

      await screen.findByRole('listbox')

      pressArrowDown()
      pressArrowUp()
      pressArrowUp()
      pressEnter()

      expect(button).toHaveTextContent('Make Owner')

      button.focus()
      pressEnter()

      await screen.findByRole('listbox')

      pressArrowDown()
      pressArrowDown()
      pressEnter()

      expect(button).toHaveTextContent('Can edit')
    })

    it('select button onClick is triggered', async () => {
      const onClick = jest.fn()
      render(<Basic {...(Basic.args as any)} onClick={onClick} />)

      const button = screen.getByRole('button', { name: /Select/ })
      userEvent.click(button)

      expect(onClick).toHaveBeenCalledTimes(1)

      const item = await screen.findByRole('option', { name: /Can edit/ })
      userEvent.click(item)

      expect(onClick).toHaveBeenCalledTimes(1)
    })

    it('calls on change with click on label text', async () => {
      const onChange = jest.fn()
      render(<Basic {...(Basic.args as any)} onChange={onChange} />)

      const button = screen.getByRole('button', { name: /Select/ })
      userEvent.click(button)

      const item = await screen.findByRole('option', { name: /Can edit/ })
      userEvent.click(item)

      expect(onChange).toHaveBeenCalledWith(expect.any(Object), {
        value: 'Can edit',
        label: 'Can edit'
      })
    })

    it('calls on change with keydown on value', async () => {
      const onChange = jest.fn()
      render(<Basic {...(Basic.args as any)} onChange={onChange} />)

      const button = screen.getByRole('button', { name: /Select/ })
      button.focus()
      pressEnter()

      await screen.findByRole('listbox')

      pressArrowDown()
      pressEnter()

      expect(onChange).toHaveBeenCalledWith(expect.any(Object), {
        value: 'Can edit',
        label: 'Can edit'
      })
    })
  })
})
