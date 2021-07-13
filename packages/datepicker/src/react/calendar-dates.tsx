import { classNames } from '@pluralsight/ps-design-system-util'
import type { DateObj, RenderProps } from 'dayzed'
import React from 'react'

import '../css/index.css'
import { DateContext } from './context'

interface ChildrenRenderProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {}

interface CalendarDatesProps
  extends React.HTMLAttributes<HTMLButtonElement>,
    Pick<RenderProps, 'getDateProps'> {
  children: (props: ChildrenRenderProps, dateObj: DateObj) => React.ReactNode
}

export const CalendarDates: React.FC<CalendarDatesProps> = ({
  getDateProps,
  children,
  className,
  ...rest
}) => {
  const calendar = React.useContext(DateContext)
  return (
    <>
      {calendar.weeks.map((week, weekIndex) => {
        return week.map((dateObj, index) => {
          const key = `${calendar.month}${calendar.year}${weekIndex}${index}`
          if (!dateObj) {
            return (
              <div
                key={key}
                className={classNames('psds-calendar__filler', className)}
              />
            )
          }
          const { date, selected, selectable, today } = dateObj
          return children(
            {
              key,
              children: date.getDate(),
              disabled: !selectable,
              ...getDateProps({ dateObj }),
              ...rest,
              className: classNames(
                'psds-calendar__date',
                selected && 'psds-calendar__date--selected',
                today && 'psds-calendar__date--today',
                className
              )
            },
            dateObj
          )
        })
      })}
    </>
  )
}
