import React from 'react'

import {
  RefForwardingComponent,
  ValueOf,
  classNames
} from '@pluralsight/ps-design-system-util'
import '../css/index.css'
import * as vars from '../vars/index'

const styles = {
  tail: (props: Pick<TooltipProps, 'appearance' | 'tailPosition'>) => {
    const label = 'psds-tooltip__tail'

    return classNames(
      label,
      `${label}--appearance-${props.appearance}`,
      `${label}--tailPosition-${props.tailPosition}`
    )
  },
  tooltip: (props: Pick<TooltipProps, 'appearance' | 'onClose'>) => {
    const label = 'psds-tooltip'
    const closeable = typeof props.onClose === 'function'

    return classNames(
      'psds-tooltip',
      `${label}--appearance-${props.appearance}`,
      closeable && `${label}--closeable`
    )
  },
  close: (appearance: ValueOf<typeof vars.appearances>) => {
    const label = 'psds-tooltip__close'

    return classNames(label, `${label}--appearance-${appearance}`)
  }
}
interface CloseButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  onClick: (evt?: React.MouseEvent) => void
  appearance: ValueOf<typeof vars.appearances>
}
const CloseButton: React.FC<CloseButtonProps> = ({ appearance, ...props }) => (
  <button
    className={styles.close(appearance)}
    onClick={props.onClick}
    aria-label="Close tooltip"
  >
    <svg
      role="img"
      aria-label="close icon"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M18 7.41L16.59 6 12 10.59 7.41 6 6 7.41 10.59 12 6 16.59 7.41 18 12 13.41 16.59 18 18 16.59 13.41 12" />
    </svg>
  </button>
)

interface TooltipStatics {
  appearances: typeof vars.appearances
  tailPositions: typeof vars.tailPositions
}

interface TooltipProps extends React.HTMLAttributes<HTMLDivElement> {
  appearance?: ValueOf<typeof vars.appearances>
  children: React.ReactNode
  onClose?: (evt?: React.MouseEvent) => void
  tailPosition?: ValueOf<typeof vars.tailPositions>
}

interface TooltipComponent
  extends RefForwardingComponent<
    TooltipProps,
    HTMLDivElement,
    TooltipStatics
  > {}

const Tooltip = React.forwardRef(
  (
    {
      appearance = vars.appearances.basic,
      tailPosition,
      children,
      onClose,
      className,
      ...rest
    },
    ref
  ) => {
    return (
      <div
        className={classNames(
          styles.tooltip({ appearance, onClose }),
          className
        )}
        {...rest}
        ref={ref}
      >
        {typeof onClose === 'function' && (
          <CloseButton appearance={appearance} onClick={onClose} />
        )}
        {children}
        {tailPosition && (
          <div
            className={styles.tail({ appearance, tailPosition })}
            aria-hidden
          />
        )}
      </div>
    )
  }
) as TooltipComponent

Tooltip.displayName = 'Tooltip'

Tooltip.appearances = vars.appearances
Tooltip.tailPositions = vars.tailPositions

export const appearances = vars.appearances
export const tailPositions = vars.tailPositions

export default Tooltip
