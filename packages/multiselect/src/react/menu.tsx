import React from 'react'
import { classNames } from '@pluralsight/ps-design-system-util'
import '../css/index.css'

interface MenuProps
  extends Omit<React.HTMLAttributes<HTMLUListElement>, 'ref'> {
  open: boolean
}
interface MenuStatics {
  Item: typeof Item
}

type MenuComponent = React.ForwardRefExoticComponent<MenuProps> & MenuStatics

const Menu = React.forwardRef<HTMLUListElement, MenuProps>((props, ref) => {
  const { open, className, ...rest } = props

  return (
    <ul
      ref={ref}
      {...rest}
      className={classNames(
        className,
        'psds-multi-select__menu',
        open && 'psds-multi-select__menu--open'
      )}
    />
  )
}) as MenuComponent

interface ItemProps extends Omit<React.HTMLAttributes<HTMLLIElement>, 'ref'> {
  highlighted: boolean
}
const Item = React.forwardRef<HTMLLIElement, ItemProps>((props, ref) => {
  const { children, highlighted, className, ...rest } = props
  return (
    <li
      ref={ref}
      {...rest}
      className={classNames(
        className,
        'psds-multi-select__menu__item',
        highlighted && 'psds-multi-select__menu__item--highlighted'
      )}
    >
      {children}
    </li>
  )
})

Menu.Item = Item

export { Menu }
