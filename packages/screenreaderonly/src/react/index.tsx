import {
  forwardRefWithAs,
  classNames
} from '@pluralsight/ps-design-system-util'
import React from 'react'

import '../css/index.css'

const ScreenReaderOnly = forwardRefWithAs<unknown, 'div'>((props, ref) => {
  const { as: Tag = 'div', className, ...rest } = props

  return (
    <Tag
      ref={ref}
      className={classNames(className, 'psds-screenreader-only')}
      {...rest}
    />
  )
})

export default ScreenReaderOnly
