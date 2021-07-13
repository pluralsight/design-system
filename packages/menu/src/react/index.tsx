import polyfillFocusWithin from 'focus-within'
import {
  RefForwardingComponent,
  ValueOf,
  canUseDOM,
  classNames,
  dashify,
  useMenuRef
} from '@pluralsight/ps-design-system-util'
import React from 'react'

import '../css/index.css'
import * as vars from '../vars/index'

import { MenuContext, SelectedItem, defaultUseActive } from './context'
import { Check } from './check'
import { Divider } from './divider'
import { Ellipsis } from './ellipsis'
import { Item } from './item'

interface MenuStatics {
  Check: typeof Check
  Divider: typeof Divider
  Ellipsis: typeof Ellipsis
  Item: typeof Item
  origins: typeof vars.origins
  tagName: typeof vars.tagName
  useMenuRef: typeof useMenuRef
}

interface MenuProps
  extends Omit<React.HTMLAttributes<HTMLUListElement>, 'onClick'> {
  selectedItem?: {
    value: React.ReactText
    label: React.ReactText
  }
  optionRole?: string
  useActive?: (ref: React.MutableRefObject<HTMLLIElement | undefined>) => {
    active: boolean
    handleActiveState: (event: React.FocusEvent<Element>) => void
  }
  onClick?: (evt: React.MouseEvent, selectedItem: SelectedItem) => void
  origin?: ValueOf<typeof vars.origins>
}
type MenuComponent = RefForwardingComponent<
  MenuProps,
  HTMLUListElement,
  MenuStatics
>

if (canUseDOM()) polyfillFocusWithin(document)

const Menu = React.forwardRef<HTMLUListElement, MenuProps>(
  (
    {
      className,
      selectedItem,
      origin = vars.origins.topLeft,
      onClick,
      children,
      role = 'menu',
      optionRole = 'menuitem',
      useActive = defaultUseActive,
      ...rest
    },
    ref
  ) => {
    return (
      <ul
        {...rest}
        className={classNames(
          'psds-menu',
          `psds-menu--origin-${dashify(origin)}`,
          className
        )}
        ref={ref}
        role={role}
      >
        <MenuContext.Provider
          value={{
            onMenuClick: onClick,
            selectedItem,
            optionRole,
            useActive
          }}
        >
          {children}
        </MenuContext.Provider>
      </ul>
    )
  }
) as MenuComponent

Menu.displayName = 'Menu.Menu'

Menu.Check = Check
Menu.Divider = Divider
Menu.Ellipsis = Ellipsis
Menu.Item = Item
Menu.origins = vars.origins
Menu.tagName = vars.tagName

Menu.useMenuRef = useMenuRef
export type { MenuItemProps } from './item'
export default Menu
