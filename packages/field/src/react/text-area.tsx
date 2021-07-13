import { classNames } from '@pluralsight/ps-design-system-util'
import React from 'react'

import '../css/text-area.css'

interface TextAreaProps
  extends React.DetailedHTMLProps<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {
  renderContainer?: typeof defaultRenderContainer
}

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (props, ref) => {
    const {
      className,
      renderContainer = defaultRenderContainer,
      ...rest
    } = props

    const containerRef = React.useRef<HTMLDivElement>(null)
    const Container = React.useMemo(() => renderContainer, [renderContainer])

    return (
      <Container
        className={classNames('psds-field__text-area__container', className)}
        ref={containerRef}
      >
        <textarea
          ref={ref}
          {...rest}
          className={classNames(
            'psds-field__text-area',
            !!rest.disabled && 'psds-field__text-area--disabled'
          )}
        />
      </Container>
    )
  }
) as React.ForwardRefExoticComponent<TextAreaProps>
TextArea.displayName = 'Field.TextArea'

const defaultRenderContainer = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>((props, ref) => <div ref={ref} {...props} />)

export default TextArea
