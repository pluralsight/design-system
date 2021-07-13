import {
  RefForwardingComponent,
  ValueOf,
  classNames,
  dashify
} from '@pluralsight/ps-design-system-util'
import React from 'react'

import '../css/index.css'
import { colors, sizes } from '../vars'

export interface IconProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: ValueOf<typeof colors>
  size?: ValueOf<typeof sizes>
}

export interface IconStatics {
  colors: typeof colors
  sizes: typeof sizes
}

export interface IconComponent
  extends RefForwardingComponent<IconProps, HTMLDivElement, IconStatics> {}

const Icon = React.forwardRef((props, ref) => {
  const { className, size = sizes.medium, color, ...rest } = props

  return (
    <div
      {...rest}
      className={classNames(
        'psds-icon',
        `psds-icon--size-${dashify(size)}`,
        color && `psds-icon--color-${dashify(color)}`,
        className
      )}
      ref={ref}
    />
  )
}) as IconComponent

Icon.displayName = 'Icon'

Icon.colors = colors
Icon.sizes = sizes

export { colors, sizes }
export default Icon
