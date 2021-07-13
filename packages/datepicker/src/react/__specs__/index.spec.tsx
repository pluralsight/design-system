/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
import { convertStoriesToJestCases } from '@pluralsight/ps-design-system-util'
import { render } from '@testing-library/react'
import { renderHook, act } from '@testing-library/react-hooks'
import formatISO from 'date-fns/formatISO'
import { DateObj, useDayzed } from 'dayzed'
import { axe } from 'jest-axe'
import React from 'react'

import {
  Calendar,
  CalendarDates,
  useIsInRange,
  onRangeDateSelected,
  onMultiDateSelected,
  useDateSelectChange,
  useRangeSelectChange
} from '..'
import * as stories from '../__stories__/index.story'

it('Calendar: composes className', () => {
  const Test = () => {
    const { getDateProps, ...dayzedData } = useDayzed({
      date: new Date('05/30/2020'),
      selected: new Date('05/13/2020'),
      onDateSelected: (dateObj: DateObj, evt: React.SyntheticEvent) => {}
    })

    return (
      <Calendar {...dayzedData} className="compose-classname">
        <CalendarDates getDateProps={getDateProps}>
          {renderProps => <button {...renderProps} />}
        </CalendarDates>
      </Calendar>
    )
  }

  const { container } = render(<Test />)

  expect(container.firstChild).toHaveClass('psds-calendar compose-classname')
})

it('CalendarDates: composes className', () => {
  const Test = () => {
    const { getDateProps, ...dayzedData } = useDayzed({
      date: new Date('05/30/2020'),
      selected: new Date('05/13/2020'),
      onDateSelected: (dateObj: DateObj, evt: React.SyntheticEvent) => {}
    })

    return (
      <Calendar {...dayzedData}>
        <CalendarDates
          getDateProps={getDateProps}
          className="compose-classname"
        >
          {renderProps => <button {...renderProps} />}
        </CalendarDates>
      </Calendar>
    )
  }

  const { container } = render(<Test />)

  expect(container.querySelector('.psds-calendar__filler')).toHaveClass(
    'compose-classname'
  )
  expect(container.querySelector('.psds-calendar__date')).toHaveClass(
    'compose-classname'
  )
})

test('useIsInRange: none selected', () => {
  const { result } = renderHook(() => useIsInRange([]))
  expect(result.current.isInRange(new Date('06/01/2020'))).toEqual('')
})

test('useIsInRange: start date selected', () => {
  const selected = [new Date('06/01/2020')]
  const { result } = renderHook(() => useIsInRange(selected))
  act(() => {
    result.current.onMouseEnter(new Date('06/10/2020'))
  })
  expect(result.current.isInRange(new Date('06/01/2020'))).toMatchSnapshot(
    'start date'
  )
  expect(result.current.isInRange(new Date('06/06/2020'))).toMatchSnapshot(
    'in range'
  )
  expect(result.current.isInRange(new Date('06/15/2020'))).toMatchSnapshot(
    'out of range'
  )
})

test('useIsInRange: start date and end date selected', () => {
  const selected = [new Date('06/01/2020'), new Date('06/10/2020')]
  const { result } = renderHook(() => useIsInRange(selected))
  expect(result.current.isInRange(new Date('06/01/2020'))).toMatchSnapshot(
    'start date'
  )
  expect(result.current.isInRange(new Date('06/06/2020'))).toMatchSnapshot(
    'in range'
  )
  expect(result.current.isInRange(new Date('06/15/2020'))).toMatchSnapshot(
    'out of range'
  )
})

test('onRangeDateSelected: onSelect', () => {
  const onSelect = jest.fn()
  const { result } = renderHook(() => React.useState<Date[] | undefined>())
  act(() => {
    const selectedDate = new Date('06/20/2020')
    onRangeDateSelected({
      selected: result.current[0],
      setSelected: result.current[1],
      onSelect
    })(
      {
        date: selectedDate,
        nextMonth: false,
        prevMonth: false,
        selectable: false,
        selected: true,
        today: false
      },
      {} as React.SyntheticEvent
    )
  })
  expect(onSelect).not.toHaveBeenCalled()
  const dateObj = {
    date: new Date('06/20/2020'),
    nextMonth: false,
    prevMonth: false,
    selectable: true,
    selected: true,
    today: false
  }
  act(() => {
    onRangeDateSelected({
      selected: result.current[0],
      setSelected: result.current[1],
      onSelect
    })(dateObj, {} as React.SyntheticEvent)
  })
  expect(onSelect).toHaveBeenCalledWith({}, dateObj)
})

test('onRangeDateSelected: selectable true', () => {
  const { result } = renderHook(() => React.useState<Date[] | undefined>())
  const selectedDate = new Date('06/20/2020')
  const dateObj = {
    date: selectedDate,
    nextMonth: false,
    prevMonth: false,
    selectable: true,
    selected: true,
    today: false
  }
  act(() => {
    onRangeDateSelected({
      selected: result.current[0],
      setSelected: result.current[1]
    })(dateObj, {} as React.SyntheticEvent)
  })
  expect(result.current[0]).toStrictEqual([selectedDate])
})

test('onRangeDateSelected: start date selects end date', () => {
  const startDate = new Date('06/10/2020')
  const { result } = renderHook(() =>
    React.useState<Date[] | undefined>([startDate])
  )
  const selectedDate = new Date('06/20/2020')
  const dateObj = {
    date: selectedDate,
    nextMonth: false,
    prevMonth: false,
    selectable: true,
    selected: true,
    today: false
  }
  act(() => {
    onRangeDateSelected({
      selected: result.current[0],
      setSelected: result.current[1]
    })(dateObj, {} as React.SyntheticEvent)
  })
  expect(result.current[0]).toStrictEqual([startDate, selectedDate])
})

test('onRangeDateSelected: end date selects start date', () => {
  const initialDates = [new Date('06/10/2020'), new Date('06/20/2020')]
  const { result } = renderHook(() =>
    React.useState<Date[] | undefined>(initialDates)
  )
  const selectedDate = new Date('06/30/2020')
  const dateObj = {
    date: selectedDate,
    nextMonth: false,
    prevMonth: false,
    selectable: true,
    selected: true,
    today: false
  }
  act(() => {
    onRangeDateSelected({
      selected: result.current[0],
      setSelected: result.current[1]
    })(dateObj, {} as React.SyntheticEvent)
  })
  expect(result.current[0]).toStrictEqual([selectedDate])
})

test('onMultiDateSelected: onSelect', () => {
  const onSelect = jest.fn()
  const { result } = renderHook(() => React.useState<Date[] | undefined>())
  act(() => {
    const selectedDate = new Date('06/20/2020')
    onMultiDateSelected({
      selected: result.current[0],
      setSelected: result.current[1],
      onSelect
    })(
      {
        date: selectedDate,
        nextMonth: false,
        prevMonth: false,
        selectable: false,
        selected: true,
        today: false
      },
      {} as React.SyntheticEvent
    )
  })
  expect(onSelect).not.toHaveBeenCalled()
  const dateObj = {
    date: new Date('06/20/2020'),
    nextMonth: false,
    prevMonth: false,
    selectable: true,
    selected: true,
    today: false
  }
  act(() => {
    onMultiDateSelected({
      selected: result.current[0],
      setSelected: result.current[1],
      onSelect
    })(dateObj, {} as React.SyntheticEvent)
  })
  expect(onSelect).toHaveBeenCalledWith({}, dateObj)
})

test('onMultiDateSelected: selectable (toggle test)', () => {
  const selectedDate = new Date('06/20/2020')
  const { result } = renderHook(() => React.useState<Date[] | undefined>())
  const dateObj = {
    date: selectedDate,
    nextMonth: false,
    prevMonth: false,
    selectable: true,
    selected: false,
    today: false
  }
  act(() => {
    onMultiDateSelected({
      selected: result.current[0],
      setSelected: result.current[1]
    })(dateObj, {} as React.SyntheticEvent)
  })
  expect(result.current[0]).toStrictEqual([selectedDate])
  act(() => {
    onMultiDateSelected({
      selected: result.current[0],
      setSelected: result.current[1]
    })({ ...dateObj, selected: true }, {} as React.SyntheticEvent)
  })
  expect(result.current[0]).toStrictEqual([])
})

test('useDateSelectChange', () => {
  const { result } = renderHook(() => {
    const [selected, setSelected] = React.useState<Date | undefined>()
    const [slide, setSlide] = React.useState<
      'forward' | 'backward' | undefined
    >()
    const [value, onChange] = useDateSelectChange({
      setSelected,
      selected,
      setSlide
    })
    return { selected, slide, value, onChange }
  })
  expect(result.current.value).toBe('')
  expect(result.current.selected).toBe(undefined)
  expect(result.current.slide).toBe(undefined)
  act(() => {
    result.current.onChange({
      target: { value: '1/10' }
    } as React.ChangeEvent<HTMLInputElement>)
  })
  expect(result.current.value).toBe('1/10')
  expect(result.current.selected).toBe(undefined)
  expect(result.current.slide).toBe(undefined)
  act(() => {
    result.current.onChange({
      target: { value: '01/10/2020' }
    } as React.ChangeEvent<HTMLInputElement>)
  })
  expect(result.current.value).toBe('01/10/2020')
  expect(formatISO(result.current.selected!)).toBe(
    formatISO(new Date('01/10/2020'))
  )
  expect(result.current.slide).toBe(undefined)
  act(() => {
    result.current.onChange({
      target: { value: '08/10/2020' }
    } as React.ChangeEvent<HTMLInputElement>)
  })
  expect(result.current.value).toBe('08/10/2020')
  expect(formatISO(result.current.selected!)).toBe(
    formatISO(new Date('08/10/2020'))
  )
  expect(result.current.slide).toBe('forward')
  act(() => {
    result.current.onChange({
      target: { value: '03/10/2020' }
    } as React.ChangeEvent<HTMLInputElement>)
  })
  expect(result.current.value).toBe('03/10/2020')
  expect(formatISO(result.current.selected!)).toBe(
    formatISO(new Date('03/10/2020'))
  )
  expect(result.current.slide).toBe('backward')
  act(() => {
    result.current.onChange({
      target: { value: '13/10/2020' }
    } as React.ChangeEvent<HTMLInputElement>)
  })
  expect(result.current.value).toBe('13/10/2020')
  expect(formatISO(result.current.selected!)).toBe(
    formatISO(new Date('03/10/2020'))
  )
  expect(result.current.slide).toBeUndefined()
  act(() => {
    result.current.onChange({
      target: { value: '03/11/2020' }
    } as React.ChangeEvent<HTMLInputElement>)
  })
  expect(result.current.value).toBe('03/11/2020')
  expect(formatISO(result.current.selected!)).toBe(
    formatISO(new Date('03/11/2020'))
  )
  expect(result.current.slide).toBe(undefined)
})

test('useDateSelectChange: custom date format', () => {
  const { result } = renderHook(() => {
    const [selected, setSelected] = React.useState<Date | undefined>()
    const [slide, setSlide] = React.useState<
      'forward' | 'backward' | undefined
    >()
    const dateFormat = 'yyyy-MM-dd'
    const [value, onChange] = useDateSelectChange({
      setSelected,
      selected,
      setSlide,
      dateFormat
    })
    return { selected, slide, value, onChange }
  })
  act(() => {
    result.current.onChange({
      target: { value: '01/10/2020' }
    } as React.ChangeEvent<HTMLInputElement>)
  })
  expect(result.current.value).toBe('01/10/2020')
  expect(result.current.selected).toBe(undefined)
  act(() => {
    result.current.onChange({
      target: { value: '2020-01-10' }
    } as React.ChangeEvent<HTMLInputElement>)
  })
  expect(result.current.value).toBe('2020-01-10')
  expect(formatISO(result.current.selected!)).toBe(
    formatISO(new Date('01/10/2020'))
  )
})

test('useRangeSelectChange', () => {
  const { result } = renderHook(() => {
    const [selected, setSelected] = React.useState<Date[] | undefined>()
    const [slide, setSlide] = React.useState<
      'forward' | 'backward' | undefined
    >()
    const [startValue, onStartChange] = useRangeSelectChange({
      start: true,
      setSelected,
      selected,
      setSlide
    })
    const [endValue, onEndChange] = useRangeSelectChange({
      start: false,
      setSelected,
      selected,
      setSlide
    })
    return {
      selected,
      slide,
      startValue,
      onStartChange,
      endValue,
      onEndChange
    }
  })
  expect(result.current.startValue).toBe('')
  expect(result.current.endValue).toBe('')
  expect(result.current.selected).toBe(undefined)
  expect(result.current.slide).toBe(undefined)
  act(() => {
    result.current.onEndChange({
      target: { value: '03/11' }
    } as React.ChangeEvent<HTMLInputElement>)
  })
  expect(result.current.startValue).toBe('')
  expect(result.current.endValue).toBe('03/11')
  expect(result.current.selected).toBe(undefined)
  expect(result.current.slide).toBe(undefined)
  act(() => {
    result.current.onStartChange({
      target: { value: '03/01' }
    } as React.ChangeEvent<HTMLInputElement>)
  })
  expect(result.current.startValue).toBe('03/01')
  expect(result.current.endValue).toBe('03/11')
  expect(result.current.selected).toBe(undefined)
  expect(result.current.slide).toBe(undefined)
  act(() => {
    result.current.onStartChange({
      target: { value: '03/01' }
    } as React.ChangeEvent<HTMLInputElement>)
  })
  act(() => {
    result.current.onEndChange({
      target: { value: '03/11/2021' }
    } as React.ChangeEvent<HTMLInputElement>)
  })
  expect(result.current.startValue).toBe('03/01')
  expect(result.current.endValue).toBe('03/11/2021')
  expect(result.current.selected).toStrictEqual([])
  expect(result.current.slide).toBe(undefined)
  act(() => {
    result.current.onStartChange({
      target: { value: '03/01/2020' }
    } as React.ChangeEvent<HTMLInputElement>)
  })
  act(() => {
    result.current.onEndChange({
      target: { value: '03/11' }
    } as React.ChangeEvent<HTMLInputElement>)
  })
  expect(result.current.selected!.map(date => formatISO(date))).toMatchObject(
    [new Date('03/01/2020')].map(date => formatISO(date))
  )
  expect(result.current.startValue).toBe('03/01/2020')
  expect(result.current.endValue).toBe('03/11')
  expect(result.current.slide).toBe(undefined)
  act(() => {
    result.current.onEndChange({
      target: { value: '03/11/2020' }
    } as React.ChangeEvent<HTMLInputElement>)
  })
  expect(result.current.selected!.map(date => formatISO(date))).toMatchObject(
    [new Date('03/01/2020'), new Date('03/11/2020')].map(date =>
      formatISO(date)
    )
  )
  expect(result.current.startValue).toBe('03/01/2020')
  expect(result.current.endValue).toBe('03/11/2020')
  expect(result.current.slide).toBe(undefined)
  act(() => {
    result.current.onStartChange({
      target: { value: '03/05/2020' }
    } as React.ChangeEvent<HTMLInputElement>)
  })
  act(() => {
    result.current.onEndChange({
      target: { value: '03/21/2020' }
    } as React.ChangeEvent<HTMLInputElement>)
  })
  expect(result.current.selected!.map(date => formatISO(date))).toMatchObject(
    [new Date('03/05/2020'), new Date('03/21/2020')].map(date =>
      formatISO(date)
    )
  )
  expect(result.current.startValue).toBe('03/05/2020')
  expect(result.current.endValue).toBe('03/21/2020')
  expect(result.current.slide).toBe(undefined)
  act(() => {
    result.current.onEndChange({
      target: { value: '05/21/2020' }
    } as React.ChangeEvent<HTMLInputElement>)
  })
  expect(result.current.selected!.map(date => formatISO(date))).toMatchObject(
    [new Date('03/05/2020'), new Date('05/21/2020')].map(date =>
      formatISO(date)
    )
  )
  expect(result.current.startValue).toBe('03/05/2020')
  expect(result.current.endValue).toBe('05/21/2020')
  expect(result.current.slide).toBe('forward')
  act(() => {
    result.current.onStartChange({
      target: { value: '02/05/2020' }
    } as React.ChangeEvent<HTMLInputElement>)
  })
  expect(result.current.selected!.map(date => formatISO(date))).toMatchObject(
    [new Date('02/05/2020'), new Date('05/21/2020')].map(date =>
      formatISO(date)
    )
  )
  expect(result.current.startValue).toBe('02/05/2020')
  expect(result.current.endValue).toBe('05/21/2020')
  expect(result.current.slide).toBe('backward')
})

describe('accessibility', () => {
  const cases = convertStoriesToJestCases(stories)
  describe.each(cases)('%s story', (_name, Story) => {
    it('has no axe-core violations', async () => {
      const { container } = render(<Story {...Story.args} />)
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })
})

test('useRangeSelectChange: custom date format', () => {
  const { result } = renderHook(() => {
    const [selected, setSelected] = React.useState<Date[] | undefined>()
    const [slide, setSlide] = React.useState<
      'forward' | 'backward' | undefined
    >()
    const dateFormat = 'yyyy-MM-dd'
    const [startValue, onStartChange] = useRangeSelectChange({
      start: true,
      setSelected,
      selected,
      setSlide,
      dateFormat
    })
    const [endValue, onEndChange] = useRangeSelectChange({
      start: false,
      setSelected,
      selected,
      setSlide,
      dateFormat
    })
    return {
      selected,
      slide,
      startValue,
      onStartChange,
      endValue,
      onEndChange
    }
  })
  act(() => {
    result.current.onStartChange({
      target: { value: '03/01/2021' }
    } as React.ChangeEvent<HTMLInputElement>)
  })
  act(() => {
    result.current.onEndChange({
      target: { value: '03/11/2021' }
    } as React.ChangeEvent<HTMLInputElement>)
  })
  expect(result.current.startValue).toBe('03/01/2021')
  expect(result.current.endValue).toBe('03/11/2021')
  expect(result.current.selected).toStrictEqual(undefined)
  expect(result.current.slide).toBe(undefined)
  act(() => {
    result.current.onStartChange({
      target: { value: '2021-03-01' }
    } as React.ChangeEvent<HTMLInputElement>)
  })
  act(() => {
    result.current.onEndChange({
      target: { value: '2021-03-11' }
    } as React.ChangeEvent<HTMLInputElement>)
  })
  expect(result.current.startValue).toBe('2021-03-01')
  expect(result.current.endValue).toBe('2021-03-11')
  expect(result.current.selected!.map(date => formatISO(date))).toMatchObject([
    formatISO(new Date('03/01/2021')),
    formatISO(new Date('03/11/2021'))
  ])
})
