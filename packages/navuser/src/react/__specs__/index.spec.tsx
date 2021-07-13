import { convertStoriesToJestCases } from '@pluralsight/ps-design-system-util'
import { screen, render } from '@testing-library/react'
import { axe } from 'jest-axe'
import React from 'react'

import NavUser from '../index'
import * as stories from '../__stories__/index.story'

describe('NavUser', () => {
  const cases = convertStoriesToJestCases(stories)

  it('forwards ref', () => {
    const ref = React.createRef<HTMLDivElement>()
    render(<NavUser ref={ref} />)
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

    it('renders a button el', () => {
      render(<Basic data-testid="undertest" {...Basic.args} />)
      const el = screen.getByTestId('undertest')

      expect(el).toBeInTheDocument()
      expect(el.tagName.toLowerCase()).toEqual('div')
    })

    it('forwards className', () => {
      const { container } = render(
        <Basic className="testclass" {...Basic.args} />
      )

      expect(container.firstChild).toHaveClass('testclass')
    })
  })

  describe('AsButton story', () => {
    const { AsButton } = stories

    it('renders an anchor el', () => {
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
