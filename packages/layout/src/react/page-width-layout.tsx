import { classNames } from '@pluralsight/ps-design-system-util'
import React from 'react'

import '../css/page-width-layout.css'

const PageWidthLayout: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...rest
}) => {
  return (
    <div {...rest} className={classNames('psds-page-width-layout', className)}>
      {rest.children}
    </div>
  )
}
PageWidthLayout.displayName = 'PageWidthLayout'

export default PageWidthLayout
