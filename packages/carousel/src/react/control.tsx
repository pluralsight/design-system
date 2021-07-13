import Halo from '@pluralsight/ps-design-system-halo'
import {
  CaretLeftIcon,
  CaretRightIcon,
  sizes as iconSizes
} from '@pluralsight/ps-design-system-icon'
import { useTheme } from '@pluralsight/ps-design-system-theme'
import {
  ValueOf,
  classNames,
  combineFns
} from '@pluralsight/ps-design-system-util'
import React from 'react'

import '../css/index.css'
import CarouselContext from './context'
import * as vars from '../vars/index'

interface ControlProps
  extends Omit<React.HTMLAttributes<HTMLButtonElement>, 'onClick'> {
  direction: ValueOf<typeof vars.controlDirections>
  onClick?: (evt?: React.MouseEvent) => void
}

interface ControlStatics {
  directions: typeof vars.controlDirections
}

type ControlComponent = React.FC<ControlProps> & ControlStatics
export const Control: ControlComponent = props => {
  const { className, direction, onClick, ...rest } = props
  const context = React.useContext(CarouselContext)
  const themeName = useTheme()

  const isPrev = direction === Control.directions.prev
  const isVisible = isPrev ? context.isPrevVisible : context.isNextVisible
  const label = isPrev ? 'Previous items' : 'Next items'

  const IconCaret = isPrev ? CaretLeftIcon : CaretRightIcon
  const handleClick = combineFns(isPrev ? context.prev : context.next, onClick)

  return (
    <div
      className={classNames(
        'psds-carousel__controls__control',
        `psds-carousel__controls__control--${direction}`,
        className
      )}
      {...(!isVisible && { hidden: true })}
    >
      <Halo shape={Halo.shapes.pill}>
        <button
          {...rest}
          aria-label={label}
          onClick={handleClick}
          className={classNames(
            'psds-carousel__controls__control__button',
            `psds-theme--${themeName}`
          )}
          {...(!isVisible && { tabIndex: -1 })}
        >
          <IconCaret aria-hidden size={iconSizes.medium} />
        </button>
      </Halo>
    </div>
  )
}
Control.displayName = 'Carousel.Control'

Control.directions = vars.controlDirections
