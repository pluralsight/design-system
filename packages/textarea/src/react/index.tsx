import { layout, type } from '@pluralsight/ps-design-system-core'
import Halo from '@pluralsight/ps-design-system-halo'
import { WarningIcon } from '@pluralsight/ps-design-system-icon'
import {
  useTheme,
  names as themeNames
} from '@pluralsight/ps-design-system-theme'
import {
  ValueOf,
  RefForwardingComponent,
  classNames
} from '@pluralsight/ps-design-system-util'
import React from 'react'

import '../css/index.css'
import * as vars from '../vars/index'

const calcRowsPxHeight = (rows: React.ReactText) => {
  const int = (varVal: string) => parseInt(varVal.replace('px', ''), 10)
  return (
    int(layout.spacingXSmall) * 2 +
    parseInt(rows as string, 10) * int(type.lineHeightStandard)
  )
}

const styles = {
  error: () => 'psds-text-area__error',
  field: (
    themeName: ValueOf<typeof themeNames>,
    appearance: ValueOf<typeof vars.appearances>,
    error: boolean
  ) => {
    const label = 'psds-text-area__field'

    return classNames(
      label,
      `${label}--appearance-${appearance}`,
      `psds-theme--${themeName}`,
      error && `${label}--error`
    )
  },
  fieldContainer: () => 'psds-text-area__field-container',
  textarea: (disabled: boolean) => {
    const label = 'psds-text-area'

    return classNames(label, disabled && `${label}--disabled`)
  },
  label: (themeName: ValueOf<typeof themeNames>) =>
    classNames('psds-text-area__label', `psds-theme--${themeName}`),
  subLabel: (themeName: ValueOf<typeof themeNames>) =>
    classNames('psds-text-area__sub-label', `psds-theme--${themeName}`)
}

export interface TextAreaStatics {
  appearances: typeof vars.appearances
}

export interface TextAreaProps
  extends Omit<React.HTMLAttributes<HTMLTextAreaElement>, 'rows'> {
  appearance?: ValueOf<typeof vars.appearances>
  disabled?: boolean
  error?: boolean
  label?: React.ReactNode
  placeholder?: string
  rows?: React.ReactText
  subLabel?: React.ReactNode
  value?: React.ReactText
  name?: string
}

export interface TextAreaComponent
  extends RefForwardingComponent<
    TextAreaProps,
    HTMLTextAreaElement,
    TextAreaStatics
  > {}

const TextArea = React.forwardRef(
  (
    {
      appearance = vars.appearances.default,
      className,
      disabled = false,
      error = false,
      label,
      placeholder,
      rows = 4,
      style,
      subLabel,
      ...rest
    },
    ref
  ) => {
    const themeName = useTheme()

    return (
      <label
        style={style}
        className={classNames(styles.textarea(disabled), className)}
      >
        {label && <div className={styles.label(themeName)}>{label}</div>}
        <div className={styles.fieldContainer()}>
          <Halo error={error} gapSize={Halo.gapSizes.small}>
            <textarea
              {...rest}
              className={styles.field(themeName, appearance, error)}
              disabled={disabled}
              placeholder={placeholder}
              ref={ref}
              style={{ height: calcRowsPxHeight(rows) }}
            />
          </Halo>

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
) as TextAreaComponent

TextArea.appearances = vars.appearances
export const appearances = vars.appearances
export default TextArea
