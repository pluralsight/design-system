import React from 'react'
import { useTheme, names } from '@pluralsight/ps-design-system-theme'
import { ValueOf, classNames } from '@pluralsight/ps-design-system-util'

import '../css/index.css'
import * as vars from '../vars/index'

const style = ({
  themeName,
  size,
  color
}: {
  themeName?: ValueOf<typeof names>
  size?: ValueOf<typeof vars.headingSizes>
  color: ValueOf<typeof vars.textColors>
}) => {
  const label = 'psds-text__heading'
  return classNames(
    label,
    `${label}--size-${size}`,
    `${label}--color-${color}`,
    `psds-theme--${themeName}`
  )
}

interface HeadingStatics {
  sizes: typeof vars.headingSizes
  colors: typeof vars.textColors
}

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  size?: ValueOf<typeof vars.headingSizes>
  color?: ValueOf<typeof vars.textColors>
}

const Heading: React.FC<HeadingProps> & HeadingStatics = ({
  children,
  size = vars.labelSizes.large,
  color = vars.textColors.primary,
  className,
  ...rest
}) => {
  const themeName = useTheme()
  if (!React.isValidElement(children)) return null

  return React.cloneElement(React.Children.only(children), {
    ...rest,
    className: classNames(
      className,
      style({
        size,
        color,
        themeName
      })
    )
  })
}

Heading.sizes = vars.headingSizes
Heading.colors = vars.textColors

export const sizes = vars.headingSizes
export const colors = vars.textColors

export default Heading
