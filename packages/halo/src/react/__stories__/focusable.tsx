import * as core from '@pluralsight/ps-design-system-core'
import {
  useTheme,
  names as themeNames
} from '@pluralsight/ps-design-system-theme'
import { ValueOf } from '@pluralsight/ps-design-system-util'
import React from 'react'

import * as vars from '../../vars/index'

const styles = {
  base: {
    background: core.colorsBackgroundDark[3],
    borderRadius: '2px',
    color: core.colorsTextIcon.highOnDark,
    cursor: 'pointer',
    fontSize: core.type.fontSize200,
    fontWeight: core.type.fontWeightDefault,
    lineHeight: core.type.lineHeightStandard,
    outline: 'none',
    padding: `${core.layout.spacingXSmall} ${core.layout.spacingMedium}`,
    position: 'relative',
    textAlign: 'center',
    width: '100%'
  },
  light: {
    background: core.colorsBackgroundLight[1],
    borderColor: core.colorsBorder.highOnLight,
    color: core.colorsTextIcon.highOnLight
  },
  pill: {
    borderRadius: '1000px'
  }
}

interface FocusableProps {
  shape?: ValueOf<typeof vars.shapes>
}
const Focusable: React.FC<FocusableProps> = props => {
  const themeName = useTheme()
  const { shape, children = 'focusable area' } = props

  return (
    <div
      style={
        {
          ...styles.base,
          ...(themeName === themeNames.light ? styles.light : {}),
          ...(shape === vars.shapes.pill ? styles.pill : {})
        } as React.CSSProperties
      }
      tabIndex={0}
    >
      {children}
    </div>
  )
}

export default Focusable
