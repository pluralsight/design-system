import Halo from '@pluralsight/ps-design-system-halo'
import { useTheme } from '@pluralsight/ps-design-system-theme'
import {
  ValueOf,
  RefForwardingComponent,
  RefFor,
  classNames
} from '@pluralsight/ps-design-system-util'
import React from 'react'

import '../css/index.css'
import * as vars from '../vars/index'

interface SwitchStatics {
  colors: typeof vars.colors
  sizes: typeof vars.sizes
  labelAligns: typeof vars.labelAligns
}

interface SwitchProps
  extends Omit<React.HTMLAttributes<HTMLLabelElement>, 'onClick'> {
  checked?: boolean
  color?: ValueOf<typeof vars.colors>
  disabled?: boolean
  error?: boolean
  labelAlign?: ValueOf<typeof vars.labelAligns>
  name?: string
  onBlur?: React.FocusEventHandler
  onClick?: (checked: boolean) => void
  onFocus?: React.FocusEventHandler
  size?: ValueOf<typeof vars.sizes>
  tabIndex?: number
}

interface SwitchComponent
  extends RefForwardingComponent<
    SwitchProps,
    HTMLInputElement | HTMLLabelElement,
    SwitchStatics
  > {}

const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  (
    {
      'aria-label': ariaLabel,
      checked = false,
      color = vars.colors.orange,
      disabled = false,
      error = false,
      labelAlign = vars.labelAligns.right,
      name,
      size = vars.sizes.large,
      tabIndex = 0,
      onClick,
      onBlur,
      onFocus,
      children,
      style,
      className,
      ...rest
    },
    forwardedRef
  ) => {
    const ref = React.useRef<HTMLInputElement>()
    React.useImperativeHandle(
      forwardedRef,
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
      () => ref.current as HTMLInputElement
    )

    const themeName = useTheme()
    const [isFocused, setIsFocused] = React.useState(false)

    const handleBlur = (evt: React.FocusEvent) => {
      setIsFocused(false)
      onBlur && onBlur(evt)
    }

    function handleClick(evt: React.MouseEvent | React.KeyboardEvent) {
      if (
        evt.type === 'click' ||
        ('key' in evt && evt.type === 'keydown' && evt.key === ' ')
      ) {
        evt.preventDefault()
        onClick && onClick(!checked)
      }
    }

    const handleFocus = (evt: React.FocusEvent) => {
      setIsFocused(true)
      onFocus && onFocus(evt)
    }

    return (
      <label
        className={classNames(
          className,
          'psds-switch',
          `psds-switch--label-align-${labelAlign}`,
          disabled && 'psds-switch--disabled'
        )}
        style={style}
        {...rest}
      >
        <Halo error={error} shape={Halo.shapes.pill} inline visible={isFocused}>
          <div
            className={classNames(
              'psds-switch__track',
              `psds-theme--${themeName}`,
              `psds-switch__track--size-${size}`,
              checked &&
                `psds-switch__track--checked psds-switch__track--color-${color}`
            )}
          >
            <div
              className={classNames(
                'psds-switch__thumb',
                `psds-switch__thumb--size-${size}`,
                checked && `psds-switch__thumb--checked`
              )}
            />
          </div>
        </Halo>

        <input
          aria-label={ariaLabel}
          checked={checked}
          disabled={disabled}
          readOnly
          ref={ref as RefFor<'input'>}
          name={name}
          onKeyDown={handleClick}
          onClick={disabled ? undefined : handleClick}
          onBlur={handleBlur}
          onFocus={handleFocus}
          tabIndex={disabled ? -1 : tabIndex}
          type="checkbox"
          className={'psds-switch__checkbox'}
        />

        {children && (
          <span
            className={classNames(
              'psds-switch__label',
              `psds-switch__label--size-${size}`,

              `psds-switch__label--label-align-${labelAlign}`,
              `psds-theme--${themeName}`
            )}
          >
            {children}
          </span>
        )}
      </label>
    )
  }
) as SwitchComponent

Switch.displayName = 'Switch'

Switch.colors = vars.colors
Switch.sizes = vars.sizes
Switch.labelAligns = vars.labelAligns

export const colors = vars.colors
export const sizes = vars.sizes
export const labelAligns = vars.labelAligns

export default Switch
