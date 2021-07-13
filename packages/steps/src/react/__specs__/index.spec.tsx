import { render } from '@testing-library/react'
import React from 'react'

import Steps from '../index'

describe('Steps', () => {
  it('renders', () => {
    const { getByTestId } = render(<Steps data-testid="undertest" />)

    expect(getByTestId('undertest')).toBeInTheDocument()
  })

  it('composes className', () => {
    const { container } = render(<Steps className="compose-classname" />)

    expect(container.firstChild).toHaveClass('compose-classname psds-steps')
  })

  it('composes className for Steps.Step', () => {
    const { container } = render(
      <Steps.Step className="compose-classname" status="incomplete" />
    )

    expect(container.firstChild).toHaveClass(
      'psds-steps__step compose-classname'
    )
  })

  it('composes className for Steps.Marker', () => {
    const { container } = render(
      <Steps.Marker className="compose-classname" status="incomplete" />
    )

    expect(container.firstChild).toHaveClass(
      'psds-steps__marker compose-classname'
    )
  })

  it('forwards refs', () => {
    const ref = React.createRef<HTMLDivElement>()

    render(<Steps ref={ref} />)

    expect(ref.current).not.toBeNull()
  })
})
