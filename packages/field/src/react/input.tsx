import { classNames } from '@pluralsight/ps-design-system-util'
import React from 'react'

import { FieldContext } from './context'
import '../css/input.css'

export interface FieldInputProps
  extends Omit<
    React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >,
    'ref'
  > {
  renderContainer?: typeof defaultRenderContainer
  renderTag?: typeof defaultRenderTag
}

const Input = React.forwardRef<HTMLInputElement, FieldInputProps>(
  (props, ref) => {
    const { size } = React.useContext(FieldContext)
    const {
      className,
      renderContainer = defaultRenderContainer,
      renderTag = defaultRenderTag,
      ...rest
    } = props

    const containerRef = React.useRef<HTMLDivElement>(null)
    const Container = React.useMemo(() => renderContainer, [renderContainer])

    const Tag = React.useMemo(() => renderTag, [renderTag])

    return (
      <Container
        className={classNames('psds-field__input__container', className)}
        ref={containerRef}
      >
        <Tag
          {...rest}
          ref={ref}
          className={classNames(
            'psds-field__input',
            `psds-field__input--${size}`
          )}
        />
      </Container>
    )
  }
)
Input.displayName = 'Field.Input'

const defaultRenderContainer = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>((props, ref) => <div ref={ref} {...props} />)

const defaultRenderTag = React.forwardRef<
  HTMLInputElement,
  React.HTMLAttributes<HTMLInputElement>
>((props, ref) => <input ref={ref} {...props} />)

export default Input
