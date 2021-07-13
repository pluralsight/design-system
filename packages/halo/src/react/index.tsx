import { useTheme } from '@pluralsight/ps-design-system-theme'
import {
  RefForwardingComponent,
  ValueOf,
  canUseDOM,
  classNames
} from '@pluralsight/ps-design-system-util'
import polyfillFocusWithin from 'focus-within'
import React from 'react'

import '../css/index.css'
import * as vars from '../vars/index'

if (canUseDOM()) polyfillFocusWithin(document)

interface InternalHaloProps {
  error: boolean
  gapSize: ValueOf<typeof vars.gapSizes>
  inline: boolean
  shape: ValueOf<typeof vars.shapes>
  visible: boolean
  visibleOnFocus: boolean
}

type HaloProps = React.HTMLAttributes<HTMLDivElement> &
  Partial<InternalHaloProps>

interface HaloStatics {
  gapSizes: typeof vars.gapSizes
  shapes: typeof vars.shapes
}

type HaloComponent = RefForwardingComponent<
  HaloProps,
  HTMLDivElement,
  HaloStatics
>

const Halo = React.forwardRef((props, ref) => {
  const themeName = useTheme()

  const {
    className,
    error = false,
    gapSize = vars.gapSizes.default,
    inline = false,
    shape = vars.shapes.default,
    visible = false,
    visibleOnFocus = true,
    ...rest
  } = props

  return (
    <div
      ref={ref}
      {...rest}
      className={classNames(
        'psds-halo',
        `psds-theme--${themeName}`,
        `psds-halo--shape-${shape}`,
        `psds-halo--gap-size-${gapSize}`,
        inline && 'psds-halo--inline',
        error && 'psds-halo--error',
        visible && 'psds-halo--visible',
        visibleOnFocus && 'psds-halo--visible-on-focus',
        className
      )}
    />
  )
}) as HaloComponent

Halo.gapSizes = vars.gapSizes
Halo.shapes = vars.shapes

export default Halo
