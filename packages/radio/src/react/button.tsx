import Halo from '@pluralsight/ps-design-system-halo'
import { useTheme } from '@pluralsight/ps-design-system-theme'
import { combineFns, classNames } from '@pluralsight/ps-design-system-util'
import React from 'react'

import { RadioContext } from './context'
import '../css/index.css'

const isChecked = (a: React.ReactText, b?: React.ReactText) => a === b

export interface RadioButtonProps
  extends Omit<React.HTMLAttributes<HTMLInputElement>, 'onClick'> {
  label: React.ReactNode
  onBlur?: (evt: React.FocusEvent<HTMLInputElement>) => void
  onClick?: (
    evt: React.MouseEvent<HTMLInputElement>,
    val?: React.ReactText
  ) => void
  onFocus?: (evt: React.FocusEvent<HTMLInputElement>) => void
  value: React.ReactText
}

const Button = React.forwardRef<HTMLInputElement, RadioButtonProps>(
  ({ value, label, className, ...props }, forwardedRef) => {
    const themeName = useTheme()
    const { checkedValue, onChange, disabled, error, name } =
      React.useContext(RadioContext)
    const ref = React.useRef<HTMLInputElement>(
      null as unknown as HTMLInputElement
    )
    React.useImperativeHandle(forwardedRef, () => ref.current)

    const [isFocused, setFocus] = React.useState(false)

    const handleFocus = (evt: React.FocusEvent<HTMLInputElement>) => {
      if (disabled) return

      combineFns(_evt => setFocus(true), props.onFocus)(evt)
    }

    const handleBlur = (evt: React.FocusEvent<HTMLInputElement>) => {
      if (disabled) return

      combineFns(props.onBlur, () => setFocus(false))(evt)
    }

    const handleClick = (evt: React.MouseEvent<HTMLInputElement>) => {
      const value = (evt.target as HTMLInputElement).value
      combineFns(onChange, props.onClick)(evt, value)
      ref.current.focus()
    }

    const checked = isChecked(value, checkedValue)
    return (
      <label
        className={classNames(
          className,
          'psds-radio-button',
          disabled && 'psds-radio-button--disabled'
        )}
      >
        <div className={'psds-radio-button__circle-outer'}>
          <Halo
            error={error}
            inline
            shape={Halo.shapes.pill}
            visibleOnFocus={!disabled}
            visible={isFocused}
            className={'psds-radio-button__halo'}
          >
            <div
              className={classNames(
                'psds-radio-button__circle',
                `psds-theme--${themeName}`,
                checked && 'psds-radio-button__circle--checked'
              )}
            >
              {checked && <div className={'psds-radio-button__circle-inner'} />}
            </div>
          </Halo>
        </div>

        <input
          {...props}
          checked={checked}
          onClick={disabled ? undefined : handleClick}
          onFocus={handleFocus}
          onBlur={handleBlur}
          type="radio"
          readOnly
          name={name}
          ref={ref}
          value={value}
          className={'psds-radio-button__input'}
        />

        <div
          className={classNames(
            'psds-radio-button__label',
            `psds-theme--${themeName}`
          )}
        >
          {label}
        </div>
      </label>
    )
  }
)

Button.displayName = 'Radio.Button'

export default Button
