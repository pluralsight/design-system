import Icon, {
  StarFillIcon,
  StarIcon
} from '@pluralsight/ps-design-system-icon'
import { useTheme } from '@pluralsight/ps-design-system-theme'
import {
  ValueOf,
  keyMirror,
  classNames
} from '@pluralsight/ps-design-system-util'
import React from 'react'

import '../css/index.css'

const APPEARANCES = keyMirror('empty', 'half', 'full')

const HalfStarIcon = ({ size }: { size: ValueOf<typeof Icon.sizes> }) => {
  const themeName = useTheme()
  return (
    <Icon size={size}>
      <svg
        role="img"
        aria-label="star half icon"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <symbol id="psds-starrating__half-star__star">
            <path d="M7.71590761,13.8522772 L2.25298114,9.9052852 C2.0291483,9.74356485 1.97879619,9.43101223 2.14051654,9.2071794 C2.23452325,9.07706721 2.38528246,9 2.54580174,9 L9.32999992,9 L11.5259342,2.42042174 C11.6133563,2.15848284 11.8965694,2.01700903 12.1585083,2.10443114 C12.3076212,2.15419757 12.4246481,2.2711924 12.4744554,2.42029163 L14.6724396,9 L21.4541983,9 C21.7303406,9 21.9541983,9.22385763 21.9541983,9.5 C21.9541983,9.66051929 21.877131,9.81127849 21.7470189,9.9052852 L16.2840924,13.8522772 L18.5094075,20.5282225 C18.5967314,20.7901941 18.4551514,21.0733541 18.1931797,21.160678 C18.0405447,21.2115563 17.8727519,21.1858764 17.7423206,21.091676 L12.0021534,16.9459997 L6.25731585,21.0924971 C6.03340576,21.2541105 5.72087724,21.203609 5.55926386,20.9796989 C5.46513169,20.8492818 5.43948525,20.6815443 5.49034729,20.5289581 L7.71590761,13.8522772 Z" />
          </symbol>

          <mask id="psds-starrating__half-star__maskHalf">
            <rect width="50%" height="100%" fill="white" />
          </mask>
        </defs>
        <use
          xlinkHref="#psds-starrating__half-star__star"
          className={`psds-starrating__star__half__secondary--theme-${themeName}`}
        />
        <use
          xlinkHref="#psds-starrating__half-star__star"
          mask="url(#psds-starrating__half-star__maskHalf)"
        />
      </svg>
    </Icon>
  )
}

interface StarProp
  extends Omit<
    React.HTMLAttributes<HTMLSpanElement & HTMLButtonElement>,
    'onClick' | 'onEnter' | 'onLeave'
  > {
  active?: boolean
  appearance: ValueOf<typeof APPEARANCES>
  bright?: boolean
  index: number
  interactive?: boolean
  onClick: (index: number, evt: React.MouseEvent) => void
  onEnter: (index: number, evt: React.MouseEvent | React.FocusEvent) => void
  onLeave: (index: number, evt: React.MouseEvent | React.FocusEvent) => void
}

interface StarStatics {
  appearances: typeof APPEARANCES
}

const Star: React.FC<StarProp> & StarStatics = ({
  active = false,
  bright = false,
  interactive = false,
  onClick,
  onEnter,
  onLeave,
  ...props
}) => {
  const themeName = useTheme()
  const Tag = interactive ? 'button' : 'span'
  const iconSize = Icon.sizes.small
  const value = props.index + 1
  const label = `Rate ${value} Star${value > 1 ? 's' : ''}`

  function handleClicked(event: React.MouseEvent) {
    if (typeof onClick === 'function') onClick(props.index, event)
  }

  function handleEnter(event: React.MouseEvent | React.FocusEvent) {
    if (typeof onEnter === 'function') onEnter(props.index, event)
  }

  function handleLeave(event: React.MouseEvent | React.FocusEvent) {
    if (typeof onLeave === 'function') onLeave(props.index, event)
  }

  return (
    <Tag
      className={classNames(
        'psds-starrating__star',
        `psds-starrating__star--theme-${themeName}`,
        bright && `psds-starrating__star--bright-${themeName}`,
        active && 'psds-starrating__star--active',
        interactive && 'psds-starrating__star--interactive'
      )}
      {...props}
      title={label}
      onBlur={handleLeave}
      onClick={handleClicked}
      onFocus={handleEnter}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      {...(interactive ? { 'aria-label': label } : { 'aria-hidden': true })}
    >
      {props.appearance === APPEARANCES.full && (
        <StarFillIcon size={iconSize} />
      )}

      {props.appearance === APPEARANCES.empty && <StarIcon size={iconSize} />}

      {props.appearance === APPEARANCES.half && (
        <HalfStarIcon size={iconSize} />
      )}
    </Tag>
  )
}

Star.appearances = APPEARANCES

export default Star
