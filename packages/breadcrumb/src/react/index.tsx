import Button from '@pluralsight/ps-design-system-button'
import { CaretLeftIcon } from '@pluralsight/ps-design-system-icon'
import { classNames } from '@pluralsight/ps-design-system-util'
import React from 'react'

import '../css/index.css'

interface BreadcrumbProps
  extends Omit<
    React.HTMLAttributes<HTMLDivElement>,
    'disabled' | 'href' | 'onClick' | 'target' | 'rel'
  > {
  disabled?: boolean
  href?: string
  loading?: boolean
  onClick?: (
    evt: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement, MouseEvent>
  ) => void
}

const Breadcrumb = React.forwardRef<
  HTMLAnchorElement | HTMLButtonElement,
  BreadcrumbProps
>((props, ref) => {
  const { className, disabled, href, loading, onClick, ...rest } = props
  return (
    <div {...rest} className={classNames('psds-breadcrumb', className)}>
      <Button
        appearance={Button.appearances.flat}
        href={href}
        disabled={disabled}
        icon={<CaretLeftIcon />}
        loading={loading}
        onClick={onClick}
        ref={ref as any}
        size={Button.sizes.small}
      >
        {props.children}
      </Button>
    </div>
  )
})

export default Breadcrumb
