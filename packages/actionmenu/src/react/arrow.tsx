import { classNames } from '@pluralsight/ps-design-system-util'
import React from 'react'

import '../css/index.css'

export const Arrow: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...rest
}) => (
  <div
    {...rest}
    className={classNames('psds-actionmenu__item__arrow', className)}
    data-submenu-arrow
  >
    <svg
      width="4"
      height="9"
      viewBox="0 0 4 9"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 .33l3.657 4.15L0 8.634V.33"
        className="psds-actionmenu__item__arrow__svg"
      />
    </svg>
  </div>
)

Arrow.displayName = 'ActionMenu.Arrow'
