import { useTheme, names } from '@pluralsight/ps-design-system-theme'
import { ValueOf, classNames } from '@pluralsight/ps-design-system-util'
import React from 'react'

import '../css/index.css'
import * as vars from '../vars/index'

const style = ({
  themeName,
  size,
  color
}: {
  themeName: ValueOf<typeof names>
  size: ValueOf<typeof vars.pSizes>
  color: ValueOf<typeof vars.textColors>
}) => {
  const label = 'psds-text__p'
  return classNames(
    label,
    `${label}--size-${size}`,
    `${label}--color-${color}`,
    `psds-theme--${themeName}`
  )
}

interface PStatics {
  sizes: typeof vars.pSizes
  colors: typeof vars.textColors
}

interface PProps extends React.HTMLAttributes<HTMLParagraphElement> {
  size?: ValueOf<typeof vars.pSizes>
  color?: ValueOf<typeof vars.textColors>
}

const P: React.FC<PProps> & PStatics = ({
  size = vars.pSizes.medium,
  color = vars.textColors.primary,
  className,
  ...rest
}) => {
  const themeName = useTheme()

  return (
    <p
      {...rest}
      className={classNames(style({ themeName, size, color }), className)}
    >
      {rest.children}
    </p>
  )
}

P.sizes = vars.pSizes
P.colors = vars.textColors

export const sizes = vars.pSizes
export const colors = vars.textColors

export default P
