import { render } from '@testing-library/react'
import React from 'react'

import TextArea from '../index'

describe('TextArea', () => {
  it('renders', () => {
    const { getByTestId } = render(<TextArea data-testid="undertest" />)

    expect(getByTestId('undertest')).toBeInTheDocument()
  })

  it('forwards refs', () => {
    const ref = React.createRef<HTMLTextAreaElement>()

    render(<TextArea ref={ref} />)

    expect(ref.current).not.toBeNull()
  })

  it('composes className', () => {
    const { container } = render(<TextArea className="compose-classname" />)

    expect(container.firstChild).toHaveClass('psds-text-area compose-classname')
  })
})
