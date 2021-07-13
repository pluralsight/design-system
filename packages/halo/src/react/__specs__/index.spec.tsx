import { convertStoriesToJestCases } from '@pluralsight/ps-design-system-util'
import { render } from '@testing-library/react'
import { axe } from 'jest-axe'
import React from 'react'

import Halo from '../index'
import * as vars from '../../vars/index'

import * as stories from '../__stories__/index.story'

describe('Halo', () => {
  const cases = convertStoriesToJestCases(stories)

  it('composes className', () => {
    const { container } = render(<Halo className="compose-classname" />)

    expect(container.firstChild).toHaveClass('psds-halo compose-classname')
  })

  describe('.gapSizes', () => {
    it('exists', () => {
      expect(Halo.gapSizes).toEqual(vars.gapSizes)
    })
  })

  describe('.shapes', () => {
    it('exists', () => {
      expect(Halo.shapes).toEqual(vars.shapes)
    })
  })

  it('forwards ref', () => {
    const ref = React.createRef<HTMLDivElement>()
    render(<Halo ref={ref} />)
    expect(ref).not.toBeNull()
  })

  describe.each(cases)('%s story', (_name, Story) => {
    it('has no axe-core violations', async () => {
      const { container } = render(<Story {...Story.args} />)
      const results = await axe(container)

      expect(results).toHaveNoViolations()
    })
  })
})
