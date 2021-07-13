import Collapsible from '@pluralsight/ps-design-system-collapsible'
import React from 'react'

import { useForceCollapsed } from './context'
import { classNames } from '@pluralsight/ps-design-system-util'
import '../css/index.css'

interface ListProps extends React.HTMLAttributes<HTMLUListElement> {
  collapsed?: boolean
}

export const List: React.FC<ListProps> = props => {
  const { collapsed, className, ...rest } = props
  return (
    <ul
      className={classNames('psds-verticaltabs__list', className)}
      {...rest}
    />
  )
}

interface CollapsibleListProps extends ListProps {
  collapsed?: boolean
}
export const CollapsibleList: React.FC<CollapsibleListProps> = props => {
  const { collapsed, className, ...rest } = props
  const forceCollapsed = useForceCollapsed()
  const [open, setOpen] = React.useState(!collapsed)

  React.useEffect(() => {
    setOpen(!props.collapsed)
  }, [props.collapsed])

  return (
    <Collapsible
      isOpen={!forceCollapsed && open}
      tagName="ul"
      {...rest}
      className={classNames(
        'psds-verticaltabs__list',
        'psds-verticaltabs__list--collapsible',
        className
      )}
    />
  )
}
