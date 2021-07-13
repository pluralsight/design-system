import React from 'react'
import { useTheme } from '@pluralsight/ps-design-system-theme'
import { classNames } from '@pluralsight/ps-design-system-util'

import '../css/index.css'

const Divider: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...rest
}) => {
  const themeName = useTheme()

  return (
    <div
      {...rest}
      className={classNames(
        'psds-form-divider',
        `psds-theme--${themeName}`,
        className
      )}
    />
  )
}
Divider.displayName = 'Divider'

export default Divider
