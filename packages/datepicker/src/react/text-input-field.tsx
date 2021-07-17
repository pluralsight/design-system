import Field, { FieldProps } from '@pluralsight/ps-design-system-field'
import { CalendarIcon } from '@pluralsight/ps-design-system-icon'
import React from 'react'

interface TextInputFieldProps extends FieldProps {
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  placeholder?: string
  value?: React.ReactText
  labelId: string
  inputId: string
}

export const TextInputField: React.FC<TextInputFieldProps> = props => {
  const {
    disabled,
    label,
    onChange,
    onClick,
    placeholder,
    prefix,
    subLabel,
    value,
    labelId,
    inputId,
    ...rest
  } = props

  const Label = React.useMemo(() => {
    if (!label) return
    if (React.isValidElement(label)) return label

    return (
      <Field.Label htmlFor={inputId} id={labelId}>
        {label}
      </Field.Label>
    )
  }, [label])

  const SubLabel = React.useMemo(() => {
    if (!subLabel) return
    if (React.isValidElement(subLabel)) return subLabel

    return <Field.SubLabel>{subLabel}</Field.SubLabel>
  }, [subLabel])

  return (
    <Field
      disabled={disabled}
      prefix={
        prefix || (
          <CalendarIcon onClick={onClick} style={{ cursor: 'pointer' }} />
        )
      }
      label={Label}
      subLabel={SubLabel}
      {...rest}
    >
      <Field.Input
        disabled={disabled}
        id={inputId}
        onChange={onChange}
        placeholder={placeholder}
        value={value}
      />
    </Field>
  )
}
