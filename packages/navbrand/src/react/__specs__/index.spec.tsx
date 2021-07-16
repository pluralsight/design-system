import { convertStoriesToJestCases } from '@pluralsight/ps-design-system-util'
import { screen, render } from '@testing-library/react'
import { axe } from 'jest-axe'
import React from 'react'

import NavBrand from '../index'

import * as stories from '../__stories__/index.story'

describe('NavBrand', () => {
  const cases = convertStoriesToJestCases(stories)

  it('forwards ref', () => {
    const ref = React.createRef<HTMLDivElement>()
    render(<NavBrand ref={ref} />)
    expect(ref).not.toBeNull()
  })

  it('composes className', () => {
    render(<NavBrand className="compose-classname" />)
    const el = document.querySelector('.psds-navbrand')
    expect(el).toHaveClass('compose-classname')
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

    it('renders a div el', () => {
      render(<Basic data-testid="undertest" {...Basic.args} />)
      const el = screen.getByTestId('undertest')

      expect(el).toBeInTheDocument()
      expect(el.tagName.toLowerCase()).toEqual('div')
    })

    it('forwards className', () => {
      render(
        <Basic data-testid="undertest" className="testclass" {...Basic.args} />
      )

      const el = screen.getByTestId('undertest')
      expect(el).toHaveClass('testclass')
    })
  })

  describe('AsButton story', () => {
    const { AsButton } = stories

    it('renders a anchor el', () => {
      render(<AsButton {...AsButton.args} />)
      const el = screen.getByRole('button')

      expect(el).toBeInTheDocument()
      expect(el.tagName.toLowerCase()).toEqual('button')
    })
  })

  describe('AsLink story', () => {
    const { AsLink } = stories

    it('renders an anchor el', () => {
      render(<AsLink {...AsLink.args} />)
      const el = screen.getByRole('link')

      expect(el).toBeInTheDocument()
      expect(el.tagName.toLowerCase()).toEqual('a')
    })
  })
})
