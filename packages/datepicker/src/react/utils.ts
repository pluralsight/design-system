/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
import { ValueOf } from '@pluralsight/ps-design-system-util'
import { differenceInCalendarMonths, format, parse, isMatch } from 'date-fns'
import type { DateObj } from 'dayzed'
import glamorDefault, * as glamorExports from 'glamor'
import React from 'react'

import stylesheet from '../css/index'
import { slides } from '../vars/index'

const glamor = glamorDefault || glamorExports

const style = {
  start: () => glamor.css(stylesheet['.psds-calendar__date--selected-start']),
  end: () => glamor.css(stylesheet['.psds-calendar__date--selected-end']),
  inRange: (arg?: boolean) =>
    glamor.css(arg && stylesheet['.psds-calendar__date--in-range'])
}

export const useIsInRange = (selected: Date[] = []) => {
  const [hoveredDate, setHoveredDate] = React.useState<Date | undefined>()
  // Calendar level
  const onMouseLeave = () => {
    setHoveredDate(undefined)
  }

  // Date level
  const onMouseEnter = (date: Date) => {
    if (!selected.length) {
      return
    }
    setHoveredDate(date)
  }

  const isInRange = (date: Date) => {
    if (selected.length) {
      const firstSelected = selected[0].getTime()
      if (selected.length === 2) {
        const secondSelected = selected[1].getTime()
        return {
          ...style.inRange(
            firstSelected < date.getTime() && secondSelected > date.getTime()
          ),
          ...(firstSelected === date.getTime() && style.start()),
          ...(secondSelected === date.getTime() && style.end())
        }
      } else {
        return {
          ...style.inRange(
            hoveredDate &&
              ((firstSelected < date.getTime() &&
                hoveredDate.getTime() >= date.getTime()) ||
                (date.getTime() < firstSelected &&
                  date.getTime() >= hoveredDate.getTime()))
          ),
          ...(firstSelected === date.getTime() && style.start())
        }
      }
    }
    return {}
  }
  return { onMouseLeave, onMouseEnter, isInRange }
}

interface OnMultipleDatesSelected {
  setSelected: (arr: Date[]) => void
  selected?: Date[]
  onSelect?: (evt: React.SyntheticEvent, selectedDate: DateObj) => void
}

export const onRangeDateSelected =
  ({ selected = [], setSelected, onSelect }: OnMultipleDatesSelected) =>
  (dateObj: DateObj, evt: React.SyntheticEvent) => {
    const { selectable, date } = dateObj
    if (!selectable) {
      return
    }
    const dateTime = date.getTime()
    const newDates = [...selected]
    if (selected.length) {
      if (selected.length === 1) {
        const firstTime = selected[0].getTime()
        if (firstTime < dateTime) {
          newDates.push(date)
        } else {
          newDates.unshift(date)
        }
        setSelected(newDates)
      } else if (newDates.length === 2) {
        setSelected([date])
      }
    } else {
      newDates.push(date)
      setSelected(newDates)
    }
    onSelect && onSelect(evt, dateObj)
  }

const getDateIndex = (
  selected: Date[],
  condition: (time: number) => boolean
) => {
  let index
  selected.some((date, i) => {
    index = i
    if (condition(date.getTime())) {
      return true
    }
    // If we loop through all the selected dates and still didn't find
    // one, make sure to add it to the end of the array.
    index++
    return false
  })
  return index as unknown as number
}

export const onMultiDateSelected =
  ({ selected = [], setSelected, onSelect }: OnMultipleDatesSelected) =>
  (dateObj: DateObj, evt: React.SyntheticEvent) => {
    const { selected: isSelected, selectable, date } = dateObj
    if (!selectable) {
      return
    }
    const newSelectedDates = selected.slice()
    const selectedTime = date.getTime()
    if (isSelected) {
      const index = getDateIndex(selected, time => selectedTime === time)
      newSelectedDates.splice(index, 1)
    } else {
      // Add
      const index = getDateIndex(selected, time => selectedTime < time)
      newSelectedDates.splice(index, 0, date)
    }
    setSelected(newSelectedDates)
    onSelect && onSelect(evt, dateObj)
  }

interface HandleChange<T> {
  selected?: T
  setSlide: React.Dispatch<React.SetStateAction<ValueOf<typeof slides>>>
  setSelected: React.Dispatch<React.SetStateAction<T | undefined>>
  dateFormat?: string
}

export const useDateSelectChange = ({
  selected,
  setSlide,
  setSelected,
  dateFormat = 'MM/dd/yyyy'
}: HandleChange<Date>): [
  string,
  (event: React.ChangeEvent<HTMLInputElement>) => void
] => {
  const [value, setValue] = React.useState<string>(
    selected ? format(selected, dateFormat) : ''
  )
  React.useEffect(() => {
    selected ? setValue(format(selected, dateFormat)) : ''
  }, [selected])
  const onChange: React.ChangeEventHandler<HTMLInputElement> = evt => {
    const nextValue = evt.target.value
    setValue(nextValue)
    let fulldate = false
    try {
      fulldate = isMatch(nextValue, dateFormat)
    } catch (err) {
      if (!(err instanceof RangeError)) {
        throw err
      }
    }
    const nextSelected = fulldate
      ? parse(nextValue, dateFormat, new Date())
      : selected

    if (
      nextSelected instanceof Date &&
      !isNaN(nextSelected as unknown as number)
    ) {
      let nextSlide: ValueOf<typeof slides>
      if (selected) {
        nextSlide =
          differenceInCalendarMonths(nextSelected, selected) > 0
            ? 'forward'
            : differenceInCalendarMonths(nextSelected, selected) < 0
            ? 'backward'
            : undefined
      }
      setSelected(nextSelected)
      setSlide(nextSlide)
    }
  }
  return [value, onChange]
}
interface HandleRangeChange extends HandleChange<Date[]> {
  start: boolean
}

export const useRangeSelectChange = ({
  start,
  selected = [],
  setSlide,
  setSelected,
  dateFormat = 'MM/dd/yyyy'
}: HandleRangeChange): [
  string,
  (event: React.ChangeEvent<HTMLInputElement>) => void
] => {
  const _selected = start ? selected[0] : selected[1]
  const [value, setValue] = React.useState<string>(
    _selected ? format(_selected, dateFormat) : ''
  )
  React.useEffect(() => {
    _selected ? setValue(format(_selected, dateFormat)) : ''
  }, [_selected])
  const onChange: React.ChangeEventHandler<HTMLInputElement> = evt => {
    const nextValue = evt.target.value
    setValue(nextValue)
    let fulldate = false
    try {
      fulldate = isMatch(nextValue, dateFormat)
    } catch (err) {
      if (!(err instanceof RangeError)) {
        throw err
      }
    }
    const nextSelected = fulldate
      ? parse(nextValue, dateFormat, new Date())
      : selected

    if (
      nextSelected instanceof Date &&
      !isNaN(nextSelected as unknown as number)
    ) {
      let nextSlide: ValueOf<typeof slides>
      if (selected) {
        !selected[0] && setSelected([])
        start && setSelected([nextSelected, selected[1]].filter(Boolean))
        selected[0] && !start && setSelected([selected[0], nextSelected])
        nextSlide =
          differenceInCalendarMonths(nextSelected, _selected) > 0
            ? slides.forward
            : differenceInCalendarMonths(nextSelected, _selected) < 0
            ? slides.backward
            : slides.undefined
      }
      setSlide(nextSlide)
    }
  }
  return [value, onChange]
}
