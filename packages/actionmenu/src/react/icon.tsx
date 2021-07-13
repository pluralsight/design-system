import { classNames } from '@pluralsight/ps-design-system-util'
import React from 'react'

import '../css/index.css'

interface Props extends React.HTMLAttributes<HTMLSpanElement> {
  marginRight?: boolean
  marginLeft?: boolean
}

export const Icon: React.FC<Props> = ({
  className,
  marginLeft,
  marginRight,
  ...rest
}) => (
  <span
    {...rest}
    className={classNames(
      `psds-actionmenu__icon`,
      marginRight && `psds-actionmenu__icon-right`,
      marginLeft && `psds-actionmenu__icon-left`,
      className
    )}
  />
)

Icon.displayName = 'ActionMenu.Icon'
