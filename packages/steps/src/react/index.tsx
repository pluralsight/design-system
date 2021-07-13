import {
  ValueOf,
  isString,
  classNames
} from '@pluralsight/ps-design-system-util'
import { useTheme } from '@pluralsight/ps-design-system-theme'
import React from 'react'

import '../css/index.css'
import * as vars from '../vars/index'

import Context, { ContextValue, initialContext } from './context'

interface StepsStatics {
  Step: typeof Step
  Marker: typeof Marker
  orientations: typeof vars.orientations
  sizes: typeof vars.sizes
  statuses: typeof vars.statuses
}

interface StepsProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  counter?: boolean
  orientation?: ValueOf<typeof Steps.orientations>
  size?: ValueOf<typeof Steps.sizes>
}
const Steps = React.forwardRef<HTMLDivElement, StepsProps>((props, ref) => {
  const {
    counter = initialContext.counter,
    orientation = initialContext.orientation,
    size = initialContext.size,
    className,
    ...rest
  } = props

  const themeName = useTheme()
  const contextValue: ContextValue = { counter, orientation, size }

  return (
    <Context.Provider value={contextValue}>
      <div
        ref={ref}
        className={classNames(
          className,
          'psds-steps',
          `psds-theme--${themeName}`,
          `psds-steps--${orientation}`
        )}
        {...rest}
      />
    </Context.Provider>
  )
}) as React.ForwardRefExoticComponent<StepsProps> & StepsStatics

Steps.displayName = 'Steps'

interface StepProps extends React.HTMLAttributes<HTMLDivElement> {
  description?: React.ReactNode
  marker?: React.ComponentType<MarkerProps>
  renderMarkerContainer?: (
    props: React.HTMLAttributes<HTMLDivElement>
  ) => React.ReactElement
  status: ValueOf<typeof Steps.statuses>
}
const defaultMarkerContainer = (
  props: React.HTMLAttributes<HTMLDivElement>
) => <div {...props} />

const Step = React.forwardRef<HTMLDivElement, StepProps>((props, ref) => {
  const {
    children,
    description,
    marker: StepMarker = Marker,
    renderMarkerContainer = defaultMarkerContainer,
    status,
    className,
    ...rest
  } = props

  const MarkerContainer = React.useMemo(
    () => renderMarkerContainer,
    [renderMarkerContainer]
  )

  const interactive = 'onClick' in props

  const themeName = useTheme()
  const { orientation, size } = React.useContext(Context)

  return (
    <div
      ref={ref}
      className={classNames(
        className,
        'psds-steps__step',
        `psds-theme--${themeName}`,
        `psds-steps__step--${orientation}`,
        `psds-steps__step--${size}`,
        `psds-steps__step--${status}`,
        interactive && 'psds-steps__step--interactive'
      )}
      {...rest}
    >
      <MarkerContainer
        className={classNames(
          'psds-steps__marker-container',
          `psds-steps__marker-container--${size}`
        )}
      >
        <StepMarker status={status} />
      </MarkerContainer>

      <div>
        <div
          className={classNames(
            'psds-steps__title',
            `psds-theme--${themeName}`,
            `psds-steps__title--${size}`,
            `psds-steps__title--${status}`
          )}
        >
          {isString(children) ? <p>{children}</p> : children}
        </div>

        {description && (
          <div
            className={classNames(
              'psds-steps__description',
              `psds-steps__description--${size}`,
              `psds-steps__description--${status}`
            )}
          >
            {isString(description) ? <p>{description}</p> : description}
          </div>
        )}
      </div>
    </div>
  )
})
Step.displayName = 'Steps.Step'

interface MarkerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'ref'> {
  status: ValueOf<typeof Steps.statuses>
}

const Marker = React.forwardRef<HTMLDivElement, MarkerProps>((props, ref) => {
  const { status, className, ...rest } = props

  const themeName = useTheme()
  const { counter, size } = React.useContext(Context)

  const [diameter, stroke, radius] = React.useMemo(() => {
    const large = size === 'large'
    const _diameter = large ? 36 : 24
    const _stroke = large ? 2 : 2
    const _radius = _diameter / 2 - _stroke / 2

    return [_diameter, _stroke, _radius]
  }, [size])

  return (
    <div
      ref={ref}
      className={classNames(
        className,
        `psds-theme--${themeName}`,
        'psds-steps__marker',
        `psds-steps__marker--${size}`,
        `psds-steps__marker--${status}`,
        counter && 'psds-steps__marker--hide-counter'
      )}
      {...rest}
      style={{ width: diameter, height: diameter, ...rest.style }}
    >
      <svg viewBox={`0 0 ${diameter} ${diameter}`}>
        <circle
          cx={diameter / 2}
          cy={diameter / 2}
          r={radius}
          strokeWidth={stroke}
          className={'psds-steps__marker__circle'}
        />

        <polyline
          strokeWidth={stroke}
          points={`
            ${diameter / 3.8} ${diameter / 2},
            ${diameter / 2.3} ${diameter / 1.5},
            ${diameter / 1.4} ${diameter / 3}
          `}
          className={classNames(
            'psds-steps__marker__check',
            `psds-steps__marker__check--${status}`
          )}
        />
      </svg>
    </div>
  )
})

Marker.displayName = 'Steps.Marker'

Steps.Marker = Marker
Steps.Step = Step

Steps.orientations = vars.orientations
Steps.sizes = vars.sizes
Steps.statuses = vars.statuses

export default Steps
