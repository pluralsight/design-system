import Avatar from '@pluralsight/ps-design-system-avatar'
import Halo from '@pluralsight/ps-design-system-halo'
import { classNames } from '@pluralsight/ps-design-system-util'
import React from 'react'

import '../css/index.css'

interface NavUserProps
  extends React.HTMLAttributes<
    HTMLAnchorElement | HTMLButtonElement | HTMLDivElement
  > {
  meta?: React.ReactNode
  name?: string
  src?: string
  href?: string
  target?: string
  rel?: string
  onClick?: React.MouseEventHandler<
    HTMLAnchorElement | HTMLButtonElement | HTMLDivElement
  >
}

type NavUserElement = HTMLAnchorElement | HTMLButtonElement | HTMLDivElement

const NavUser = React.forwardRef<NavUserElement, NavUserProps>(
  (props, forwardedRef) => {
    const { meta, name, src, className, ...rest } = props

    const ref = React.useRef<NavUserElement>(null)
    React.useImperativeHandle(
      forwardedRef,
      () => ref.current as unknown as NavUserElement
    )

    const isAnchor = 'href' in props
    const isButton = !isAnchor && 'onClick' in props
    const tagName = isAnchor ? 'a' : isButton ? 'button' : 'div'
    const clickable: boolean = !!props.href || !!props.onClick

    return (
      <Halo inline gapSize={Halo.gapSizes.small} className={className}>
        {React.createElement(
          tagName,
          {
            ref: ref as any,
            className: classNames(
              'psds-navuser',
              clickable && 'psds-navuser--clickable'
            ),
            ...rest
          },
          <>
            <Avatar src={src} size={Avatar.sizes.xSmall} name={name} />
            <Words name={name} meta={meta} />
          </>
        )}
      </Halo>
    )
  }
)

NavUser.displayName = 'NavUser'

export default NavUser

interface WordsProps extends React.HTMLAttributes<HTMLDivElement> {
  meta?: React.ReactNode
  name?: string
}
const Words: React.FC<WordsProps> = props => {
  const { name, meta, ...rest } = props

  return (
    <div className={'psds-navuser__words'} {...rest}>
      <div className={'psds-navuser__name'}>{name}</div>
      <div className={'psds-navuser__plan-name'}>{meta}</div>
    </div>
  )
}
