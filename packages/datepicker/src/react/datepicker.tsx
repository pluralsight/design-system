import Field from '@pluralsight/ps-design-system-field'
import {
  ValueOf,
  canUseDOM,
  RefFor,
  uniqueId as defaultUniqueId
} from '@pluralsight/ps-design-system-util'
import { useDayzed, DateObj } from 'dayzed'
import React from 'react'

import { Calendar } from './calendar'
import { CalendarDates } from './calendar-dates'
import { TextInputField } from './text-input-field'
import { useDateSelectChange } from './utils'
import { slides } from '../vars/index'

interface DatePickerProps
  extends Omit<React.ComponentProps<typeof Field>, 'onSelect'> {
  onSelect?: (evt: React.SyntheticEvent, dateObj: DateObj) => void
  value?: Date
  _uniqueId?: (prefix: string) => string
}

export const DatePicker: React.FC<DatePickerProps> = ({
  disabled,
  error,
  label,
  prefix,
  renderContainer,
  renderTag,
  size,
  subLabel,
  suffix,
  onSelect,
  value: valueFromProps,
  _uniqueId: uniqueId = defaultUniqueId,
  ...props
}) => {
  const [selected, setSelected] = React.useState<Date | undefined>(
    valueFromProps
  )

  React.useEffect(() => setSelected(valueFromProps), [valueFromProps])
  const [open, setOpen] = React.useState<boolean>(false)
  const onDateSelected = (dateObj: DateObj, evt: React.SyntheticEvent) => {
    onSelect && onSelect(evt, dateObj)
    setSelected(dateObj.date)
    setOpen(false)
  }
  const { getDateProps, ...dayzedData } = useDayzed({
    date: selected,
    selected,
    onDateSelected
  })
  const handleIconClick: React.MouseEventHandler<HTMLDivElement> = evt => {
    setOpen(!open)
  }
  const handleTextfieldKeyDown: React.KeyboardEventHandler<HTMLInputElement> =
    evt => {
      const key = evt.key.toLowerCase()
      ;[' ', 'enter'].includes(key) && setOpen(true)
    }

  const handleEscapeKeyDown: React.KeyboardEventHandler<HTMLInputElement> =
    evt => {
      const key = evt.key.toLowerCase()
      key === 'escape' && setOpen(false)
    }
  const [slide, setSlide] = React.useState<ValueOf<typeof slides>>()
  const [value, onChange] = useDateSelectChange({
    selected,
    setSlide,
    setSelected
  })
  const ref = React.useRef<HTMLDivElement | undefined>()
  React.useEffect(() => {
    if (!canUseDOM()) return () => {}

    const handleClickOutsideMenu = (evt: MouseEvent) => {
      if (evt.target instanceof HTMLElement) {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
        if ((ref.current as HTMLDivElement).contains(evt.target)) return
        setOpen(false)
      }
    }
    document.addEventListener('click', handleClickOutsideMenu, {
      capture: true
    })
    return () =>
      document.removeEventListener('click', handleClickOutsideMenu, {
        capture: true
      })
  }, [setOpen])
  const labelId = uniqueId('text-input__label-')
  const inputId = uniqueId('text-input__input-')
  return (
    <div
      style={{ display: 'inline-block', position: 'relative' }}
      {...props}
      ref={ref as RefFor<'div'>}
    >
      <TextInputField
        disabled={disabled}
        error={error}
        label={label}
        onChange={onChange}
        onClick={handleIconClick}
        onKeyDown={handleTextfieldKeyDown}
        placeholder="mm/dd/yyyy"
        prefix={prefix}
        renderContainer={renderContainer}
        renderTag={renderTag}
        size={size}
        subLabel={subLabel}
        suffix={suffix}
        value={value}
        labelId={labelId}
        inputId={inputId}
      />
      <br />
      {open && (
        <Calendar
          {...dayzedData}
          aria-modal="true"
          aria-labelledby={labelId}
          aria-live="polite"
          style={{ position: 'absolute', zIndex: 1, marginTop: 4 }}
          slide={slide}
          onKeyDown={handleEscapeKeyDown}
          uniqueId={uniqueId}
          selected={selected}
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
