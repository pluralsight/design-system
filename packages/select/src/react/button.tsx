import { WarningIcon, CaretDownIcon } from '@pluralsight/ps-design-system-icon'
import { useTheme } from '@pluralsight/ps-design-system-theme'
import { classNames, ValueOf } from '@pluralsight/ps-design-system-util'
import React from 'react'

import '../css/index.css'
import * as vars from '../vars/index'

interface SelectButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  disabled?: boolean
  error?: boolean
  isOpen?: boolean
  'aria-haspopup'?: 'listbox'
  onClick?: (evt: React.MouseEvent | React.KeyboardEvent) => void
  onKeyDown?: (evt: React.MouseEvent | React.KeyboardEvent) => void
  size?: ValueOf<typeof vars.sizes>
}

export const Button = React.forwardRef<HTMLButtonElement, SelectButtonProps>(
  (
    {
      children,
      disabled,
      error,
      onClick,
      size = vars.sizes.medium,
      isOpen = false,
      className,
      ...rest
    },
    ref
  ) => {
    const themeName = useTheme()

    return (
      <button
        className={classNames(
          className,
          `psds-select__button`,
          error && 'psds-select__button--error',
          size === vars.sizes.small && 'psds-select__button--small',
          `psds-theme--${themeName}`,
          isOpen && `psds-select__button--is-open`
        )}
        ref={ref}
        disabled={disabled}
        onClick={disabled ? undefined : onClick}
        {...rest}
      >
        <div className={'psds-select__button-inner'}>
          {children}
          <CaretDownIcon
            className={classNames(
              'psds-select__icon',
              `psds-theme--${themeName}`
            )}
          />
        </div>
        {error && <WarningIcon className={'psds-select__error'} />}
      </button>
    )
  }
)

Button.displayName = 'Select.Button'
