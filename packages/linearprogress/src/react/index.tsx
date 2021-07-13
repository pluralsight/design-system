import { classNames } from '@pluralsight/ps-design-system-util'
import React from 'react'
import ScreenReaderOnly from '@pluralsight/ps-design-system-screenreaderonly'
import { useTheme } from '@pluralsight/ps-design-system-theme'

import '../css/index.css'
import { toPercentageString } from '../js/index'

interface LinearProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number
  'aria-label': string
}

const LinearProgress: React.FC<LinearProgressProps> = ({
  value = 0,
  'aria-label': ariaLabel,
  className,
  ...rest
}) => {
  const themeName = useTheme()
  const busy = value
    ? value === 100
      ? 'false'
      : value > 0
      ? 'true'
      : 'false'
    : 'true'
  const percent = toPercentageString(`${value}`)
  const isComplete = percent === '100%'
  return (
    <div
      className={classNames(
        className,
        `psds-theme--${themeName}`,
        'psds-linearprogress__bg'
      )}
      {...rest}
      role="progressbar"
      aria-busy={busy}
      aria-label={ariaLabel}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(value)}
    >
      {value ? (
        <ScreenReaderOnly aria-live={'polite'}>
          {value < 100 ? `${Math.round(value)}%` : 'complete'}
        </ScreenReaderOnly>
      ) : null}
      <div
        className={classNames(
          'psds-linearprogress__fg',
          isComplete && 'psds-linearprogress__fg--complete'
        )}
        style={{ width: percent }}
      />
    </div>
  )
}

export default LinearProgress
