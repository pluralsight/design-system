import { PropsWithStylesFor } from '@pluralsight/ps-design-system-util'
import React from 'react'

import Context, {
  AllowedSelectors,
  ContextValue,
  initialValue
} from './context'
import { HorzLayout } from './horz'
import { alignments } from '../vars/index'
import { VertLayout } from './vert'

interface NavItemProps
  extends PropsWithStylesFor<AllowedSelectors>,
    Partial<ContextValue> {
  className?: string
}

interface NavItemStatics {
  alignments: typeof alignments
}

const NavItem = React.forwardRef<HTMLButtonElement, NavItemProps>(
  (props, forwardedRef) => {
    const {
      alignment = initialValue.alignment,
      bar,
      children,
      icon,
      menu = initialValue.menu,
      renderContainer = initialValue.renderContainer,
      selected = initialValue.selected,
      className,
      ...rest
    } = props

    const Layout = alignment === alignments.horizontal ? HorzLayout : VertLayout
    const ctx = {
      alignment,
      bar,
      icon,
      menu,
      ref: forwardedRef,
      selected,
      renderContainer,
      rest
    }

    return (
      <Context.Provider value={ctx}>
        <Layout className={className}>{children}</Layout>
      </Context.Provider>
    )
  }
) as React.ForwardRefExoticComponent<Pick<NavItemProps, React.ReactText>> &
  NavItemStatics

NavItem.displayName = 'NavItem'
NavItem.alignments = alignments

export default NavItem
