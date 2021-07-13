import Halo from '@pluralsight/ps-design-system-halo'
import { sizes as iconSizes } from '@pluralsight/ps-design-system-icon'
import { useTheme } from '@pluralsight/ps-design-system-theme'
import { ValueOf, classNames } from '@pluralsight/ps-design-system-util'
import React from 'react'

import '../css/index.css'
import * as vars from '../vars/index'

export interface TagProps
  extends React.HTMLAttributes<HTMLAnchorElement | HTMLDivElement> {
  error?: boolean
  icon?: React.ReactElement
  isPressed?: boolean
  size?: ValueOf<typeof vars.sizes>
  href?: string
  target?: string
  rel?: string
}

type TagElement = HTMLAnchorElement | HTMLDivElement

export interface TagStatics {
  sizes: typeof vars.sizes
}

const Tag = React.forwardRef<TagElement, TagProps>((props, ref) => {
  const {
    children,
    className,
    error = false,
    icon,
    isPressed = false,
    href,
    size = vars.sizes.medium,
    ...rest
  } = props

  const isAnchor = 'href' in props
  const themeName = useTheme()

  const Wrapper = isAnchor ? 'a' : 'div'
  const label = 'psds-tag'
  const clickable = Boolean(props.onClick || href)
  return (
    <Halo error={error} shape={Halo.shapes.pill} inline>
      <Wrapper
        {...rest}
        {...(isAnchor && { href })}
        {...(isPressed && !isAnchor && { 'aria-pressed': true })}
        {...(Boolean(props.onClick) && { role: 'button', tabIndex: 0 })}
        className={classNames(
          className,
          label,
          `psds-theme--${themeName}`,
          clickable && `${label}--clickable`,
          `${label}--size-${size}`,
          icon && `${label}--icon`,
          isPressed && `${label}--is-pressed`
        )}
        ref={ref as any}
      >
        <Label icon={Boolean(icon)}>{children}</Label>
        {renderIcon(icon, size)}
      </Wrapper>
    </Halo>
  )
}) as React.ForwardRefExoticComponent<TagProps> & TagStatics

Tag.displayName = 'Tag'
Tag.sizes = vars.sizes

interface LabelProps extends React.HTMLAttributes<HTMLSpanElement> {
  icon: boolean
}
const Label: React.FC<LabelProps> = ({ icon, ...props }) => {
  const label = 'psds-tag__label'

  return (
    <span className={classNames(label, icon && `${label}--icon`)} {...props} />
  )
}

const renderIcon = (
  icon?: React.ReactElement,
  size?: ValueOf<typeof sizes>
) => {
  if (!icon) return null

  const style = {
    cursor: icon.props.onClick ? 'pointer' : 'default'
  }
  const onClick = (evt: React.MouseEvent) => {
    evt.stopPropagation()
    if (icon.props.onClick) icon.props.onClick(evt)
  }

  return React.cloneElement(icon, {
    style,
    onClick,
    size: size === vars.sizes.small ? iconSizes.small : iconSizes.medium
  })
}

export const sizes = vars.sizes
export default Tag
