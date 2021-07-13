import { useCombobox } from 'downshift'
import React from 'react'

import { CaretDownIcon } from '@pluralsight/ps-design-system-icon'
import Field from '@pluralsight/ps-design-system-field'
import { BelowLeft } from '@pluralsight/ps-design-system-position'
import {
  canUseDOM,
  classNames,
  forwardRefWithAs
} from '@pluralsight/ps-design-system-util'
import Menu, { MenuItemProps } from '@pluralsight/ps-design-system-menu'

import '../css/index.css'

const defaultRenderOption = forwardRefWithAs<MenuItemProps, 'button'>(
  (props, ref) => {
    const { value } = props
    return (
      <Menu.Item {...props} ref={ref}>
        {value && value.label}
        <Menu.Check style={{ marginLeft: 'auto' }} />
      </Menu.Item>
    )
  }
)

export type TypeaheadFilterFunction = (
  options: {
    label: React.ReactText
    value: React.ReactText
  }[],
  inputValue?: string | undefined
) => {
  label: React.ReactText
  value: React.ReactText
}[]
interface TypeaheadFieldProps
  extends Omit<
    React.ComponentProps<typeof Field>,
    'children' | 'label' | 'onChange' | 'subLabel' | 'suffix'
  > {
  label?: string | React.ReactElement<typeof Field.Label>
  onChange: (
    e: React.ChangeEvent<HTMLInputElement> | null,
    selectedItem?: {
      label: React.ReactText
      value?: React.ReactText
    }
  ) => void
  options: {
    label: React.ReactText
    value: React.ReactText
  }[]
  placeholder?: string
  renderInputTag?: React.ComponentProps<typeof Field.Input>['renderTag']
  subLabel?: string | React.ReactNode
  value?: string
  renderOption?: React.FC
  filterFunction?: TypeaheadFilterFunction
}

interface TypeaheadFieldStatics {
  Label: typeof Field.Label
  SubLabel: typeof Field.SubLabel
  appearances: typeof Field.appearances
  sizes: typeof Field.sizes
}

type TypeaheadFieldComponent = React.FC<TypeaheadFieldProps> &
  TypeaheadFieldStatics

const defaultFilterFunc = (
  options: {
    label: React.ReactText
    value: React.ReactText
  }[],
  inputValue?: string
) =>
  options.filter(({ label }: { label: React.ReactText }) =>
    `${label}`
      .toLowerCase()
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
      .includes((inputValue || '').toLowerCase())
  )

const Typeahead: TypeaheadFieldComponent = props => {
  const {
    disabled,
    label,
    onChange,
    options,
    placeholder,
    subLabel,
    value,
    error,
    size,
    renderInputTag = Field.Input,
    renderOption = defaultRenderOption,
    'aria-label': ariaLabel,
    'aria-autocomplete': ariaAutoComplete = 'list',
    filterFunction = defaultFilterFunc,
    ...rest
  } = props
  const [searchTerm, setSearchTerm] = React.useState<
    React.ReactText | undefined
  >(value || '')
  const [inputItems, setInputItems] = React.useState(options)
  const {
    closeMenu,
    getToggleButtonProps,
    getComboboxProps,
    getInputProps,
    getItemProps,
    getLabelProps,
    getMenuProps,
    highlightedIndex,
    isOpen,
    openMenu,
    selectedItem: activeItem
  } = useCombobox({
    defaultHighlightedIndex: 0,
    items: inputItems,
    stateReducer(state, actionAndChanges) {
      const { type, changes } = actionAndChanges
      // this prevents the menu from being closed when the user selects an item with 'Enter' or mouse
      switch (type) {
        case useCombobox.stateChangeTypes.InputBlur:
        case useCombobox.stateChangeTypes.InputKeyDownEnter:
        case useCombobox.stateChangeTypes.ItemClick: {
          const { selectedItem, inputValue } = changes
          return {
            ...changes,
            inputValue: selectedItem?.label
              ? `${selectedItem?.label}`
              : inputValue
          }
        }
        default:
          return changes // otherwise business as usual.
      }
    },
    onInputValueChange: ({ type, inputValue, selectedItem }) => {
      const bothTypeAutoComplete =
        type === '__input_blur__' &&
        !selectedItem &&
        !inputValue &&
        ariaAutoComplete === 'both'
      setSearchTerm(bothTypeAutoComplete ? searchTerm : inputValue)
      type === '__input_blur__' &&
        onChange &&
        onChange(
          null,
          bothTypeAutoComplete
            ? { label: searchTerm as string }
            : selectedItem || undefined
        )
      setInputItems(filterFunction(options, inputValue))
    }
  })
  React.useEffect(() => {
    onChange && onChange(null, activeItem || undefined)
  }, [activeItem])
  const { value: inputValue, ...inputProps } = getInputProps({
    onKeyDown: (evt: React.KeyboardEvent<HTMLInputElement>) => {
      if (!canUseDOM()) return

      const { altKey } = evt
      const key = evt.key.toLowerCase()

      const shouldClose = isOpen && altKey && key === 'arrowup'
      const shouldOpen = !isOpen && altKey && key === 'arrowdown'

      if (shouldClose) setTimeout(closeMenu, 0)
      else if (shouldOpen) setTimeout(openMenu, 0)
    },
    onFocus: () => {
      if (!isOpen) openMenu()
    },
    onChange: (evt: React.ChangeEvent<HTMLInputElement>) => {
      onChange && onChange(evt, activeItem || undefined)
    }
  })

  React.useLayoutEffect(
    function keepInputInView() {
      if (!isOpen) return

      const el = document.getElementById(inputProps.id)
      if (!el?.scrollIntoView) return

      el.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'nearest'
      })
    },
    [isOpen, inputProps.id]
  )
  const RenderOption = React.useMemo(() => renderOption, [renderOption])
  const RenderInput = React.useMemo(() => renderInputTag, [renderInputTag])
  const fieldRef = React.useRef<HTMLDivElement>(null)
  const { ref: comboRef, ...comboBoxProps } = getComboboxProps()
  React.useImperativeHandle(
    comboRef,
    () => fieldRef.current as unknown as HTMLDivElement
  )
  const [width, setWidth] = React.useState<number>()
  React.useEffect(() => {
    const field = fieldRef.current
    if (field) {
      setWidth(field.getBoundingClientRect().width)
    }
  }, [fieldRef])
  const Label = React.useMemo(() => {
    const _ariaLabel = !label ? ariaLabel : undefined
    if (React.isValidElement(label)) {
      return React.cloneElement<any>(label, {
        ...getLabelProps(),
        'aria-label': _ariaLabel
      })
    }

    return (
      <Field.Label {...getLabelProps()} aria-label={_ariaLabel}>
        {label}
      </Field.Label>
    )
  }, [label, getLabelProps])

  const SubLabel = React.useMemo(() => {
    if (React.isValidElement(subLabel)) return subLabel

    return <Field.SubLabel>{subLabel}</Field.SubLabel>
  }, [subLabel])
  return (
    <BelowLeft
      show={
        <div
          className={classNames(
            'psds-multi-select__wrapper',
            isOpen && 'psds-multi-select__wrapper--open'
          )}
        >
          <Menu
            className="psds-multi-select__menu"
            selectedItem={activeItem}
            {...getMenuProps({}, { suppressRefError: true })}
            style={{ width: width || 'auto' }}
          >
            {inputItems.length < 1 && (
              <RenderOption
                id={`menu-option-empty-label`}
                key={`menu-option-empty-label`}
                name="No results found"
                active={false}
                value={{ label: 'No results found', value: 'No results found' }}
                role="option"
              />
            )}
            {inputItems.map((option, index) => (
              <RenderOption
                key={`menu-option-${index}`}
                value={option}
                role="option"
                active={highlightedIndex === index}
                {...getItemProps({ item: option, index })}
              />
            ))}
          </Menu>
        </div>
      }
    >
      <Field
        ref={fieldRef}
        {...comboBoxProps}
        disabled={disabled}
        size={size}
        error={error}
        label={Label}
        subLabel={SubLabel}
        suffix={<CaretSuffix {...getToggleButtonProps()} />}
        {...rest}
      >
        <RenderInput
          {...inputProps}
          aria-autocomplete={ariaAutoComplete}
          value={searchTerm}
          disabled={disabled}
          placeholder={placeholder}
        />
      </Field>
    </BelowLeft>
  )
}

Typeahead.Label = Field.Label
Typeahead.SubLabel = Field.SubLabel
Typeahead.appearances = Field.appearances
Typeahead.sizes = Field.sizes

export default Typeahead

const CaretSuffix = forwardRefWithAs((props, ref) => (
  <div {...props} className="psds-multi-select__caret" ref={ref}>
    <CaretDownIcon />
  </div>
))
