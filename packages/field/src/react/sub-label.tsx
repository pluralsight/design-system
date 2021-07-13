import { classNames } from '@pluralsight/ps-design-system-util'
import { useTheme } from '@pluralsight/ps-design-system-theme'
import React from 'react'

import '../css/sub-label.css'

interface SubLabelProps extends React.HTMLAttributes<HTMLDivElement> {}

const SubLabel = React.forwardRef<HTMLDivElement, SubLabelProps>(
  (props, ref) => {
    const { children, className, ...rest } = props
    const themeName = useTheme()

    return (
      <div
        {...rest}
        ref={ref}
        className={classNames(
          'psds-field__sub-label',
          `psds-theme--${themeName}`,
          className
        )}
      >
        {children}
      </div>
    )
  }
)

SubLabel.displayName = 'Field.SubLabel'

export default SubLabel
