import {
  classNames,
  createUniversalPortal,
  useCloseOnDocumentEvents
} from '@pluralsight/ps-design-system-util'
import React from 'react'

import '../css/index.css'
import {
  DropdownContext,
  useMenuRef,
  handleMenuKeyDownEvents
} from '../js/index'

interface DropdownMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  inNode?: HTMLElement
  isOpen: boolean
  menu: React.ReactNode
  menuPosition: { top: number; left: number; width: number }
  buttonRef: React.RefObject<HTMLButtonElement>
}

export const Menu = React.forwardRef<HTMLDivElement, DropdownMenuProps>(((
  props,
  forwardedRef
) => {
  const { className, inNode, isOpen, menu, menuPosition, buttonRef, ...rest } =
    props

  /* eslint-disable-next-line react-hooks/rules-of-hooks */
  const [adjMenuPosition, setAdjMenuPosition] = React.useState<{
    left: number
    top: number
    width: number
  }>()

  /* eslint-disable-next-line react-hooks/rules-of-hooks */
  const context = React.useContext(DropdownContext)
  /* eslint-disable-next-line react-hooks/rules-of-hooks */
  const ref = useMenuRef(forwardedRef)

  /* eslint-disable-next-line react-hooks/rules-of-hooks */
  useCloseOnDocumentEvents<HTMLDivElement>(ref, (evt: Event) =>
    context.onDocumentEvents(ref, evt)
  )

  const handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = evt => {
    isOpen && handleMenuKeyDownEvents(evt)
  }

  /* eslint-disable-next-line react-hooks/rules-of-hooks */
  React.useLayoutEffect(() => {
    setAdjMenuPosition(menuPosition)
    if (!isOpen || !ref.current || !buttonRef.current) return

    const menuRect = ref.current.getBoundingClientRect()
    const buttonRect = buttonRef.current.getBoundingClientRect()
    if (buttonRect.bottom + menuRect.height > window.innerHeight) {
      setAdjMenuPosition({
        ...menuPosition,
        top: buttonRect.top - menuRect.height - 8
      })
    }
  }, [ref, buttonRef, isOpen, menuPosition, setAdjMenuPosition])

  return (
    menu &&
    isOpen &&
    createUniversalPortal(
      <div
        className={classNames('psds-dropdown__menu-wrapper', className)}
        style={adjMenuPosition}
      >
        <div
          className="psds-dropdown__menu"
          ref={ref}
          role="listbox"
          {...rest}
          onKeyDown={handleKeyDown}
        >
          {menu}
        </div>
      </div>,
      inNode
    )
  )
}) as React.ForwardRefRenderFunction<HTMLDivElement, DropdownMenuProps>)

Menu.displayName = 'Dropdown.Menu'
// TODO: replace
Menu.defaultProps = {
  menu: <span />
}
