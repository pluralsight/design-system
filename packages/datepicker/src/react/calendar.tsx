/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
import Button from '@pluralsight/ps-design-system-button'
import {
  CaretLeftIcon,
  CaretRightIcon
} from '@pluralsight/ps-design-system-icon'
import { RefFor, ValueOf, classNames } from '@pluralsight/ps-design-system-util'
import Theme from '@pluralsight/ps-design-system-theme'
import type { RenderProps } from 'dayzed'
import React from 'react'

import '../css/index.css'
import { DateContext } from './context'
import { slides } from '../vars/index'

const monthNamesShort = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
]
const weekdayNamesShort = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

interface CalendarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    Pick<RenderProps, 'calendars' | 'getBackProps' | 'getForwardProps'> {
  slide?: ValueOf<typeof slides>
}

export const Calendar = React.forwardRef<HTMLDivElement, CalendarProps>(
  (
    {
      calendars,
      className,
      getBackProps,
      getForwardProps,
      children,
      slide,
      ...rest
    },
    ref
  ) => {
    const [_slide, setSlide] = React.useState<ValueOf<typeof slides>>(slide)
    const [height, setHeight] = React.useState<number | undefined>()
    const { onClick: onBackClick, ...backRest } = getBackProps({ calendars })
    const { onClick: onForwardClick, ...forwardRest } = getForwardProps({
      calendars
    })
    const handleForwardClick = (e: React.MouseEvent) => {
      onForwardClick(e)
      setSlide(slides.forward)
    }
    const handleBackClick = (e: React.MouseEvent) => {
      onBackClick(e)
      setSlide(slides.backward)
    }
    const animationRef = React.useRef<HTMLDivElement>()
    React.useEffect(() => {
      const el = animationRef.current
      if (el) {
        const { height } = el.getBoundingClientRect()
        setHeight(height)
      }
    }, [_slide, slide])
    React.useEffect(() => {
      const el = animationRef.current
      if (el) {
        const { height } = el.getBoundingClientRect()
        setHeight(height)
        const updateOffset = () => setSlide(undefined)
        el.addEventListener('animationend', updateOffset)
        return () => el.removeEventListener('animationend', updateOffset)
      }
    }, [])
    if (calendars.length) {
      return (
        <div
          {...rest}
          className={classNames('psds-calendar', className)}
          ref={ref}
        >
          <div className="psds-calendar__header-wrapper">
            {calendars.map((calendar, i) => (
              <div
                key={`${calendar.month}${calendar.year}`}
                className="psds-calendar__header"
              >
                <Theme name={Theme.names.light}>
                  <div className="psds-calendar__month">
                    {i === 0 ? (
                      <Button
                        {...backRest}
                        className="psds-calendar__header-button"
                        onClick={handleBackClick}
                        icon={<CaretLeftIcon />}
                        appearance={Button.appearances.flat}
                      />
                    ) : (
                      <div className="psds-calendar__header-button" />
                    )}
                    <div
                      key={`${calendar.month}${calendar.year}`}
                      className="psds-calendar__header-month"
                    >
                      {monthNamesShort[calendar.month]} {calendar.year}
                    </div>
                    {calendars.length - 1 === i ? (
                      <Button
                        {...forwardRest}
                        className="psds-calendar__header-button"
                        onClick={handleForwardClick}
                        icon={<CaretRightIcon />}
                        appearance={Button.appearances.flat}
                      />
                    ) : (
                      <div className="psds-calendar__header-button" />
                    )}
                  </div>
                </Theme>
                {weekdayNamesShort.map(weekday => (
                  <div
                    key={`${calendar.month}${calendar.year}${weekday}`}
                    className="psds-calendar__weekday-header"
                  >
                    {weekday}
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div style={{ height }} className="psds-calendar__date-grid">
            <div
              className={classNames(
                'psds-calendar__grid-slide',
                _slide === 'forward' && 'psds-calendar__grid-slide--forward',
                _slide === 'backward' && 'psds-calendar__grid-slide--backward'
              )}
              ref={animationRef as RefFor<'div'>}
            >
              {calendars.map((calendar, i) => (
                <div
                  className="psds-calendar__date-grid"
                  key={`${calendar.month}${calendar.year}`}
                >
                  <DateContext.Provider value={calendar}>
                    {children}
                  </DateContext.Provider>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    }
    return null
  }
)
