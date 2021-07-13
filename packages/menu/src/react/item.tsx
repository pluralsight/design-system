import {
  RefFor,
  classNames,
  forwardRefWithAs
} from '@pluralsight/ps-design-system-util'
import React from 'react'

import '../css/index.css'
import { MenuContext, ItemContext, SelectedItem } from './context'

export interface MenuItemProps {
  active?: boolean
  disabled?: boolean
  onClick?: (evt: React.MouseEvent, selectedItem: SelectedItem) => void
  isSelected?: boolean
  value?: SelectedItem
  onItemBlur?: React.FocusEventHandler
  onItemFocus?: React.FocusEventHandler
  onKeyDown?: React.KeyboardEventHandler
}

export const Item = forwardRefWithAs<MenuItemProps, 'button'>((props, ref) => {
  const {
    as: Comp = 'button',
    active,
    className,
    disabled,
    onClick,
    value = {
      value: '',
      label: ''
    },
    children,
    onKeyDown,
    role: roleFromProps,
    'aria-selected': ariaSelected,
    ...rest
  } = props
  const {
    onMenuClick,
    selectedItem,
    optionRole: roleFromContext,
    useActive
  } = React.useContext(MenuContext)
  const handleClick = (evt: React.MouseEvent | React.KeyboardEvent) => {
    onMenuClick && onMenuClick(evt as React.MouseEvent, value)
    onClick && onClick(evt as React.MouseEvent, value)
  }
  const handleKeyDown: React.KeyboardEventHandler = evt => {
    if (evt.key === 'Enter') {
      handleClick(evt)
      evt.preventDefault()
    }
    onKeyDown && onKeyDown(evt)
  }
  const selected = selectedItem?.value === value.value
  const listItem = React.useRef<HTMLLIElement | undefined>()
  const { active: hookActive, handleActiveState } = useActive(listItem)

  const optionRole = roleFromProps || roleFromContext
  const listboxProps =
    optionRole === 'option'
      ? {
          'aria-selected': ariaSelected || selected
        }
      : {}

  return (
    <li
      className={classNames(
        'psds-menu__item',
        disabled && 'psds-menu__item--disabled',
        (active || hookActive) && 'psds-menu__item--active',
        className
      )}
      data-disabled={disabled}
      tabIndex={!disabled ? -1 : undefined}
      onKeyDown={handleKeyDown}
      onClick={handleClick}
      ref={listItem as RefFor<'li'>}
      onBlur={handleActiveState}
      onFocus={handleActiveState}
      role={optionRole}
      {...listboxProps}
    >
      <Comp
        className="psds-menu__option"
        disabled={disabled}
        ref={ref as RefFor<typeof Comp>}
        {...rest}
      >
        <div className="psds-menu__option-inner">
          <ItemContext.Provider value={{ selected }}>
            {children}
          </ItemContext.Provider>
        </div>
      </Comp>
    </li>
  )
})

Item.displayName = 'Dropdown.Item'
