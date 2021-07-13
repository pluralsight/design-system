import { convertStoriesToJestCases } from '@pluralsight/ps-design-system-util'
import { render } from '@testing-library/react'
import { axe } from 'jest-axe'
import React from 'react'

import TextInput from '../index'
import * as vars from '../../vars/index'

import * as stories from '../__stories__/index.story'

describe('TextInput', () => {
  const cases = convertStoriesToJestCases(stories)

  describe('.appearances', () => {
    it('exists', () => {
      expect(TextInput.appearances).toEqual(vars.appearances)
    })
  })

  describe('.iconAligns', () => {
    it('exists', () => {
      expect(TextInput.iconAligns).toEqual(vars.iconAligns)
    })
  })

  describe('.sizes', () => {
    it('exists', () => {
      expect(TextInput.sizes).toEqual(vars.sizes)
    })
  })

  it('forwards the ref', () => {
    const ref = React.createRef<HTMLInputElement>()
    render(<TextInput ref={ref} />)
    expect(ref).not.toBeNull()
  })

  it('composes className', () => {
    const { container } = render(<TextInput className="compose-classname" />)

    expect(container.firstChild).toHaveClass(
      'psds-text-input compose-classname'
    )
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

    it('forwards id', () => {
      render(<Basic id="testid" {...Basic.args} />)

      const input = document.querySelector('#testid')
      expect(input).toBeInTheDocument()
    })
  })
})
