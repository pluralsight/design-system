import { ValueOf, classNames } from '@pluralsight/ps-design-system-util'
import React from 'react'

import '../css/index.css'
import * as vars from '../vars/index'

interface DropdownLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  button: React.ReactNode
  disabled?: boolean
  input?: React.ReactNode
  label?: React.ReactNode
  menu?: React.ReactNode
  onKeyDown?: (e: React.KeyboardEvent) => void
  size?: ValueOf<typeof vars.sizes>
  subLabel?: React.ReactNode
}

export const Layout: React.FC<DropdownLayoutProps> = ({
  button,
  className,
  disabled,
  input,
  label,
  menu,
  onKeyDown,
  size,
  subLabel,
  ...rest
}) => {
  return (
    <div
      {...rest}
      onKeyDown={onKeyDown}
      className={classNames(
        'psds-dropdown',
        size === vars.sizes.small && 'psds-dropdown--small',
        disabled && `psds-dropdown--disabled`,
        className
      )}
    >
      {label}
      {input}
      {button}
      {menu}
      {subLabel}
    </div>
  )
}

Layout.displayName = 'Dropdown.Layout'
