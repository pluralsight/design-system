import { convertStoriesToJestCases } from '@pluralsight/ps-design-system-util'
import { screen, render } from '@testing-library/react'
import { axe } from 'jest-axe'
import React from 'react'

import Avatar from '../index'
import * as stories from '../__stories__/index.story'
import * as vars from '../../vars/index'

describe('Avatar', () => {
  const cases = convertStoriesToJestCases(stories)

  describe('.sizes', () => {
    it('exists', () => {
      expect(Avatar.sizes).toEqual(vars.sizes)
    })
  })

  describe('.widths', () => {
    it('exists', () => {
      expect(Avatar.widths).toEqual(vars.widths)
    })
  })

  it('composes className', () => {
    const { container } = render(<Avatar className="compose-classname" />)

    expect(container.firstChild).toHaveClass('psds-avatar compose-classname')
  })

  it('forwards className', () => {
    const { getByTestId } = render(
      <Avatar data-testid="under-test" className="testclass" />
    )

    const el = getByTestId('under-test')
    expect(el).toHaveClass('testclass')
  })

  it('forwards ref', () => {
    const ref = React.createRef<HTMLDivElement>()
    render(<Avatar ref={ref} />)
    expect(ref).not.toBeNull()
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

    describe('with an alt attr', () => {
      it('passes the alt attr to the image', () => {
        render(<Basic alt="alt text" src="//something.png" />)
        const img = screen.getByRole('img')
        expect(img).toHaveAttribute('alt', 'alt text')
      })

      it('is visible to screen readers', () => {
        render(
          <Basic data-testid="undertest" alt="alt text" src="//something.png" />
        )
        const el = screen.getByTestId('undertest')

        expect(el).not.toHaveAttribute('aria-hidden')
        expect(el).not.toHaveAttribute('role', 'presentation')
      })
    })

    describe('with NO alt attr', () => {
      it('is hidden from screen readers', () => {
        render(<Basic data-testid="undertest" src="//something.png" />)
        const el = screen.getByTestId('undertest')

        expect(el).toHaveAttribute('aria-hidden')
      })
    })

    describe('with NO image src', () => {
      const name = 'Benedict Cumberbatch'

      it('displays initials', () => {
        render(<Basic data-testid="undertest" name={name} src={undefined} />)
        const initials = screen.getByTestId('undertest')
        expect(initials).toHaveTextContent('B')
      })

      it('adds the name as an aria-label', () => {
        render(<Basic data-testid="undertest" name={name} src={undefined} />)
        const initials = screen.getByLabelText(name)
        expect(initials).toBeInTheDocument()
      })
    })
  })
})
