import { convertStoriesToJestCases } from '@pluralsight/ps-design-system-util'
import { screen, render } from '@testing-library/react'
import { axe } from 'jest-axe'
import React from 'react'

import VerticalTabs from '../index'

import * as stories from '../__stories__/index.story'

const { CollapsibleGroup, Group, Tier1, Tier2 } = VerticalTabs

describe('VerticalTabs', () => {
  const cases = convertStoriesToJestCases(stories)

  it('forwards ref', () => {
    const ref = React.createRef<HTMLUListElement>()
    render(<VerticalTabs ref={ref} />)
    expect(ref).not.toBeNull()
  })

  it('composes className (VerticalTabs)', () => {
    const { container } = render(<VerticalTabs className="compose-classname" />)

    expect(container.firstChild).toHaveClass(
      'psds-verticaltabs compose-classname'
    )
  })

  it('composes className (VerticalTabs.Divider)', () => {
    const { container } = render(
      <VerticalTabs.Divider className="compose-classname" />
    )

    expect(container.firstChild).toHaveClass(
      'psds-verticaltabs__divider psds-theme--dark compose-classname'
    )
  })

  it('properly passes className (CollapsibleGroup)', () => {
    const { container } = render(<CollapsibleGroup className="classname" />)

    expect(container.firstChild).toHaveClass('classname')
  })

  it('composes className (CollapsibleGroup.Header)', () => {
    const { container } = render(
      <CollapsibleGroup.Header className="compose-classname" />
    )

    expect(container.firstChild).toHaveClass(
      'psds-verticaltabs__group__header psds-theme--dark compose-classname'
    )
  })

  it('properly passes className (Group)', () => {
    const { container } = render(<Group className="classname" />)

    expect(container.firstChild).toHaveClass('classname')
  })

  it('properly passes className (Group.Header)', () => {
    const { container } = render(<Group.Header className="classname" />)

    expect(container.firstChild).toHaveClass('classname')
  })

  it('properly passes className (Tier1)', () => {
    const { container } = render(
      <Tier1
        className="classname"
        header={<Tier1.Header>First</Tier1.Header>}
      />
    )

    expect(container.firstChild).toHaveClass('classname')
  })

  it('properly passes className (Tier1.Header)', () => {
    const { container } = render(<Tier1.Header className="classname" />)

    expect(container.firstChild).toHaveClass('classname')
  })

  it('properly passes className (Tier2)', () => {
    const { container } = render(
      <Tier2
        className="classname"
        header={<Tier2.Header>First</Tier2.Header>}
      />
    )

    expect(container.firstChild).toHaveClass('classname')
  })

  it('composes className (Tier2.Header)', () => {
    const { container } = render(<Tier2.Header className="compose-classname" />)

    expect(container.firstChild).toHaveClass(
      'psds-verticaltabs__tier2__header compose-classname'
    )
  })

  describe.skip.each(cases)('%s story', (_name, Story) => {
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
        <Basic data-testid="undertest" className="testclass" {...Basic.args} />
      )

      const el = screen.getByTestId('undertest')
      expect(el).toHaveClass('testclass')
    })
  })
})
