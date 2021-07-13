import { convertStoriesToJestCases } from '@pluralsight/ps-design-system-util'
import { render, fireEvent } from '@testing-library/react'
import { axe } from 'jest-axe'
import React from 'react'

import ActionMenu from '../index'
import * as stories from '../__stories__/index.story'

describe('ActionMenu', () => {
  const cases = convertStoriesToJestCases(stories)

  it('forwards ref', () => {
    const refToForward = React.createRef<HTMLUListElement>()

    const { getByTestId } = render(
      <ActionMenu data-testid="undertest" ref={refToForward}>
        <ActionMenu.Item>One item</ActionMenu.Item>
      </ActionMenu>
    )

    const el = getByTestId('undertest')
    expect(el).toBe(refToForward.current)
  })

  it('composes className in ActionMenu', () => {
    const { container } = render(<ActionMenu className="compose-classname" />)

    expect(container.firstChild).toHaveClass(
      'psds-actionmenu compose-classname'
    )
  })

  it('composes className in ActionMenu.Ellipsis', () => {
    const { container } = render(
      <ActionMenu.Ellipsis className="compose-classname" />
    )

    expect(container.firstChild).toHaveClass(
      'psds-actionmenu__ellipsis compose-classname'
    )
  })

  it('composes className in ActionMenu.Icon', () => {
    const { container } = render(
      <ActionMenu.Icon className="compose-classname" />
    )

    expect(container.firstChild).toHaveClass(
      'psds-actionmenu__icon compose-classname'
    )
  })

  it('composes className in ActionMenu.Item', () => {
    const { container } = render(
      <ActionMenu.Item
        className="compose-classname"
        origin={ActionMenu.origins.topLeft}
      />
    )

    expect(container.querySelector('.psds-actionmenu__item-inner')).toHaveClass(
      'psds-actionmenu__item-inner compose-classname'
    )
  })

  it('composes className in ActionMenu.Divider', () => {
    const { container } = render(
      <ActionMenu.Divider className="compose-classname" />
    )

    expect(container.firstChild).toHaveClass(
      'psds-actionmenu__divider compose-classname'
    )
  })

  it('fires onClick on option click', () => {
    const handleClick = jest.fn()

    const { getByTestId } = render(
      <ActionMenu>
        <ActionMenu.Item value="one" onClick={handleClick}>
          One item
        </ActionMenu.Item>

        <ActionMenu.Item
          value="two"
          data-testid="undertest"
          onClick={handleClick}
        >
          Two item
        </ActionMenu.Item>

        <ActionMenu.Item value="three" onClick={handleClick}>
          Three item
        </ActionMenu.Item>
      </ActionMenu>
    )

    const opt = getByTestId('undertest')
    fireEvent.click(opt)

    expect(handleClick).toHaveBeenCalledWith(expect.anything(), 'two')
  })

  it('fires onClick on option keyDown', () => {
    const handleClick = jest.fn()

    const { getByTestId } = render(
      <ActionMenu>
        <ActionMenu.Item value="one" onClick={handleClick}>
          One item
        </ActionMenu.Item>

        <ActionMenu.Item
          value="two"
          data-testid="undertest"
          onClick={handleClick}
        >
          Two item
        </ActionMenu.Item>

        <ActionMenu.Item value="three" onClick={handleClick}>
          Three item
        </ActionMenu.Item>
      </ActionMenu>
    )

    const opt = getByTestId('undertest')
    fireEvent.keyDown(opt, { key: 'Enter', code: 13 })

    expect(handleClick).toHaveBeenCalledWith(expect.anything(), 'two')
  })

  describe('ActionMenu.Item', () => {
    it('should render an anchor by default', () => {
      const ref = React.createRef<HTMLLIElement>()

      const { getByTestId } = render(
        <ActionMenu>
          <ActionMenu.Item data-testid="undertest" ref={ref}>
            test
          </ActionMenu.Item>
        </ActionMenu>
      )
      const el = getByTestId('undertest')

      expect(el.tagName.toLowerCase()).toEqual('a')
      expect(ref.current).not.toBeNull()
    })

    it('should render a button when `tagName` is `button`', () => {
      const ref = React.createRef<HTMLLIElement>()

      const { getByRole } = render(
        <ActionMenu>
          <ActionMenu.Item ref={ref} tagName="button">
            test
          </ActionMenu.Item>
        </ActionMenu>
      )
      const el = getByRole('menuitem')

      expect(el.tagName.toLowerCase()).toEqual('button')
      expect(ref.current).not.toBeNull()
    })

    it('should render a button that is disabled`', () => {
      const ref = React.createRef<HTMLLIElement>()

      const { getByRole } = render(
        <ActionMenu>
          <ActionMenu.Item disabled ref={ref} tagName="button">
            test
          </ActionMenu.Item>
        </ActionMenu>
      )
      const el = getByRole('menuitem')

      expect(el.getAttribute('disabled')).toEqual('')
      expect(ref.current).not.toBeNull()
    })

    it('should render a anchor that is disabled`', () => {
      const ref = React.createRef<HTMLLIElement>()

      const { getByRole } = render(
        <ActionMenu>
          <ActionMenu.Item disabled ref={ref} tagName="a">
            test
          </ActionMenu.Item>
        </ActionMenu>
      )
      const el = getByRole('menuitem')

      expect(el.getAttribute('aria-disabled')).toEqual('true')
      expect(ref.current).not.toBeNull()
    })

    it('should render a hyperlink when `tagName` is `a`', () => {
      const ref = React.createRef<HTMLLIElement>()

      const { getByTestId } = render(
        <ActionMenu>
          <ActionMenu.Item
            data-testid="undertest"
            href="/"
            ref={ref}
            tagName="a"
          >
            test
          </ActionMenu.Item>
        </ActionMenu>
      )
      const el = getByTestId('undertest')

      expect(el.tagName.toLowerCase()).toEqual('a')
      expect(ref.current).not.toBeNull()
    })
  })

  // TODO: fix issues and enable
  // describe.each(cases)('%s story', (_name, Story) => {
  //   it('has no axe-core violations', async () => {
  //     const { container } = render(<Story {...Story.args} />)
  //     const results = await axe(container)
  //     expect(results).toHaveNoViolations()
  //   })
  // })
})
