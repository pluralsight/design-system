import { classNames } from '@pluralsight/ps-design-system-util'
import { useTheme } from '@pluralsight/ps-design-system-theme'
import React from 'react'

import '../css/label.css'

interface LabelProps extends React.HTMLAttributes<HTMLLabelElement> {
  htmlFor?: string
}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>((props, ref) => {
  const { className, children, ...rest } = props
  const themeName = useTheme()

  return (
    <label
      {...rest}
      ref={ref}
      className={classNames(
        'psds-field__label',
        `psds-theme--${themeName}`,
        className
      )}
    >
      {children}
    </label>
  )
})

Label.displayName = 'Field.Label'

export default Label
