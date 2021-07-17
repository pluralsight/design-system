import React from 'react'
import { format, endOfWeek, startOfWeek, add, sub, getMonth } from 'date-fns'
import { useDebounceCallback } from '@pluralsight/ps-design-system-util'

interface UseKeyEvents {
  selected: Date
  months: number[]
  handleForwardClick: React.MouseEventHandler<HTMLButtonElement>
  handleBackClick: React.MouseEventHandler<HTMLButtonElement>
}
export const useKeyEvents = ({
  selected,
  months,
  handleForwardClick,
  handleBackClick
}: UseKeyEvents) => {
  const [focusedDate, setFocusedDate] = React.useState<Date | undefined>(
    selected
  )
  const updateFocused = () => {
    focusedDate &&
      document
        .querySelector<HTMLButtonElement>(
          `[aria-label="${format(focusedDate, 'EEE LLL dd yyyy')}"]`
        )
        ?.focus()
  }

  const focusNext = useDebounceCallback(updateFocused, 100)

  React.useEffect(() => {
    focusNext()
  }, [focusedDate, focusNext])

  const dayKeyHandlers = (
    date: Date,
    dateProps: {
      [x: string]: any
    }
  ) => {
    const handleDayShift = (
      dir: 1 | -1,
      shift: 1 | 7,
      evt: React.KeyboardEvent<HTMLButtonElement>
    ) => {
      const nextDate =
        dir === 1
          ? add(date, {
              days: shift
            })
          : sub(date, {
              days: shift
            })
      setFocusedDate(nextDate)
      if (!months.includes(getMonth(nextDate))) {
        dir === 1
          ? handleForwardClick(
              evt as unknown as React.MouseEvent<HTMLButtonElement>
            )
          : handleBackClick(
              evt as unknown as React.MouseEvent<HTMLButtonElement>
            )
      }
    }
    const handleWeekEndStartFocus = (dir: 1 | -1) => {
      const nextDate = dir === -1 ? startOfWeek(date) : endOfWeek(date)
      setFocusedDate(nextDate)
    }
    const handleKeyDown: React.KeyboardEventHandler<HTMLButtonElement> =
      evt => {
        const key = evt.key.toLowerCase()
        ;[' ', 'enter'].includes(key) && dateProps.onClick(evt)(evt)
        key === 'arrowup' && handleDayShift(-1, 7, evt)
        key === 'arrowdown' && handleDayShift(1, 7, evt)
        key === 'arrowleft' && handleDayShift(-1, 1, evt)
        key === 'arrowright' && handleDayShift(1, 1, evt)
        key === 'home' && handleWeekEndStartFocus(-1)
        key === 'end' && handleWeekEndStartFocus(1)
      }
    return handleKeyDown
  }

  return dayKeyHandlers
}
