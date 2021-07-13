import { convertStoriesToJestCases } from '@pluralsight/ps-design-system-util'
import { fireEvent, render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import React from 'react'

import Note from '../index'
import * as stories from '../__stories__/index.story'

describe('Note', () => {
  const cases = convertStoriesToJestCases(stories)

  it.todo('forwards ref')

  it.todo('supports polymorphism')

  it('composes className', () => {
    const { container } = render(
      <Note className="compose-classname" message="" />
    )

    expect(container.firstChild).toHaveClass(
      'compose-classname psds-note psds-theme--dark'
    )
  })

  it('composes className for Note.Action', () => {
    const { container } = render(
      <Note.Action className="compose-classname" icon="" title="" />
    )

    expect(container.firstChild).toHaveClass(
      'compose-classname psds-note__action psds-theme--dark'
    )
  })

  it('composes className for Note.List', () => {
    const { container } = render(<Note.List className="compose-classname" />)

    expect(container.firstChild).toHaveClass(
      'compose-classname psds-note__list'
    )
  })

  it('exposes an Action Component', () => {
    expect(Note).toHaveProperty('Action')
  })

  it('exposes a List Component', () => {
    expect(Note).toHaveProperty('List')
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

    it('forwards className', () => {
      render(
        <Basic
          {...(Basic.args as any)}
          data-testid="undertest"
          className="testclass"
        />
      )

      const el = screen.getByTestId('undertest')
      expect(el).toHaveClass('testclass')
    })

    it('supports onMouseOver prop', () => {
      const onMouseOver = jest.fn()

      render(
        <Basic
          {...(Basic.args as any)}
          data-testid="undertest"
          className="testclass"
          onMouseOver={onMouseOver}
        />
      )

      const el = screen.getByTestId('undertest')
      fireEvent.mouseOver(el)

      expect(onMouseOver).toHaveBeenCalled()
    })

    it('supports onMouseOut prop', () => {
      const onMouseOut = jest.fn()

      render(
        <Basic
          {...(Basic.args as any)}
          data-testid="undertest"
          className="testclass"
          onMouseOut={onMouseOut}
        />
      )

      const el = screen.getByTestId('undertest')
      fireEvent.mouseOut(el)

      expect(onMouseOut).toHaveBeenCalled()
    })
  })
})
