import { useTheme } from '@pluralsight/ps-design-system-theme'
import { classNames } from '@pluralsight/ps-design-system-util'
import React from 'react'

import { RadioContext } from './context'
import '../css/index.css'

const useValue = ({
  value,
  onChange
}: {
  value?: React.ReactText
  onChange?: (evt?: React.MouseEvent, val?: React.ReactText) => void
}) => {
  const [_value, setValue] = React.useState(value)
  return {
    ...(value !== undefined && onChange !== undefined
      ? { checkedValue: value, onChange }
      : {
          checkedValue: _value,
          onChange: (evt?: React.MouseEvent, val?: React.ReactText) =>
            setValue(val)
        })
  }
}

export interface RadioGroupProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  children?: React.ReactNode
  disabled?: boolean
  error?: boolean
  label?: React.ReactNode
  name: string
  onChange?: (evt?: React.MouseEvent, val?: React.ReactText) => void
  subLabel?: React.ReactNode
  value?: React.ReactText
}

const Group = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  (
    {
      children,
      disabled = false,
      error = false,
      label,
      name,
      onChange,
      subLabel,
      value,
      className,
      ...rest
    },
    ref
  ) => {
    const themeName = useTheme()
    return (
      <div
        className={classNames(
          className,
          'psds-radio-group',
          disabled && 'psds-radio-group--disabled'
        )}
        {...rest}
        ref={ref}
        role="radiogroup"
      >
        {label && (
          <div
            className={classNames(
              'psds-radio-group__label',
              `psds-theme--${themeName}`
            )}
          >
            {label}
          </div>
        )}
        <div className={'psds-radio-group__button-container'}>
          <RadioContext.Provider
            value={{
              disabled,
              error,
              name,
              ...useValue({ value, onChange })
            }}
          >
            {children}
          </RadioContext.Provider>
        </div>
        {subLabel && (
          <div
            className={classNames(
              'psds-radio-group__sub-label',
              `psds-theme--${themeName}`
            )}
          >
            {subLabel}
          </div>
        )}
      </div>
    )
  }
)

Group.displayName = 'Radio.Group'

export default Group
