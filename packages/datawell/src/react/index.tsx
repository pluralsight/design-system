import { Label } from '@pluralsight/ps-design-system-text'
import { useTheme } from '@pluralsight/ps-design-system-theme'
import {
  RefForwardingComponent,
  classNames
} from '@pluralsight/ps-design-system-util'
import React from 'react'

import '../css/index.css'

interface DataWellProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string
  subLabel?: React.ReactNode
}

interface DataWellStatics {}

interface DataWellComponent
  extends RefForwardingComponent<
    DataWellProps,
    HTMLDivElement,
    DataWellStatics
  > {}

const DataWell = React.forwardRef((props, ref) => {
  const { children, className, label, subLabel, ...rest } = props
  const themeName = useTheme()

  return (
    <div
      ref={ref}
      {...rest}
      className={classNames(
        'psds-datawell',
        `psds-datawell.psds-theme--${themeName}`,
        className
      )}
    >
      <div>
        <Label
          className={classNames(
            'psds-datawell__label',
            `psds-theme--${themeName}`
          )}
          size={Label.sizes.xSmall}
          color={Label.colors.secondary}
          strong
          caps
        >
          {label}
        </Label>
      </div>

      <div
        className={classNames(
          'psds-datawell__data',
          `psds-theme--${themeName}`
        )}
      >
        {children}
      </div>
      <div
        className={classNames(
          'psds-datawell__sublabel',
          `psds-theme--${themeName}`
        )}
      >
        {subLabel}
      </div>
    </div>
  )
}) as DataWellComponent

export default DataWell
