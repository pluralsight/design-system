import { convertStoriesToJestCases } from '@pluralsight/ps-design-system-util'
import { screen, render } from '@testing-library/react'
import { axe } from 'jest-axe'
import React from 'react'

import * as stories from '../__stories__/index.story'
import Card from '../index'

describe('Card', () => {
  const cases = convertStoriesToJestCases(stories)

  it('renders', () => {
    const { getByTestId } = render(
      <Card image={<div />} title={<div />} data-testid="undertest"></Card>
    )

    expect(getByTestId('undertest')).toBeInTheDocument()
  })

  it('composes className in Card', () => {
    const { container } = render(
      <Card
        className="compose-classname"
        title={<Card.Title>Card Title</Card.Title>}
        image={<Card.Image src="someUrl" aria-label="aLabel" />}
      />
    )

    expect(container.firstChild).toHaveClass('compose-classname')
  })

  it('composes className in Card.Action', () => {
    const { container } = render(
      <Card.Action className="compose-classname" title="aLabel" />
    )

    expect(container.firstChild).toHaveClass('compose-classname')
  })

  it('composes className in Card.FullOverlayLink', () => {
    const { container } = render(
      <Card.FullOverlayLink className="compose-classname" />
    )

    expect(container.firstChild).toHaveClass('compose-classname')
  })

  it('composes className in Card.Image', () => {
    const { container } = render(
      <Card.Image src="someUrl" className="compose-classname" />
    )

    expect(container.firstChild).toHaveClass(
      'psds-card__image compose-classname'
    )
  })

  it('composes className in Card.ImageLink', () => {
    const { container } = render(
      <Card.ImageLink className="compose-classname" />
    )

    expect(container.firstChild).toHaveClass(
      'psds-card__image-link compose-classname'
    )
  })

  it('composes className in Card.Tag', () => {
    const { container } = render(<Card.Tag className="compose-classname" />)

    expect(container.firstChild).toHaveClass('psds-card__tag compose-classname')
  })

  it('composes className in Card.Text', () => {
    const { container } = render(<Card.Text className="compose-classname" />)

    expect(container.firstChild).toHaveClass('compose-classname')
  })

  it('composes className in Card.TextLink', () => {
    const { container } = render(
      <Card.TextLink className="compose-classname" />
    )

    expect(container.firstChild).toHaveClass(
      'psds-card__text-link compose-classname'
    )
  })

  it('composes className in Card.Title', () => {
    const { container } = render(<Card.Title className="compose-classname" />)

    expect(container.firstChild).toHaveClass(
      'psds-card__title compose-classname'
    )
  })

  describe.each(cases)('%s story', (_name, Story) => {
    it('has no axe-core violations', async () => {
      const { container } = render(<Story {...Story.args} />)
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })
})
