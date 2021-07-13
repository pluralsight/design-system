import Halo from '@pluralsight/ps-design-system-halo'
import Icon from '@pluralsight/ps-design-system-icon'
import { useTheme } from '@pluralsight/ps-design-system-theme'
import { ValueOf, classNames } from '@pluralsight/ps-design-system-util'
import React from 'react'

import '../css/index.css'
import { CaretDown } from './caret-down'
import { ErrorIcon } from './error-icon'
import * as vars from '../vars/index'

interface DropdownButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  appearance?: ValueOf<typeof vars.appearances>
  disabled?: boolean
  error?: boolean
  isOpen?: boolean
  'aria-haspopup': 'listbox'
  onClick: (evt: React.MouseEvent | React.KeyboardEvent) => void
  onKeyDown: (evt: React.MouseEvent | React.KeyboardEvent) => void
  // TODO: see if we can make more of these non-null
  setMenuPosition: ({
    left,
    top,
    width
  }: {
    left: number
    top: number
    width: number
  }) => void
}

export const Button = React.forwardRef<HTMLButtonElement, DropdownButtonProps>(
  (
    {
      appearance,
      children,
      className,
      disabled,
      error,
      isOpen,
      onClick,
      setMenuPosition,
      ...rest
    },
    ref
  ) => {
    const themeName = useTheme()
    const fieldContainerRef = React.useRef<HTMLDivElement>(null)
    React.useLayoutEffect(() => {
      if (!isOpen || !fieldContainerRef.current) return
      const { left, bottom, width } =
        fieldContainerRef.current.getBoundingClientRect()
      const requestId = requestAnimationFrame(() =>
        setMenuPosition({ left, top: bottom, width })
      )
      return () => cancelAnimationFrame(requestId)
    }, [fieldContainerRef, isOpen, setMenuPosition])
    return (
      <div
        className={classNames('psds-dropdown__field-container', className)}
        ref={fieldContainerRef}
      >
        <Halo
          error={error}
          gapSize={Halo.gapSizes.small}
          className="psds-dropdown__field-halo"
        >
          <div className="psds-dropdown__field-aligner">
            <button
              {...rest}
              className={classNames(
                'psds-dropdown__field',
                `psds-dropdown__field--appearance-${appearance}`,
                `psds-theme--${themeName}`,
                error && 'psds-dropdown__field-error'
              )}
              disabled={disabled}
              onClick={disabled ? undefined : onClick}
              ref={ref}
            >
              <span className="psds-dropdown__field-inner">{children}</span>
              <div
                className={classNames(
                  'psds-dropdown__icon',
                  `psds-dropdown__icon--appearance-${appearance}`,
                  `psds-theme--${themeName}`
                )}
              >
                <Icon>
                  <CaretDown />
                </Icon>
              </div>
            </button>
          </div>
        </Halo>
        <ErrorIcon error={!!error} />
      </div>
    )
  }
)

Button.displayName = 'Dropdown.Button'
