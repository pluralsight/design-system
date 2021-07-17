/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
import Button from '@pluralsight/ps-design-system-button'
import {
  CaretLeftIcon,
  CaretRightIcon
} from '@pluralsight/ps-design-system-icon'
import {
  RefFor,
  ValueOf,
  uniqueId as defaultUniqueId
} from '@pluralsight/ps-design-system-util'
import Theme from '@pluralsight/ps-design-system-theme'
import type { RenderProps } from 'dayzed'
import glamorDefault, * as glamorExports from 'glamor'
import React from 'react'

import { DateContext } from './context'
import stylesheet from '../css/index'
import { slides } from '../vars/index'
import { useKeyEvents } from './use-key-events'

const glamor = glamorDefault || glamorExports

const forward = glamor.keyframes(
  stylesheet['@keyframes psds-calendar__keyframes__forward']
)
const backward = glamor.keyframes(
  stylesheet['@keyframes psds-calendar__keyframes__backward']
)

const styles = {
  calendar: () => glamor.css(stylesheet['.psds-calendar']),
  headerWrapper: () => glamor.css(stylesheet[`.psds-calendar__header-wrapper`]),
  gridWrapper: () => glamor.css(stylesheet[`.psds-calendar__grid-wrapper`]),
  gridSlide: (slide?: ValueOf<typeof slides>) =>
    glamor.css(
      stylesheet[`.psds-calendar__grid-slide`],
      slide === 'forward' &&
        stylesheet[`.psds-calendar__grid-slide--forward`](forward),
      slide === 'backward' &&
        stylesheet[`.psds-calendar__grid-slide--backward`](backward)
    ),
  month: () => glamor.css(stylesheet['.psds-calendar__month']),
  header: () => glamor.css(stylesheet['.psds-calendar__header']),
  headerButton: () => glamor.css(stylesheet['.psds-calendar__header-button']),
  headerMonth: () => glamor.css(stylesheet['.psds-calendar__header-month']),
  weekdayHeader: () => glamor.css(stylesheet['.psds-calendar__weekday-header']),
  dateFiller: () => glamor.css(stylesheet['.psds-calendar__filler']),
  dateGrid: () => glamor.css(stylesheet['.psds-calendar__date-grid'])
}

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
  uniqueId?: (prefix: string) => string
  selected?: Date
}

export const Calendar = React.forwardRef<HTMLDivElement, CalendarProps>(
  (
    {
      calendars,
      getBackProps,
      getForwardProps,
      children,
      slide,
      uniqueId = defaultUniqueId,
      selected = new Date(),
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
    const gridLabels = calendars.map((calendar, i) =>
      uniqueId(`${calendar.month}_${calendar.year}`)
    )
    const months = calendars?.map(calendar => calendar.month)
    const dayKeyHandlers = useKeyEvents({
      selected,
      months,
      handleForwardClick,
      handleBackClick
    })
    if (calendars.length) {
      return (
        <div {...styles.calendar()} {...rest} ref={ref}>
          <div {...styles.headerWrapper()}>
            {calendars.map((calendar, i) => (
              <div
                key={`${calendar.month}${calendar.year}`}
                {...styles.header()}
              >
                <Theme name={Theme.names.light}>
                  <div {...styles.month()}>
                    {i === 0 ? (
                      <Button
                        {...backRest}
                        {...styles.headerButton()}
                        onClick={handleBackClick}
                        icon={<CaretLeftIcon />}
                        appearance={Button.appearances.flat}
                      />
                    ) : (
                      <div {...styles.headerButton()} />
                    )}
                    <h2
                      key={`${calendar.month}${calendar.year}`}
                      aria-live="polite"
                      id={gridLabels[i]}
                      {...styles.headerMonth()}
                    >
                      {monthNamesShort[calendar.month]} {calendar.year}
                    </h2>
                    {calendars.length - 1 === i ? (
                      <Button
                        {...forwardRest}
                        {...styles.headerButton()}
                        onClick={handleForwardClick}
                        icon={<CaretRightIcon />}
                        appearance={Button.appearances.flat}
                      />
                    ) : (
                      <div {...styles.headerButton()} />
                    )}
                  </div>
                </Theme>
                {weekdayNamesShort.map(weekday => (
                  <div
                    key={`${calendar.month}${calendar.year}${weekday}`}
                    {...styles.weekdayHeader()}
                  >
                    {weekday}
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div style={{ height }} {...styles.gridWrapper()}>
            <div
              {...styles.gridSlide(_slide)}
              ref={animationRef as RefFor<'div'>}
            >
              {calendars.map((calendar, i) => (
                <div
                  {...styles.dateGrid()}
                  key={`${calendar.month}${calendar.year}`}
                >
                  <DateContext.Provider
                    value={{
                      ...calendar,
                      'aria-labelledby': gridLabels[i],
                      dayKeyHandlers
                    }}
                  >
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
