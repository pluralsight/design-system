import { useTheme } from '@pluralsight/ps-design-system-theme'
import { RefFor, classNames } from '@pluralsight/ps-design-system-util'
import React from 'react'

import '../css/index.css'

export interface BaseListItemProps {
  id: string | number
  active?: boolean
}
export interface ListItemAnchorProps
  extends BaseListItemProps,
    Omit<React.HTMLAttributes<HTMLAnchorElement>, 'id' | 'onClick'> {
  href: string
  onClick?: (i: number, event: React.MouseEvent<HTMLAnchorElement>) => void
}
export interface ListItemButtonProps
  extends BaseListItemProps,
    Omit<React.HTMLAttributes<HTMLButtonElement>, 'id' | 'onClick'> {
  href?: undefined
  onClick?: (i: number, event: React.MouseEvent<HTMLButtonElement>) => void
}
type ListItemElement = HTMLButtonElement | HTMLAnchorElement
type ListItemProps = ListItemAnchorProps | ListItemButtonProps
type ListItemComponent = React.ForwardRefExoticComponent<ListItemProps> & {
  (props: ListItemAnchorProps, ref?: RefFor<'a'>): JSX.Element
  (props: ListItemButtonProps, ref?: RefFor<'button'>): JSX.Element
}

const ListItem = React.forwardRef<ListItemElement, ListItemProps>(
  (props, ref) => {
    const { active, children, className, ...rest } = props
    const themeName = useTheme()
    return React.createElement(
      'href' in props ? 'a' : 'button',
      {
        ...rest,
        className: classNames(
          className,
          'psds-tab__list-item',
          `psds-theme--${themeName}`,
          active && `psds-tab__list-item--active`
        ),
        'aria-selected': active,
        ref,
        role: 'tab',
        tabIndex: -1
      },
      <div className={'psds-tab__list-item__text'}>
        <div className={'psds-tab__list-item__text-inner'}>{children}</div>
        <span className={'psds-tab__list-item__bar'} />
      </div>
    )
  }
) as ListItemComponent

export default ListItem
