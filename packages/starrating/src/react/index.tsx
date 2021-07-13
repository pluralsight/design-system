import { ValueOf } from '@pluralsight/ps-design-system-util'
import React from 'react'

import '../css/index.css'
import Star from './star'

interface ScreenReaderInputProps
  extends React.HTMLAttributes<HTMLInputElement> {
  type: string
  min: number
  max: number
  step: number
  value: React.ReactText
}

const ScreenReaderInput: React.FC<ScreenReaderInputProps> = props => (
  <input
    className={'psds-starrating__screen-reader-input'}
    tabIndex={-1}
    {...props}
  />
)

const ScreenReaderText: React.FC<React.HTMLAttributes<HTMLSpanElement>> =
  props => <span className={'psds-starrating__screen-reader-text'} {...props} />

export interface StarRatingProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  onChange?: (
    val: React.ReactText,
    evt: React.ChangeEvent | React.MouseEvent
  ) => void
  starCount?: number
  value?: React.ReactText | null
}

const StarRating = React.forwardRef<HTMLDivElement, StarRatingProps>(
  ({ starCount = 5, value, onChange, ...props }, ref) => {
    const [hoverIndex, setHoverIndex] = React.useState<null | number>(null)
    const isInteractive = !!onChange

    const handleInputChanged = (evt: React.ChangeEvent<HTMLInputElement>) => {
      if (!isInteractive) return
      onChange && onChange((evt.target as HTMLInputElement).value, evt)
    }

    const handleStarClicked = (index: number, evt: React.MouseEvent) => {
      if (!isInteractive) return
      onChange && onChange(index + 1, evt)
    }

    const handleStarEnter = (index: number) => {
      if (!isInteractive) return
      setHoverIndex(index)
    }

    const handleStarLeave = () => {
      if (!isInteractive) return
      setHoverIndex(null)
    }

    const stars = (() => {
      const hasValidRating = !Number.isNaN(
        parseFloat(value as unknown as string)
      )
      const isHovering = hoverIndex !== null

      const valueRounded = Math.round((value as number) * 2) / 2
      const fullStars = Math.floor(valueRounded)
      const halfStars = Math.floor(valueRounded) !== valueRounded

      return [...Array(starCount)].map((_, index) => {
        let active = false
        let bright = false
        let appearance: ValueOf<typeof Star.appearances>

        if (isHovering) {
          // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
          if (index <= (hoverIndex as number)) {
            active = true
            appearance = Star.appearances.full
          } else {
            appearance = Star.appearances.empty
          }
        } else {
          if (isInteractive && !hasValidRating) {
            appearance = Star.appearances.empty
            bright = true
          } else if (index < fullStars) {
            active = true
            appearance = Star.appearances.full
          } else if (index === fullStars && halfStars) {
            active = true
            appearance = Star.appearances.half
          } else {
            appearance = Star.appearances.full
          }
        }

        return (
          <Star
            active={active}
            appearance={appearance}
            bright={bright}
            index={index}
            interactive={isInteractive}
            key={index}
            onClick={handleStarClicked}
            onEnter={handleStarEnter}
            onLeave={handleStarLeave}
          />
        )
      })
    })()

    return (
      <div {...props} ref={ref}>
        {isInteractive && (
          <label>
            <ScreenReaderText>Rate</ScreenReaderText>
            <ScreenReaderInput
              type="range"
              onChange={handleInputChanged}
              min={1}
              max={starCount}
              step={1}
              value={value || 0}
            />
          </label>
        )}

        {stars}

        <ScreenReaderText>This is rated {value}</ScreenReaderText>
      </div>
    )
  }
)

export default StarRating
