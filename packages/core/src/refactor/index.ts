import { dashify } from '@pluralsight/ps-design-system-util'

import breakpoints from '../js/breakpoints'
import layers from '../js/layers'
import layout from '../js/layout'
import type from '../js/type'
import motion from '../js/motion'
import * as colors from '../js/colors'

type Tokens = {
  breakpoints: typeof breakpoints
  layers: typeof layers
  layout: typeof layout
  type: typeof type
  motion: typeof motion
} & typeof colors

export const cssVars = Object.entries({
  breakpoints,
  layers,
  layout,
  type,
  motion,
  ...colors
}).reduce((acc, [group, obj]) => {
  const keys: Record<string, string> = {}
  if (typeof obj === 'string') {
    keys[group] = `var(--ps-${dashify(group)})`
  } else {
    Object.keys(obj).forEach(key => {
      keys[key] = `var(--ps-${dashify(group)}-${dashify(key)})`
    })
  }
  return { ...acc, [group]: { ...keys } }
}, {}) as Tokens
