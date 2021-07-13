import { classNames } from '@pluralsight/ps-design-system-util'
import React from 'react'

import '../css/index.css'

export const Ellipsis = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...rest }, ref) => (
  <span
    ref={ref}
    {...rest}
    className={classNames('psds-actionmenu__ellipsis', className)}
  />
))

Ellipsis.displayName = 'ActionMenu.Ellipsis'
