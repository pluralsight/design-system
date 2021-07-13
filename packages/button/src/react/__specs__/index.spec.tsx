import { PlaceholderIcon } from '@pluralsight/ps-design-system-icon'
import { convertStoriesToJestCases } from '@pluralsight/ps-design-system-util'
import { fireEvent, screen, render } from '@testing-library/react'
import { axe } from 'jest-axe'
import React from 'react'

import Button from '../index'
import * as vars from '../../vars/index'

import * as stories from '../__stories__/index.story'

describe('Button', () => {
  const cases = convertStoriesToJestCases(stories)

  describe('.sizes', () => {
    it('exists', () => {
      expect(Button.sizes).toEqual(vars.sizes)
    })
  })

  it('forwards ref', () => {
    const ref = React.createRef<HTMLButtonElement>()
    render(<Button ref={ref} />)
    expect(ref).not.toBeNull()
  })

  it('composes className in Button', () => {
    const { container } = render(
      <Button className="compose-classname"></Button>
    )

    expect(container.firstChild).toHaveClass('psds-button compose-classname')
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

    it('renders a button el', () => {
      render(<Basic {...Basic.args} />)
      const el = screen.getByRole('button')

      expect(el).toBeInTheDocument()
      expect(el.tagName.toLowerCase()).toEqual('button')
    })

    it('forwards className', () => {
      const { getByTestId } = render(
        <Basic data-testid="undertest" className="testclass" {...Basic.args} />
      )

      const el = getByTestId('undertest')
      expect(el).toHaveClass('testclass')
    })

    it('renders a name attribute onto button', () => {
      const name = 'some-value'

      render(<Basic {...Basic.args} name={name} />)

      const el = screen.getByRole('button')
      expect(el).toHaveAttribute('name', name)
    })
  })

  describe('AsLink story', () => {
    const { AsLink } = stories

    it('renders a anchor el', () => {
      render(<AsLink {...AsLink.args} />)
      const el = screen.getByRole('link')

      expect(el).toBeInTheDocument()
      expect(el.tagName.toLowerCase()).toEqual('a')
    })
  })

  describe('Disabled story', () => {
    const { Disabled } = stories

    it('does not allow clicks on the button', () => {
      const handleClick = jest.fn()

      render(<Disabled {...Disabled.args} />)

      const button = screen.getByRole('button')
      fireEvent.click(button)

      expect(handleClick).not.toHaveBeenCalled()
    })

    it('does not allow clicks on the icon', () => {
      const handleClick = jest.fn()

      render(
        <Disabled
          {...Disabled.args}
          icon={<PlaceholderIcon data-testid="icon-undertest" />}
        />
      )

      const el = screen.getByTestId('icon-undertest')
      fireEvent.click(el)

      expect(handleClick).not.toHaveBeenCalled()
    })
  })
})
