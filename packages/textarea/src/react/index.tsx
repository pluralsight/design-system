import { layout, type } from '@pluralsight/ps-design-system-core'
import Halo from '@pluralsight/ps-design-system-halo'
import { WarningIcon } from '@pluralsight/ps-design-system-icon'
import {
  useTheme,
  names as themeNames
} from '@pluralsight/ps-design-system-theme'
import {
  ValueOf,
  RefForwardingComponent
} from '@pluralsight/ps-design-system-util'
import glamorDefault, * as glamorExports from 'glamor'
import React from 'react'

import stylesheet from '../css/index'
import * as vars from '../vars/index'

const glamor = glamorDefault || glamorExports

const calcRowsPxHeight = (rows: React.ReactText) => {
  const int = (varVal: string) => parseInt(varVal.replace('px', ''), 10)
  return (
    int(layout.spacingXSmall) * 2 +
    parseInt(rows as string, 10) * int(type.lineHeightStandard)
  )
}

const styles = {
  error: () => glamor.css(stylesheet['.psds-text-area__error']),
  field: (
    themeName: ValueOf<typeof themeNames>,
    appearance: ValueOf<typeof vars.appearances>,
    error: boolean
  ) => {
    const label = 'psds-text-area__field'

    return glamor.compose(
      glamor.css(stylesheet[`.${label}`]),
      glamor.css(stylesheet[`.${label}--appearance--${appearance}`]),
      glamor.css(
        stylesheet[
          `.${label}--appearance-${appearance}.psds-theme--${themeName}`
        ]
      ),
      glamor.css(stylesheet[`.${label}.psds-theme--${themeName}`]),
      error &&
        glamor.css(stylesheet[`.${label}--error.psds-theme--${themeName}`])
    )
  },
  fieldContainer: () =>
    glamor.css(stylesheet['.psds-text-area__field-container']),
  textarea: (disabled: boolean) => {
    const label = 'psds-text-area'

    return glamor.compose(
      glamor.css(stylesheet[`.${label}`]),
      disabled && glamor.css(stylesheet[`.${label}--disabled`])
    )
  },
  label: (themeName: ValueOf<typeof themeNames>) => {
    const label = 'psds-text-area__label'

    return glamor.compose(
      glamor.css(stylesheet[`.${label}`]),
      glamor.css(stylesheet[`.${label}.psds-theme--${themeName}`])
    )
  },
  subLabel: (themeName: ValueOf<typeof themeNames>) => {
    const label = 'psds-text-area__sub-label'

    return glamor.compose(
      glamor.css(stylesheet[`.${label}`]),
      glamor.css(stylesheet[`.${label}.psds-theme--${themeName}`])
    )
  }
}

export interface TextAreaStatics {
  appearances: typeof vars.appearances
}

export interface TextAreaProps
  extends Omit<
    React.DetailedHTMLProps<
      React.TextareaHTMLAttributes<HTMLTextAreaElement>,
      HTMLTextAreaElement
    >,
    'rows'
  > {
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
      <label {...styles.textarea(disabled)} style={style} className={className}>
        {label && <div {...styles.label(themeName)}>{label}</div>}
        <div {...styles.fieldContainer()}>
          <Halo error={error} gapSize={Halo.gapSizes.small}>
            <textarea
              {...rest}
              {...styles.field(themeName, appearance, error)}
              disabled={disabled}
              placeholder={placeholder}
              ref={ref}
              style={{ height: calcRowsPxHeight(rows) }}
            />
          </Halo>

          {error && (
            <div {...styles.error()}>
              <WarningIcon />
            </div>
          )}
        </div>

        {subLabel && <div {...styles.subLabel(themeName)}>{subLabel}</div>}
      </label>
    )
  }
) as TextAreaComponent

TextArea.appearances = vars.appearances
export const appearances = vars.appearances
export default TextArea
