import { Heading } from '@pluralsight/ps-design-system-text'
import { classNames } from '@pluralsight/ps-design-system-util'
import React from 'react'

import '../css/page-heading-layout.css'

interface PageHeadingLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  actions?: React.ReactNode[]
  heading: React.ReactNode
}
const PageHeadingLayout: React.FC<PageHeadingLayoutProps> = props => {
  const { actions = [], className, heading, ...rest } = props
  return (
    <div
      {...rest}
      className={classNames('psds-page-heading-layout', className)}
    >
      <div className="psds-page-heading-layout__heading">
        <Heading size={Heading.sizes.large}>{heading}</Heading>
        {Array.isArray(actions) && actions.length > 0 && (
          <div className="psds-page-heading-layout__actions">{actions}</div>
        )}
      </div>
      {props.children}
    </div>
  )
}

export default PageHeadingLayout
