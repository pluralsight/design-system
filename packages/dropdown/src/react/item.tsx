import { CheckIcon } from '@pluralsight/ps-design-system-icon'
import { RefFor, classNames } from '@pluralsight/ps-design-system-util'
import React from 'react'

import '../css/index.css'
import { DropdownContext } from '../js/index'

interface DropdownItemProps
  extends Omit<React.HTMLAttributes<HTMLButtonElement>, 'onClick'> {
  children: React.ReactText
  disabled?: boolean
  onClick?: (evt: React.MouseEvent, value: React.ReactText) => void
  icon?: React.ReactNode
  value?: React.ReactText
}

export const Item = React.forwardRef<HTMLButtonElement, DropdownItemProps>(
  (
    { className, disabled, onClick, value, icon, children, ...rest },
    forwardedRef
  ) => {
    const context = React.useContext(DropdownContext)
    const ref = React.useRef<HTMLButtonElement>()
    React.useImperativeHandle(
      forwardedRef,
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
      () => ref.current as HTMLButtonElement
    )
    const [active, setActive] = React.useState(false)
    const isActive = React.useCallback(() => {
      ref.current && setActive(document.activeElement === ref.current)
    }, [ref, setActive])
    React.useEffect(() => {
      isActive()
    }, [isActive])
    const valueExists = typeof value !== 'undefined'
    const isSelected =
      (valueExists && context.selectedItem?.value === value) ||
      context.selectedItem?.label === children

    const handleClick = (evt: React.MouseEvent | React.KeyboardEvent) => {
      const valueToSend = typeof value !== 'undefined' ? value : children || ''
      context.onMenuClick(evt as React.MouseEvent, valueToSend)
      if (typeof onClick === 'function')
        onClick(evt as React.MouseEvent, valueToSend)
    }
    const handleKeyDown: React.KeyboardEventHandler = evt => {
      if (evt.key === 'Enter') {
        handleClick(evt)
        evt.preventDefault()
      }
    }
    return (
      <button
        disabled={disabled}
        onClick={handleClick}
        onBlur={isActive as React.FocusEventHandler}
        onFocus={isActive as React.FocusEventHandler}
        onKeyDown={handleKeyDown}
        role="option"
        aria-selected={isSelected}
        ref={ref as RefFor<'button'>}
        tabIndex={-1}
        {...rest}
        className={classNames(
          'psds-dropdown__item',
          !!disabled && 'psds-dropdown__item--disabled',
          active && 'psds-dropdown__item--active',
          className
        )}
      >
        <span className="psds-dropdown__item-icon">{icon}</span>
        <span className="psds-dropdown__item-text">{children}</span>
        {isSelected && (
          <CheckIcon className="psds-dropdown__item-selected-icon" />
        )}
      </button>
    )
  }
)

Item.displayName = 'Dropdown.Item'
