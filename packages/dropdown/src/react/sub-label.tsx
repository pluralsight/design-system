import { useTheme } from '@pluralsight/ps-design-system-theme'
import { HTMLPropsFor, classNames } from '@pluralsight/ps-design-system-util'
import React from 'react'

import '../css/index.css'

interface SubLabelProps extends HTMLPropsFor<HTMLDivElement> {
  subLabel?: React.ReactNode
}

export const SubLabel: React.FC<SubLabelProps> = ({
  className,
  subLabel,
  ...rest
}) => {
  const themeName = useTheme()
  return subLabel ? (
    <div
      {...rest}
      className={classNames(
        'psds-dropdown__sub-label',
        `psds-theme--${themeName}`,
        className
      )}
    >
      {subLabel}
    </div>
  ) : null
}

SubLabel.displayName = 'Dropdown.SubLabel'
