import ScreenReaderOnly from '@pluralsight/ps-design-system-screenreaderonly'
import {
  names as themeNames,
  useTheme
} from '@pluralsight/ps-design-system-theme'
import { ValueOf, classNames } from '@pluralsight/ps-design-system-util'
import React from 'react'

import '../css/index.css'

interface LabelProps extends React.HTMLAttributes<HTMLLabelElement> {
  label?: React.ReactNode
}

export const Label: React.FC<LabelProps> = ({ className, ...rest }) => {
  const themeName = useTheme()
  return (
    <label>
      {rest.label ? (
        <span
          className={classNames(
            'psds-dropdown__label',
            `psds-theme--${themeName}`,
            className
          )}
        >
          {rest.label}
        </span>
      ) : (
        <ScreenReaderOnly as="span">Dropdown</ScreenReaderOnly>
      )}
    </label>
  )
}

Label.displayName = 'Dropdown.Label'
