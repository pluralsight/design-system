import Halo from '@pluralsight/ps-design-system-halo'
import { WarningIcon } from '@pluralsight/ps-design-system-icon'
import {
  useTheme,
  names as themeNames
} from '@pluralsight/ps-design-system-theme'
import {
  ValueOf,
  forwardRefWithStatics,
  classNames
} from '@pluralsight/ps-design-system-util'
import React from 'react'

import '../css/index.css'
import * as vars from '../vars/index'

const styles = {
  error: () => 'psds-text-input__error',
  field: ({
    appearance,
    error,
    fieldAfter,
    icon,
    iconAlign,
    themeName,
    size
  }: {
    appearance: ValueOf<typeof vars.appearances>
    error: boolean
    fieldAfter: React.ReactNode
    icon: React.ReactNode
    iconAlign: ValueOf<typeof vars.iconAligns>
    themeName: ValueOf<typeof themeNames>
    size: ValueOf<typeof vars.sizes>
  }) => {
    const small = size === vars.sizes.small
    return classNames(
      'psds-text-input__field',
      `psds-text-input__field--appearance-${appearance}`,
      `psds-theme--${themeName}`,
      Boolean(fieldAfter) && `psds-text-input__field--w-after`,
      small && 'psds-text-input--small',
      Boolean(icon) && `psds-text-input__field--icon-align-${iconAlign}`,
      error && `psds-text-input__field--error`
    )
  },
  fieldContainer: () => 'psds-text-input__field-container',
  fieldInput: (
    appearance: ValueOf<typeof vars.appearances>,
    themeName: ValueOf<typeof themeNames>
  ) =>
    classNames(
      `psds-theme--${themeName}`,
      `psds-text-input__field-input--appearance-${appearance}`,
      `psds-text-input__field-input`
    ),
  icon: ({
    appearance,
    icon,
    iconAlign,
    themeName
  }: {
    appearance: ValueOf<typeof vars.appearances>
    icon: React.ReactNode
    iconAlign: ValueOf<typeof vars.iconAligns>
    themeName: ValueOf<typeof themeNames>
  }) =>
    classNames(
      'psds-text-input__icon',
      `psds-theme--${themeName}`,
      Boolean(icon) && `psds-text-input__icon--icon-align-${iconAlign}`,
      `psds-text-input__icon--appearance-${appearance}`,
      `psds-text-input__icon`
    ),
  textInput: (disabled: boolean) =>
    classNames('psds-text-input', disabled && 'psds-text-input--disabled'),
  label: (themeName: ValueOf<typeof themeNames>) =>
    classNames(
      'psds-text-input__label',
      `psds-theme--${themeName}`,
      `psds-text-input__label`
    ),
  subLabel: (themeName: ValueOf<typeof themeNames>) =>
    classNames('psds-text-input__sub-label', `psds-theme--${themeName}`)
}

export interface TextInputStatics {
  appearances: typeof vars.appearances
  iconAligns: typeof vars.iconAligns
  sizes: typeof vars.sizes
}

export interface TextInputProps
  extends Omit<
    React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >,
    'size'
  > {
  appearance?: ValueOf<typeof vars.appearances>
  disabled?: boolean
  error?: boolean
  fieldAfter?: React.ReactNode
  icon?: React.ReactNode
  iconAlign?: ValueOf<typeof vars.iconAligns>
  label?: React.ReactNode
  placeholder?: string
  type?: string
  name?: string
  size?: ValueOf<typeof vars.sizes>
  subLabel?: React.ReactNode
  value?: React.ReactText
}

const TextInput = forwardRefWithStatics<
  TextInputProps,
  HTMLInputElement,
  TextInputStatics
>(
  (
    {
      appearance = vars.appearances.default,
      disabled = false,
      error = false,
      iconAlign = vars.iconAligns.left,
      size = vars.sizes.medium,
      fieldAfter,
      icon,
      label,
      subLabel,
      className,
      ...props
    },
    forwardedRef
  ) => {
    const themeName = useTheme()
    return (
      <label
        className={classNames(styles.textInput(disabled), className)}
        style={props.style}
      >
        {label && <div className={styles.label(themeName)}>{label}</div>}

        <div className={styles.fieldContainer()}>
          <Halo error={error} gapSize={Halo.gapSizes.small}>
            <div
              className={styles.field({
                appearance,
                error,
                fieldAfter,
                icon,
                iconAlign,
                themeName,
                size
              })}
            >
              <input
                {...props}
                className={styles.fieldInput(appearance, themeName)}
                disabled={disabled}
                placeholder={props.placeholder}
                ref={forwardedRef}
              />
              {fieldAfter}
            </div>
          </Halo>

          {icon && (
            <div
              className={styles.icon({
                appearance,
                icon,
                iconAlign,
                themeName
              })}
            >
              {icon}
            </div>
          )}

          {error && (
            <div className={styles.error()}>
              <WarningIcon />
            </div>
          )}
        </div>

        {subLabel && (
          <div className={styles.subLabel(themeName)}>{subLabel}</div>
        )}
      </label>
    )
  }
)

TextInput.appearances = vars.appearances
TextInput.iconAligns = vars.iconAligns
TextInput.sizes = vars.sizes

export default TextInput
