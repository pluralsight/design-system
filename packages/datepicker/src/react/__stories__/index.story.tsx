import Field from '@pluralsight/ps-design-system-field'
import { HomeIcon, CalendarIcon } from '@pluralsight/ps-design-system-icon'
import TextInput from '@pluralsight/ps-design-system-textinput'
import { ValueOf, classNames } from '@pluralsight/ps-design-system-util'
import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'
import { DateObj, useDayzed } from 'dayzed'

import {
  Calendar,
  CalendarDates,
  DatePicker,
  useIsInRange,
  onRangeDateSelected,
  onMultiDateSelected,
  useDateSelectChange,
  useRangeSelectChange
} from '../index'
import { slides } from '../../vars/index'

export default {
  title: 'Components/DatePicker',
  component: DatePicker
} as Meta

export const SingleDateSelectedDate: Story = () => {
  const [selected, setSelected] = React.useState<Date | undefined>(
    new Date('05/13/2020')
  )
  const onDateSelected = (dateObj: DateObj, evt: React.SyntheticEvent) => {
    setSelected(dateObj.date)
  }
  const { getDateProps, ...dayzedData } = useDayzed({
    date: selected || new Date('05/30/2020'),
    selected,
    onDateSelected
  })
  return (
    <Calendar {...dayzedData}>
      <CalendarDates getDateProps={getDateProps}>
        {renderProps => <button {...renderProps} />}
      </CalendarDates>
    </Calendar>
  )
}

export const SingleDatePreviousMonth: Story = () => {
  const [selected, setSelected] = React.useState<Date | undefined>(
    new Date('05/13/2020')
  )
  const onDateSelected = (dateObj: DateObj, evt: React.SyntheticEvent) => {
    setSelected(dateObj.date)
  }
  const { getDateProps, ...dayzedData } = useDayzed({
    date: new Date('04/10/2020'),
    selected,
    onDateSelected
  })
  return (
    <Calendar {...dayzedData}>
      <CalendarDates getDateProps={getDateProps}>
        {renderProps => {
          return <button {...renderProps} />
        }}
      </CalendarDates>
    </Calendar>
  )
}

export const CalendarSelectWithButton: Story = () => {
  const [selected, setSelected] = React.useState<Date | undefined>()
  const onDateSelected = (dateObj: DateObj, evt: React.SyntheticEvent) => {
    setSelected(dateObj.date)
  }
  const { getDateProps, ...dayzedData } = useDayzed({
    date: selected || new Date('05/30/2020'),
    selected,
    onDateSelected
  })

  const handleClick = () => {
    setSelected(new Date('05/13/2020'))
  }
  return (
    <>
      <button onClick={handleClick}>5/13/2020</button>
      <Calendar {...dayzedData}>
        <CalendarDates getDateProps={getDateProps}>
          {renderProps => {
            return <button {...renderProps} />
          }}
        </CalendarDates>
      </Calendar>
    </>
  )
}

export const CalendarWithInput: Story = () => {
  const [selected, setSelected] = React.useState<Date | undefined>()
  const [open, setOpen] = React.useState<boolean>(false)
  const onDateSelected = (dateObj: DateObj, evt: React.SyntheticEvent) => {
    setSelected(dateObj.date)
    setOpen(false)
  }
  const { getDateProps, ...dayzedData } = useDayzed({
    date: selected || new Date('05/30/2020'),
    selected,
    onDateSelected
  })
  const handleIconClick: React.MouseEventHandler<HTMLDivElement> = evt => {
    setOpen(!open)
  }
  const [slide, setSlide] = React.useState<ValueOf<typeof slides>>()
  const [value, onChange] = useDateSelectChange({
    selected,
    setSlide,
    setSelected
  })
  return (
    <div style={{ display: 'inline-block', position: 'relative' }}>
      <TextInput
        onChange={onChange}
        value={value}
        placeholder="mm/dd/yyyy"
        icon={
          <CalendarIcon
            onClick={handleIconClick}
            style={{ cursor: 'pointer' }}
          />
        }
      />
      <br />
      {open && (
        <Calendar
          {...dayzedData}
          style={{ position: 'absolute', marginTop: 4 }}
          slide={slide}
          tabIndex={0}
        >
          <CalendarDates getDateProps={getDateProps}>
            {renderProps => {
              return <button {...renderProps} />
            }}
          </CalendarDates>
        </Calendar>
      )}
    </div>
  )
}

const stableUniqueId = (prefix: string) => prefix + 'unique-id'

export const DatePickerDisabled: Story = () => (
  <DatePicker disabled label="Disabled" _uniqueId={stableUniqueId} />
)

export const DatePickerError: Story = () => (
  <DatePicker error label="Errored" _uniqueId={stableUniqueId} />
)

export const DatePickerStringLabel: Story = () => (
  <DatePicker label="String label" _uniqueId={stableUniqueId} />
)

export const DatePickerFieldLabel: Story = () => (
  <DatePicker
    label={<Field.Label>Field.Label label</Field.Label>}
    _uniqueId={stableUniqueId}
  />
)

export const DatePickerPrefix: Story = () => (
  <DatePicker prefix={<HomeIcon />} label="Prefix" _uniqueId={stableUniqueId} />
)

export const DatePickerRenderContainer: Story = () => (
  <DatePicker
    label="renderContainer"
    renderContainer={React.forwardRef((props, ref) => (
      <div ref={ref} {...props} style={{ outline: '2px dashed orange' }} />
    ))}
    _uniqueId={stableUniqueId}
  />
)

export const DatePickerRenderTag: Story = () => (
  <DatePicker
    prefix={<HomeIcon />}
    label="renderTag"
    renderTag={props => (
      <div {...props} style={{ outline: '2px dashed orange' }} />
    )}
    _uniqueId={stableUniqueId}
  />
)

export const DatePickerSmallSize: Story = () => (
  <DatePicker label="Small size" size="small" _uniqueId={stableUniqueId} />
)

export const DatePickerSubLabelString: Story = () => (
  <DatePicker subLabel="String subLabel" _uniqueId={stableUniqueId} />
)

export const DatePickerSubLabelField: Story = () => (
  <DatePicker
    subLabel={<Field.SubLabel>Field.SubLabel subLabel</Field.SubLabel>}
    _uniqueId={stableUniqueId}
  />
)

export const DatePickerSuffix: Story = () => (
  <DatePicker suffix={<HomeIcon />} label="Suffix" _uniqueId={stableUniqueId} />
)

export const DatePickerInitialValue: Story = () => {
  const value = new Date(1999, 11, 31)
  return (
    <DatePicker
      label="Controlled component, set to 31 Dec 1999"
      value={value}
      _uniqueId={stableUniqueId}
    />
  )
}

export const DatePickerChangeValue: Story = () => {
  const [date, setDate] = React.useState(new Date(1999, 11, 31))
  return (
    <div>
      <button onClick={() => setDate(new Date(2000, 0, 1))}>Go Y2K!</button>
      <DatePicker
        label="Controlled component, set to 31 Dec 1999"
        value={date}
        _uniqueId={stableUniqueId}
      />
    </div>
  )
}

export const RangeDateCalendar: Story = () => {
  const [selected, setSelected] = React.useState<Date[] | undefined>()
  const { getDateProps, ...dayzedData } = useDayzed({
    selected,
    onDateSelected: onRangeDateSelected({ selected, setSelected }),
    date: new Date('05/30/2020')
  })
  const { onMouseLeave, onMouseEnter, isInRange } = useIsInRange(selected)
  return (
    <Calendar {...dayzedData} onMouseLeave={onMouseLeave}>
      <CalendarDates getDateProps={getDateProps}>
        {(renderProps, dateObj) => {
          return (
            <button
              {...renderProps}
              className={classNames(
                renderProps.className,
                isInRange(dateObj.date)
              )}
              onMouseEnter={() => onMouseEnter(dateObj.date)}
            />
          )
        }}
      </CalendarDates>
    </Calendar>
  )
}

export const RangeDateCalendarWithButton: Story = () => {
  const [selected, setSelected] = React.useState<Date[]>([])
  const { getDateProps, ...dayzedData } = useDayzed({
    selected,
    onDateSelected: onRangeDateSelected({ selected, setSelected }),
    date: new Date('05/30/2020')
  })
  const { onMouseLeave, onMouseEnter, isInRange } = useIsInRange(selected)

  const handleClick = () => {
    setSelected([new Date('05/13/2020'), new Date('05/30/2020')])
  }
  return (
    <>
      <button onClick={handleClick}>5/13/2020 - 05/30/2020</button>
      <Calendar {...dayzedData} onMouseLeave={onMouseLeave}>
        <CalendarDates getDateProps={getDateProps}>
          {(renderProps, dateObj) => {
            const { selectable } = dateObj
            return (
              <button
                {...renderProps}
                className={classNames(
                  renderProps.className,
                  isInRange(dateObj.date)
                )}
                onMouseEnter={() => onMouseEnter(dateObj.date)}
              />
            )
          }}
        </CalendarDates>
      </Calendar>
    </>
  )
}

export const RangeDateCalendarWithInput: Story = () => {
  const [selected, setSelected] = React.useState<Date[] | undefined>()
  const { getDateProps, ...dayzedData } = useDayzed({
    selected,
    onDateSelected: onRangeDateSelected({ selected, setSelected }),
    date: new Date('05/30/2020')
  })
  const { onMouseLeave, onMouseEnter, isInRange } = useIsInRange(selected)
  const [slide, setSlide] = React.useState<ValueOf<typeof slides>>()
  const [startValue, onStartChange] = useRangeSelectChange({
    start: true,
    selected,
    setSlide,
    setSelected
  })
  const [endValue, onEndChange] = useRangeSelectChange({
    start: false,
    selected,
    setSlide,
    setSelected
  })
  return (
    <div>
      <TextInput label="Start" onChange={onStartChange} value={startValue} />
      <TextInput label="End" onChange={onEndChange} value={endValue} />
      <Calendar {...dayzedData} onMouseLeave={onMouseLeave} slide={slide}>
        <CalendarDates getDateProps={getDateProps}>
          {(renderProps, dateObj) => {
            return (
              <button
                {...renderProps}
                className={classNames(
                  renderProps.className,
                  isInRange(dateObj.date)
                )}
                onMouseEnter={() => onMouseEnter(dateObj.date)}
              />
            )
          }}
        </CalendarDates>
      </Calendar>
    </div>
  )
}

export const RangeDateCalendarWithInputTwoMonths: Story = () => {
  const [selected, setSelected] = React.useState<Date[] | undefined>()
  const { getDateProps, ...dayzedData } = useDayzed({
    monthsToDisplay: 2,
    selected,
    onDateSelected: onRangeDateSelected({ selected, setSelected }),
    date: new Date('05/30/2020')
  })
  const { onMouseLeave, onMouseEnter, isInRange } = useIsInRange(selected)
  const [slide, setSlide] = React.useState<ValueOf<typeof slides>>()
  const [startValue, onStartChange] = useRangeSelectChange({
    start: true,
    selected,
    setSlide,
    setSelected
  })
  const [endValue, onEndChange] = useRangeSelectChange({
    start: false,
    selected,
    setSlide,
    setSelected
  })
  return (
    <>
      <TextInput label="Start" onChange={onStartChange} value={startValue} />
      <TextInput label="End" onChange={onEndChange} value={endValue} />
      <Calendar {...dayzedData} onMouseLeave={onMouseLeave} slide={slide}>
        <CalendarDates getDateProps={getDateProps}>
          {(renderProps, dateObj) => {
            return (
              <button
                {...renderProps}
                className={classNames(
                  renderProps.className,
                  isInRange(dateObj.date)
                )}
                onMouseEnter={() => onMouseEnter(dateObj.date)}
              />
            )
          }}
        </CalendarDates>
      </Calendar>
    </>
  )
}

export const MultiDate: Story = () => {
  const initialDate = new Date(2021, 0, 1)
  const initialDate2 = new Date(2021, 0, 5)
  const [selected, setSelected] = React.useState<Date[]>([
    initialDate,
    initialDate2
  ])
  const { getDateProps, ...dayzedData } = useDayzed({
    selected,
    onDateSelected: onMultiDateSelected({ selected, setSelected }),
    date: initialDate
  })
  return (
    <Calendar {...dayzedData}>
      <CalendarDates getDateProps={getDateProps}>
        {renderProps => {
          return <button {...renderProps} />
        }}
      </CalendarDates>
    </Calendar>
  )
}
