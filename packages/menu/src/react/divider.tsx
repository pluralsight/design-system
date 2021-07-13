import { classNames } from '@pluralsight/ps-design-system-util'
import React from 'react'

import '../css/index.css'

export const Divider: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...rest
}) => {
  return (
    <div {...rest} className={classNames('psds-menu__divider', className)} />
  )
}

Divider.displayName = 'Menu.Divider'
