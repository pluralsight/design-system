import { CloseIcon } from '@pluralsight/ps-design-system-icon'
import Field from '@pluralsight/ps-design-system-field'
import Tag from '@pluralsight/ps-design-system-tag'
import {
  useUniqueId,
  usePrevious,
  classNames
} from '@pluralsight/ps-design-system-util'
import { useMultipleSelection } from 'downshift'
import React from 'react'

import '../css/index.css'
import { Option } from './types'

export { Option }

interface TagsInputProps
  extends Omit<
    React.ComponentProps<typeof Field>,
    'children' | 'label' | 'onChange' | 'subLabel'
  > {
  label?: string | React.ReactElement<typeof Field.Label>
  onChange: (evt: React.SyntheticEvent | null, nextValue: Option[]) => void
  onSearchInputChange: React.ChangeEventHandler<HTMLInputElement>
  placeholder?: string
  renderInputTag?: React.ComponentProps<typeof Field.Input>['renderTag']
  searchInputValue: string
  subLabel?: string | React.ReactNode
  value: Option[]
}

interface TagsInputStatics {
  Label: typeof Field.Label
  SubLabel: typeof Field.SubLabel
}

type TagsInputComponent = React.FC<TagsInputProps> & TagsInputStatics

const TagsInput: TagsInputComponent = props => {
  const {
    className,
    disabled,
    label,
    onChange,
    onSearchInputChange,
    placeholder,
    prefix,
    renderInputTag,
    searchInputValue,
    subLabel,
    suffix,
    value = [],
    ...rest
  } = props

  const inputId = useUniqueId('tagsinput__input-')

  const [hasMounted, setHasMounted] = React.useState(false)
  React.useLayoutEffect(() => {
    setHasMounted(true)
  }, [])
  const prevWasMounted = usePrevious(hasMounted)

  const {
    getDropdownProps,
    getSelectedItemProps,
    removeSelectedItem,
    selectedItems
  } = useMultipleSelection({
    onSelectedItemsChange: changes => {
      onChange(null, changes.selectedItems ?? [])
    },
    selectedItems: value
  })

  const handleRemoveSelected = (
    evt: React.MouseEvent<unknown>,
    item: Option
  ) => {
    evt.stopPropagation()
    removeSelectedItem(item)
  }

  const Label = React.useMemo(() => {
    if (!label) return null

    if (React.isValidElement(label)) {
      return React.cloneElement<any>(label, { htmlFor: inputId })
    }

    return <Field.Label htmlFor={inputId}>{label}</Field.Label>
  }, [label, inputId])

  const SubLabel = React.useMemo(() => {
    if (!subLabel) return null

    if (React.isValidElement(subLabel)) return subLabel

    return <Field.SubLabel>{subLabel}</Field.SubLabel>
  }, [subLabel])

  const inputProps = getDropdownProps()

  React.useLayoutEffect(
    function keepInputInView() {
      if (!hasMounted) return
      if (hasMounted && !prevWasMounted) return

      const el = document.getElementById(inputProps.id)
      if (!el?.scrollIntoView) return

      el.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'nearest'
      })
    },
    [hasMounted, inputProps.id, prevWasMounted, selectedItems]
  )

  return (
    <Field
      disabled={disabled}
      label={Label}
      prefix={prefix && <Prefix>{prefix}</Prefix>}
      size={Field.sizes.small}
      subLabel={SubLabel}
      suffix={suffix && <Suffix>{suffix}</Suffix>}
      className={classNames(
        'psds-tagsinput',
        disabled && 'psds-tagsinput--disabled',
        className
      )}
      {...rest}
    >
      <div className={'psds-tagsinput__pills-container'}>
        <Pills>
          {selectedItems.map((option, index) => (
            <Pill
              key={`selected-item-${index}`}
              onRequestRemove={e => handleRemoveSelected(e, option)}
              {...getSelectedItemProps({ selectedItem: option, index })}
            >
              {option.label}
            </Pill>
          ))}

          <PillAdjacentInput
            {...inputProps}
            disabled={disabled}
            id={inputId}
            onChange={onSearchInputChange}
            placeholder={placeholder}
            renderTag={renderInputTag}
            value={searchInputValue}
          />
        </Pills>
      </div>
    </Field>
  )
}

TagsInput.Label = Field.Label
TagsInput.SubLabel = Field.SubLabel

export default TagsInput

const Pills = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>((props, ref) => {
  const { children, ...rest } = props

  return (
    <div ref={ref} {...rest} className={'psds-tagsinput__pills'}>
      {children}
    </div>
  )
})

interface PillProps extends React.ComponentProps<typeof Tag> {
  onRequestRemove: React.MouseEventHandler
}
const Pill = React.forwardRef<HTMLDivElement, PillProps>((props, ref) => {
  const { children, onRequestRemove, ...rest } = props

  return (
    <div ref={ref} {...rest} className={'psds-tagsinput__pill'}>
      <Tag
        icon={<CloseIcon onClick={onRequestRemove} />}
        isPressed
        size={Tag.sizes.small}
      >
        {children}
      </Tag>
    </div>
  )
})

const PillAdjacentInputContainer = React.forwardRef<HTMLDivElement>(
  (props, ref) => {
    return <div ref={ref} {...props} />
  }
)

const PillAdjacentInput = React.forwardRef<HTMLInputElement>(
  (props: React.ComponentProps<typeof Field.Input>, ref) => {
    return (
      <Field.Input
        ref={ref}
        renderContainer={PillAdjacentInputContainer}
        type="text"
        {...props}
        className={'psds-tagsinput__input'}
      />
    )
  }
)

const Prefix: React.FC = p => (
  <div {...p} className={'psds-tagsinput__prefix'} />
)

const Suffix: React.FC = p => (
  <div {...p} className={'psds-tagsinput__suffix'} />
)
