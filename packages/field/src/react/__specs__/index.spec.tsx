import { convertStoriesToJestCases } from '@pluralsight/ps-design-system-util'
import { screen } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'
import { render } from '@testing-library/react'
import { axe } from 'jest-axe'
import React from 'react'

import Field from '../field'
import TextArea from '../text-area'
import TextInput from '../input'
import * as textAreaStories from '../__stories__/text-area-field.story'
import * as textInputStories from '../__stories__/text-input-field.story'

describe('Field', () => {
  it('composes className in Field.Input', () => {
    const { container } = render(<Field.Input className="compose-classname" />)

    expect(container.firstChild).toHaveClass(
      'psds-field__input__container compose-classname'
    )
  })

  it('composes className in Field.Label', () => {
    const { container } = render(<Field.Label className="compose-classname" />)

    expect(container.firstChild).toHaveClass(
      'psds-field__label compose-classname'
    )
  })

  it('composes className in Field.SubLabel', () => {
    const { container } = render(
      <Field.SubLabel className="compose-classname" />
    )

    expect(container.firstChild).toHaveClass(
      'psds-field__sub-label compose-classname'
    )
  })

  describe('TextAreaField', () => {
    const { Basic } = textAreaStories
    const cases = convertStoriesToJestCases(textAreaStories)

    it('composes className in TextArea', () => {
      const { container } = render(<TextArea className="compose-classname" />)

      expect(container.firstChild).toHaveClass(
        'psds-field__text-area__container compose-classname'
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
      it('focuses input when label clicked', () => {
        render(<Basic {...Basic.args} />)
        const label = screen.getByLabelText('Text area label area')
        const input = screen.getByRole('textbox')

        userEvent.click(label)

        expect(input).toHaveFocus()
      })
    })
  })

  describe('TextInputField', () => {
    const { Basic } = textInputStories
    const cases = convertStoriesToJestCases(textInputStories)

    it('composes className in TextInput', () => {
      const { container } = render(<TextInput className="compose-classname" />)

      expect(container.firstChild).toHaveClass(
        'psds-field__input__container compose-classname'
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
      it('focuses input when label clicked', () => {
        render(<Basic {...Basic.args} />)
        const label = screen.getByLabelText('Text input label area')
        const input = screen.getByRole('textbox')

        userEvent.click(label)

        expect(input).toHaveFocus()
      })

      it('supports the search type', () => {
        render(<Basic {...Basic.args} type="search" />)
        const input = screen.getByRole('searchbox')

        expect(input).toBeInTheDocument()
      })
    })
  })
})
