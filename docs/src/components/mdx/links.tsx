import DSLink from '@pluralsight/ps-design-system-link'
import { Link as GatsbyLink } from 'gatsby'
import React, { AllHTMLAttributes } from 'react'

export const A: React.FC<AllHTMLAttributes<HTMLAnchorElement>> = ({
  className,
  ...rest
}) => {
  const isExternal = /[a-z]+:\/\//.test(rest.href)

  return (
    <DSLink className={className}>
      {isExternal ? (
        <a {...rest} rel="noopener noreferrer" />
      ) : (
        <GatsbyLink {...rest} to={rest.href} />
      )}
    </DSLink>
  )
}
