import ScreenReaderOnly from '@pluralsight/ps-design-system-screenreaderonly'
import { useTheme } from '@pluralsight/ps-design-system-theme'
import {
  RefForwardingComponent,
  ValueOf,
  classNames
} from '@pluralsight/ps-design-system-util'
import React from 'react'

import '../css/index.css'
import * as vars from '../vars/index'

const radius = vars.style.width / 2 - vars.style.strokeWidth / 2
const circumference = 2 * Math.PI * radius

interface CircularProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: ValueOf<typeof vars.sizes>
  value?: number
  'aria-label': string
}

interface CircularProgressStatics {
  sizes: typeof vars.sizes
}

interface CircularProgressComponent
  extends RefForwardingComponent<
    CircularProgressProps,
    HTMLDivElement,
    CircularProgressStatics
  > {}

const CircularProgress = React.forwardRef<
  HTMLDivElement,
  CircularProgressProps
>((props, ref) => {
  const defaultIndeterminateValue = 25
  const {
    className,
    size = vars.sizes.medium,
    value,
    'aria-label': ariaLabel,
    ...rest
  } = props
  const themeName = useTheme()

  const dashOffset =
    ((100 - (value || defaultIndeterminateValue)) / 100) * circumference
  const busy = value
    ? value === 100
      ? 'false'
      : value > 0
      ? 'true'
      : 'false'
    : 'true'
  const ariaAttributes = value
    ? {
        'aria-label': ariaLabel,
        'aria-valuemin': 0,
        'aria-valuemax': 100,
        'aria-valuenow': Math.round(value)
      }
    : {
        'aria-label': 'Loading'
      }

  return (
    <div
      ref={ref}
      {...rest}
      role="progressbar"
      {...ariaAttributes}
      className={classNames(`psds-circularprogress--size-${size}`, className)}
      aria-busy={busy}
    >
      {value ? (
        <ScreenReaderOnly aria-live={'polite'}>
          {value < 100 ? `${Math.round(value)}%` : 'complete'}
        </ScreenReaderOnly>
      ) : null}

      <svg
        className={classNames(
          'psds-circularprogress__svg',
          typeof props.value === 'undefined' &&
            'psds-circularprogress__svg--no-value'
        )}
        viewBox={`0 0 ${vars.style.width} ${vars.style.width}`}
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          r={radius}
          cx="24"
          cy="24"
          className={classNames(
            'psds-circularprogress__bg',
            `psds-theme--${themeName}`
          )}
        />
        <circle
          r={radius}
          cx="24"
          cy="24"
          className={classNames(
            'psds-circularprogress__fg',
            `psds-circularprogress__fg psds-theme--${themeName}`
          )}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={dashOffset}
        />
      </svg>
    </div>
  )
}) as CircularProgressComponent

CircularProgress.sizes = vars.sizes
export const sizes = vars.sizes

export default CircularProgress
