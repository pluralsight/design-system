import { ValueOf, classNames } from '@pluralsight/ps-design-system-util'
import React from 'react'

import '../css/equal-column-layout.css'
import { equalColumnLayout as vars } from '../vars/index'

interface EqualColumnLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  count: ValueOf<typeof vars.counts>
}
interface EqualColumnLayoutStatics {
  counts: typeof vars.counts
}
const EqualColumnLayout: React.FC<EqualColumnLayoutProps> &
  EqualColumnLayoutStatics = props => {
  const { className, count = vars.counts.four, ...rest } = props
  const useCustomMarkup = React.Children.count(props.children) === 1
  const parentProps = {
    ...rest,
    className: classNames('psds-equal-column-layout', className)
  }
  const children = React.Children.map(
    useCustomMarkup
      ? (props.children as React.ReactElement).props.children
      : props.children,
    child =>
      React.cloneElement(child, {
        className: classNames(
          'psds-equal-column-layout__column',
          `psds-equal-column-layout__column--count-${count}`
        )
      })
  )
  return useCustomMarkup ? (
    React.cloneElement(
      props.children as React.ReactElement,
      parentProps,
      children
    )
  ) : (
    <div {...parentProps}>{children}</div>
  )
}
EqualColumnLayout.displayName = 'EqualColumnLayout'
EqualColumnLayout.counts = vars.counts

export const counts = vars.counts
export default EqualColumnLayout
