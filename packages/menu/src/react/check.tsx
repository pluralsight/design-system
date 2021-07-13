import { CheckIcon } from '@pluralsight/ps-design-system-icon'
import { classNames } from '@pluralsight/ps-design-system-util'
import React from 'react'

import '../css/index.css'
import { ItemContext } from './context'

interface CheckProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Check: React.FC<CheckProps> = ({ className, ...rest }) => {
  const { selected } = React.useContext(ItemContext)
  return selected ? (
    // @ts-ignore: ignore icon type
    <CheckIcon
      {...rest}
      className={classNames('psds-menu__item-icon', className)}
    />
  ) : (
    <div
      className={classNames('psds-menu__item-icon-filler', className)}
      style={rest.style}
    />
  )
}
