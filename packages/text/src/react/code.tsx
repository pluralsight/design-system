import React from 'react'
import { useTheme } from '@pluralsight/ps-design-system-theme'
import { classNames } from '@pluralsight/ps-design-system-util'

import '../css/index.css'

const Code: React.FC<React.HTMLAttributes<HTMLElement>> = ({
  className,
  children,
  ...rest
}) => {
  const themeName = useTheme()

  return children ? (
    <code
      {...rest}
      className={classNames(
        'psds-text__code',
        `psds-theme--${themeName}`,
        className
      )}
    >
      {children}
    </code>
  ) : null
}

export default Code
