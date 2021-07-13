import { useTheme } from '@pluralsight/ps-design-system-theme'
import { classNames } from '@pluralsight/ps-design-system-util'
import React from 'react'

import '../css/index.css'
interface SelectSelectedProps extends React.HTMLAttributes<HTMLLabelElement> {
  label?: string
  placeholder: string
  selectedItem?: {
    value?: React.ReactText
    label?: React.ReactText
  }
}

export const Selected: React.FC<SelectSelectedProps> = ({
  placeholder,
  selectedItem,
  className
}) => {
  const themeName = useTheme()
  return (
    <>
      <span
        className={classNames(
          className,
          'psds-select__selected',
          placeholder && `psds-select__placeholder psds-theme--${themeName}`
        )}
      >
        {selectedItem?.label}
      </span>
    </>
  )
}

Selected.displayName = 'Select.Selected'
