import { classNames } from '@pluralsight/ps-design-system-util'
import React from 'react'

import '../css/index.css'

const VerticalLayout: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  style,
  ...props
}) => {
  const children = React.Children.toArray(props.children).filter(child =>
    React.isValidElement(child)
  )

  return (
    <div className={classNames('psds-form-vertical-layout', className)}>
      {children.map((child, i) => (
        <div key={i} className="psds-form-vertical-layout__child">
          {React.cloneElement(child as React.ReactElement, {
            style: { ...style, width: '100%', maxWidth: 'none' }
          })}
        </div>
      ))}
    </div>
  )
}

VerticalLayout.displayName = 'VerticalLayout'

export default VerticalLayout
