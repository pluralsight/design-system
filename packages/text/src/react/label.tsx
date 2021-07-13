import { useTheme, names } from '@pluralsight/ps-design-system-theme'
import { ValueOf, classNames } from '@pluralsight/ps-design-system-util'
import React from 'react'

import '../css/index.css'
import * as vars from '../vars/index'

const style = ({
  themeName,
  size,
  color,
  mono,
  strong,
  caps
}: {
  themeName: ValueOf<typeof names>
  size: ValueOf<typeof vars.labelSizes>
  color: ValueOf<typeof vars.textColors>
  mono: boolean
  strong: boolean
  caps: boolean
}) => {
  const label = 'psds-text__label'
  return classNames(
    label,
    `${label}--size-${size}`,
    `${label}--color-${color}`,
    `psds-theme--${themeName}`,
    strong && `${label}--strong`,
    caps && `${label}--caps`,
    mono && `${label}--mono`
  )
}

interface LabelStatics {
  sizes: typeof vars.labelSizes
  colors: typeof vars.textColors
}

interface LabelProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: ValueOf<typeof vars.labelSizes>
  color?: ValueOf<typeof vars.textColors>
  mono?: boolean
  strong?: boolean
  caps?: boolean
}

const Label: React.FC<LabelProps> & LabelStatics = ({
  size = vars.labelSizes.medium,
  color = vars.textColors.primary,
  mono = false,
  strong = false,
  caps = false,
  className,
  ...rest
}) => {
  const themeName = useTheme()

  return (
    <span
      {...rest}
      className={classNames(
        style({ themeName, mono, size, color, strong, caps }),
        className
      )}
    />
  )
}

Label.sizes = vars.labelSizes
Label.colors = vars.textColors

export const sizes = vars.labelSizes
export const colors = vars.textColors

export default Label
