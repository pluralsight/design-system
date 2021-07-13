import { convertStoriesToJestCases } from '@pluralsight/ps-design-system-util'
import { fireEvent, screen, render } from '@testing-library/react'
import { axe } from 'jest-axe'
import React from 'react'

import Checkbox from '../index'

import * as stories from '../__stories__/index.story'

describe('Checkbox', () => {
  const cases = convertStoriesToJestCases(stories)

  it('forwards ref', () => {
    const ref = React.createRef<HTMLInputElement>()
    render(<Checkbox ref={ref} />)
    expect(ref).not.toBeNull()
  })

  it('composes className', () => {
    const { container } = render(<Checkbox className="compose-classname" />)

    expect(container.firstChild).toHaveClass('psds-checkbox compose-classname')
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

    it('is unchecked', () => {
      render(<Basic {...Basic.args} />)

      expect(screen.getByRole('checkbox')).toHaveProperty('checked', false)
    })

    it('calls onCheck when clicked', () => {
      const onCheck = jest.fn()

      render(
        <Basic
          {...Basic.args}
          checked
          name="input-name"
          onCheck={onCheck}
          value="input-value"
        />
      )

      const input = screen.getByRole('checkbox')
      fireEvent.click(input)

      expect(onCheck).toHaveBeenCalledWith(
        expect.anything(),
        false,
        'input-value',
        'input-name'
      )
    })
  })

  describe('Checked story', () => {
    const { Checked } = stories

    it('is checked', () => {
      render(<Checked {...Checked.args} />)

      expect(screen.getByRole('checkbox')).toHaveProperty('checked', true)
    })
  })

  describe('Indeterminate story', () => {
    const { Indeterminate } = stories

    it('is indeterminate', () => {
      render(<Indeterminate {...Indeterminate.args} />)

      const input = screen.getByRole('checkbox') as HTMLInputElement
      expect(input.indeterminate).toBeTruthy()
    })
  })

  describe('Disabled story', () => {
    const { Disabled } = stories

    it('is disabled', () => {
      render(<Disabled {...Disabled.args} />)
      expect(screen.getByRole('checkbox')).toHaveProperty('disabled', true)
    })

    it('does not call onCheck when clicked', () => {
      const onCheck = jest.fn()

      render(<Disabled {...Disabled.args} onCheck={onCheck} />)
      const input = screen.getByRole('checkbox')
      fireEvent.click(input)

      expect(onCheck).not.toHaveBeenCalled()
    })
  })
})
