import { MenuIcon } from '@pluralsight/ps-design-system-icon'
import { classNames } from '@pluralsight/ps-design-system-util'
import NavItem from '@pluralsight/ps-design-system-navitem'
import React from 'react'

import '../css/index.css'

interface NavBarProps extends React.HTMLAttributes<HTMLDivElement> {
  brand?: React.ReactNode
  items?: React.ReactNode
  onMobileMenuClick?: React.MouseEventHandler
  user?: React.ReactNode
  utility?: React.ReactNode
}

const NavBar = React.forwardRef<HTMLDivElement, NavBarProps>(
  (props, forwardedRef) => {
    const {
      brand,
      className,
      items,
      onMobileMenuClick,
      utility,
      user,
      ...rest
    } = props

    const ref = React.useRef<HTMLDivElement>(null)
    React.useImperativeHandle(
      forwardedRef,
      () => ref.current as unknown as HTMLDivElement
    )

    return (
      <div ref={ref} className={classNames(className, 'psds-navbar')} {...rest}>
        {onMobileMenuClick && (
          <div className={'psds-navbar__mobile-menu'}>
            <NavItem icon={<MenuIcon />} onClick={onMobileMenuClick} />
          </div>
        )}
        <div className={'psds-navbar__brand'}>{brand}</div>
        <div className={'psds-navbar__items'}>{items}</div>
        <div className={'psds-navbar__utility'}>{utility}</div>
        <div className={'psds-navbar__user'}>{user}</div>
      </div>
    )
  }
)
NavBar.displayName = 'NavBar'

export default NavBar
