import Halo from '@pluralsight/ps-design-system-halo'
import { classNames } from '@pluralsight/ps-design-system-util'
import React from 'react'

import '../css/index.css'

interface NavBrandProps
  extends React.HTMLAttributes<
    HTMLAnchorElement | HTMLButtonElement | HTMLDivElement
  > {
  logo?: React.ReactNode
  wordmark?: React.ReactNode
  onClick?: React.MouseEventHandler<
    HTMLAnchorElement | HTMLButtonElement | HTMLDivElement
  >
  href?: string
  target?: string
  rel?: string
}

type NavBrandElement = HTMLAnchorElement | HTMLButtonElement | HTMLDivElement

const NavBrand = React.forwardRef<NavBrandElement, NavBrandProps>(
  (props, forwardedRef) => {
    const { className, logo, wordmark, ...rest } = props

    const ref = React.useRef<NavBrandElement>(null)
    React.useImperativeHandle(
      forwardedRef,
      () => ref.current as unknown as NavBrandElement
    )
    const isAnchor = 'href' in props
    const isButton = !isAnchor && 'onClick' in props

    const Wrapper = isAnchor ? 'a' : isButton ? 'button' : 'div'

    return (
      <Halo inline gapSize={Halo.gapSizes.small}>
        <Wrapper
          className={classNames(
            className,
            'psds-navbrand',
            Boolean(props.href || props.onClick) && 'psds-navbrand--clickable'
          )}
          ref={ref as any}
          {...rest}
        >
          <Logo>{logo}</Logo>
          <Wordmark>{wordmark}</Wordmark>
        </Wrapper>
      </Halo>
    )
  }
)

export default NavBrand

const Logo: React.FC = props => (
  <div
    className={classNames(
      'psds-navbrand__logo',
      React.Children.count(props.children) > 0 &&
        'psds-navbrand__logo--wordmark'
    )}
    {...props}
  />
)
Logo.displayName = 'NavBrand.Logo'

const Wordmark: React.FC = props => (
  <div className={'psds-navbrand__wordmark'} {...props} />
)
Wordmark.displayName = 'NavBrand.Wordmark'
