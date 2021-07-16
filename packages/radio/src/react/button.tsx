import Halo from '@pluralsight/ps-design-system-halo'
import Theme, { useTheme } from '@pluralsight/ps-design-system-theme'
import { combineFns, ValueOf } from '@pluralsight/ps-design-system-util'
import glamorDefault, * as glamorExports from 'glamor'
import React from 'react'

import { RadioContext } from './context'
import stylesheet from '../css/index'

const glamor = glamorDefault || glamorExports

const styles = {
  button: (disabled?: boolean) =>
    glamor.compose(
      glamor.css(stylesheet['.psds-radio-button']),
      disabled && glamor.css(stylesheet['.psds-radio-button--disabled'])
    ),
  circle: (themeName: ValueOf<typeof Theme.names>, checked: boolean) =>
    glamor.compose(
      glamor.css(stylesheet['.psds-radio-button__circle']),
      glamor.css(
        stylesheet[`.psds-radio-button__circle.psds-theme--${themeName}`]
      ),
      checked && glamor.css(stylesheet['.psds-radio-button__circle--checked'])
    ),
  circleOuter: () => glamor.css(stylesheet['.psds-radio-button__circle-outer']),
  circleInner: () => glamor.css(stylesheet['.psds-radio-button__circle-inner']),
  halo: () => glamor.css(stylesheet['.psds-radio-button__halo']),
  input: () => glamor.css(stylesheet['.psds-radio-button__input']),
  label: (themeName: ValueOf<typeof Theme.names>) =>
    glamor.compose(
      glamor.css(stylesheet['.psds-radio-button__label']),
      glamor.css(
        stylesheet[`.psds-radio-button__label.psds-theme--${themeName}`]
      )
    )
}

const isChecked = (a: React.ReactText, b?: React.ReactText) => a === b

export interface RadioButtonProps
  extends Omit<React.HTMLAttributes<HTMLInputElement>, 'onClick'> {
  disabled?: boolean
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
  ({ disabled: disabledButton, value, label, ...props }, forwardedRef) => {
    const themeName = useTheme()
    const {
      checkedValue,
      onChange,
      disabled: disabledGroup,
      error,
      name
    } = React.useContext(RadioContext)
    const ref = React.useRef<HTMLInputElement>(
      null as unknown as HTMLInputElement
    )
    React.useImperativeHandle(forwardedRef, () => ref.current)
    const disabled = disabledButton || disabledGroup

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
      <label {...styles.button(disabled)}>
        <div {...styles.circleOuter()}>
          <Halo
            error={error}
            inline
            shape={Halo.shapes.pill}
            visibleOnFocus={!disabled}
            visible={isFocused}
            {...styles.halo()}
          >
            <div {...styles.circle(themeName, checked)}>
              {checked && <div {...styles.circleInner()} />}
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
          {...styles.input()}
        />

        <div {...styles.label(themeName)}>{label}</div>
      </label>
    )
  }
)

Button.displayName = 'Radio.Button'

export default Button
