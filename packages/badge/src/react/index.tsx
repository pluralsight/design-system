import { useTheme } from '@pluralsight/ps-design-system-theme'
import {
  RefForwardingComponent,
  ValueOf,
  classNames
} from '@pluralsight/ps-design-system-util'
import React from 'react'

import '../css/index.css'
import * as vars from '../vars/index'

interface InternalBadgeProps {
  appearance: ValueOf<typeof vars.appearances>
  color: ValueOf<typeof vars.colors>
}

type BadgeProps = React.HTMLAttributes<HTMLDivElement> &
  Partial<InternalBadgeProps>

interface BadgeStatics {
  appearances: typeof vars.appearances
  colors: typeof vars.colors
}

interface BadgeComponent
  extends RefForwardingComponent<BadgeProps, HTMLDivElement, BadgeStatics> {}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  (
    {
      appearance = vars.appearances.default,
      color = vars.colors.neutral,
      className,
      ...rest
    },
    forwardedRef
  ) => {
    const ref = React.useRef<HTMLDivElement>(null)
    // TODO: consider replacing with useCombinedRefs
    React.useImperativeHandle(
      forwardedRef,
      () => ref.current as unknown as HTMLDivElement
    )
    const themeName = useTheme()

    return (
      <div
        ref={ref}
        {...rest}
        className={classNames(
          'psds-badge',
          `psds-badge--apearance-${appearance}`,
          `psds-badge--color-${color}`,
          `psds-theme--${themeName}`,
          className
        )}
      />
    )
  }
) as BadgeComponent

Badge.appearances = vars.appearances
Badge.colors = vars.colors

export const appearances = vars.appearances
export const colors = vars.colors

export default Badge
