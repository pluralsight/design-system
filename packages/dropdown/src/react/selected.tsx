import { ValueOf, classNames } from '@pluralsight/ps-design-system-util'
import React from 'react'

import '../css/index.css'
import { ItemData } from '../js/index'
import * as vars from '../vars/index'

interface DropdownSelectedProps extends React.HTMLAttributes<HTMLSpanElement> {
  appearance?: ValueOf<typeof vars.appearances>
  label?: string
  placeholder?: string
  selectedItem?: ItemData
}

export const Selected: React.FC<DropdownSelectedProps> = ({
  appearance,
  className,
  label,
  placeholder,
  selectedItem,
  ...rest
}) => {
  return (
    <>
      <span
        {...rest}
        aria-hidden
        className={classNames('psds-dropdown__button-sizer', className)}
      >
        {label || placeholder}
      </span>
      <span
        className={classNames(
          'psds-dropdown__placeholder',
          !selectedItem && 'psds-dropdown__placeholder--color',
          !selectedItem &&
            appearance === vars.appearances.subtle &&
            `psds-dropdown__field--appearance-${vars.appearances.subtle}`
        )}
      >
        {selectedItem?.label || placeholder}
      </span>
    </>
  )
}

Selected.displayName = 'Dropdown.Selected'
