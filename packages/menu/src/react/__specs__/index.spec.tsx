import { convertStoriesToJestCases } from '@pluralsight/ps-design-system-util'
import { fireEvent, screen } from '@testing-library/dom'
import { render } from '@testing-library/react'
import { axe } from 'jest-axe'
import React from 'react'

import { ItemContext } from '../context'
import Menu from '../index'
import * as stories from '../__stories__/index.story'

describe('Menu', () => {
  it('forwards ref', () => {
    const refToForward = React.createRef<HTMLUListElement>()

    render(
      <Menu ref={refToForward}>
        <Menu.Item>One item</Menu.Item>
      </Menu>
    )
    const menu = screen.queryByRole('menu')
    expect(menu).toBe(refToForward.current)
  })

  it('composes className in Menu', () => {
    const { container } = render(<Menu className="compose-classname" />)

    expect(container.firstChild).toHaveClass('psds-menu compose-classname')
  })

  it('composes className in selected Menu.Check', () => {
    const { container } = render(
      <ItemContext.Provider value={{ selected: true }}>
        <Menu.Check className="compose-classname" />
      </ItemContext.Provider>
    )

    expect(container.firstChild).toHaveClass(
      'psds-menu__item-icon compose-classname'
    )
  })

  it('composes className in unselected Menu.Check', () => {
    const { container } = render(<Menu.Check className="compose-classname" />)

    expect(container.firstChild).toHaveClass(
      'psds-menu__item-icon-filler compose-classname'
    )
  })

  it('composes className in Menu.Ellipsis', () => {
    const { container } = render(
      <Menu.Ellipsis className="compose-classname" />
    )

    expect(container.firstChild).toHaveClass(
      'psds-menu__ellipsis compose-classname'
    )
  })

  it('composes className in Menu.Item', () => {
    const { container } = render(<Menu.Item className="compose-classname" />)

    expect(container.firstChild).toHaveClass(
      'psds-menu__item compose-classname'
    )
  })

  it('fires onClick on option click', () => {
    const handleClick = jest.fn()

    render(
      <Menu onClick={handleClick}>
        <Menu.Item value={{ value: 'one', label: 'One item' }}>
          One item
        </Menu.Item>

        <Menu.Item
          value={{ value: 'two', label: 'Two item' }}
          data-testid="undertest"
        >
          Two item
        </Menu.Item>

        <Menu.Item value={{ value: 'three', label: 'Three item' }}></Menu.Item>
      </Menu>
    )

    const opt = screen.getByTestId('undertest')
    fireEvent.click(opt)

    expect(handleClick).toHaveBeenCalledWith(expect.anything(), {
      value: 'two',
      label: 'Two item'
    })
  })

  it('fires onClick on option keyDown', () => {
    const handleClick = jest.fn()

    render(
      <Menu onClick={handleClick}>
        <Menu.Item value={{ value: 'one', label: 'One item' }}>
          One item
        </Menu.Item>

        <Menu.Item
          value={{ value: 'one', label: 'Two item' }}
          data-testid="undertest"
        >
          Two item
        </Menu.Item>

        <Menu.Item value={{ value: 'one', label: 'Three item' }}>
          Three item
        </Menu.Item>
      </Menu>
    )

    const opt = screen.getByTestId('undertest')
    fireEvent.keyDown(opt, { key: 'Enter', code: 13 })

    expect(handleClick).toHaveBeenCalledWith(expect.anything(), {
      label: 'Two item',
      value: 'one'
    })
  })

  describe('Menu.Item', () => {
    it('should render an button by default', () => {
      const ref = React.createRef<HTMLButtonElement>()

      render(
        <Menu>
          <Menu.Item ref={ref}>test</Menu.Item>
        </Menu>
      )
      const el = screen.queryByRole('menu')
      // @ts-ignore: testing
      expect(el.tagName.toLowerCase()).toEqual('ul')
      expect(ref.current).not.toBeNull()
    })

    it('should render a button when `as` is `a`', () => {
      const ref = React.createRef<HTMLAnchorElement>()

      render(
        <Menu>
          <Menu.Item ref={ref} as="a">
            test
          </Menu.Item>
        </Menu>
      )
      const el = screen.getByRole('menuitem')
        .firstElementChild as HTMLAnchorElement

      expect(el.tagName.toLowerCase()).toEqual('a')
      expect(ref.current).not.toBeNull()
    })

    it('should render a button that is disabled`', () => {
      const ref = React.createRef<HTMLButtonElement>()

      render(
        <Menu>
          <Menu.Item disabled ref={ref}>
            test
          </Menu.Item>
        </Menu>
      )
      const el = screen.getByRole('menuitem')
        .firstElementChild as HTMLButtonElement

      expect(el.getAttribute('disabled')).toEqual('')
      expect(ref.current).not.toBeNull()
    })

    it('should render a anchor that is disabled`', () => {
      const ref = React.createRef<HTMLAnchorElement>()
      render(
        <Menu>
          <Menu.Item disabled ref={ref} as="a">
            test
          </Menu.Item>
        </Menu>
      )
      const el = screen.getByRole('menuitem')
        .firstElementChild as HTMLAnchorElement

      expect(el.getAttribute('disabled')).toEqual('')
      expect(ref.current).not.toBeNull()
    })

    it('should render a hyperlink when `tagName` is `a`', () => {
      const ref = React.createRef<HTMLAnchorElement>()
      render(
        <Menu>
          <Menu.Item href="/" ref={ref} as="a">
            test
          </Menu.Item>
        </Menu>
      )
      const el = screen.getByRole('menuitem')
        .firstElementChild as HTMLAnchorElement

      expect(el.tagName.toLowerCase()).toEqual('a')
      expect(ref.current).not.toBeNull()
    })
  })

  describe('accessibility', () => {
    const cases = convertStoriesToJestCases(stories).filter(story => {
      // TODO: re-enable after strategy for nested interactives figured out.
      return ![
        'ItemWithDescriptionSelected',
        'ActiveAndSelectedItem',
        'ActiveItem'
      ].includes(story[0])
    })
    describe.each(cases)('%s story', (_name, Story) => {
      it('has no axe-core violations', async () => {
        const { container } = render(<Story {...Story.args} />)
        const results = await axe(container)
        expect(results).toHaveNoViolations()
      })
    })
  })
})
