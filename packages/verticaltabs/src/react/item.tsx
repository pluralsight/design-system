import {
  useTheme,
  names as themeNames
} from '@pluralsight/ps-design-system-theme'
import { CaretDownIcon } from '@pluralsight/ps-design-system-icon'
import {
  ValueOf,
  combineFns,
  omit,
  RefFor,
  classNames
} from '@pluralsight/ps-design-system-util'
import React, { useEffect } from 'react'

import { useHideLabels } from './context'
import { List, CollapsibleList } from './list'
import '../css/index.css'

const styles = {
  item: (themeName: ValueOf<typeof themeNames>) =>
    classNames('psds-verticaltabs__item', `psds-theme--${themeName}`),

  itemIcon: () => 'psds-verticaltabs__item__icon',
  itemIconActive: () => 'psds-verticaltabs__item__icon--active',

  itemTier: (themeName: ValueOf<typeof themeNames>, props: { type?: string }) =>
    classNames(`psds-verticaltabs__${props.type}`, `psds-theme--${themeName}`),

  tier1Header: () => 'psds-verticaltabs__tier1__header',
  tier1HeaderInner: () => 'psds-verticaltabs__tier1__header__inner',

  tier2Header: () => 'psds-verticaltabs__tier2__header',

  tierHeaderLabel: (hideLabels: boolean) => {
    const label = `verticaltabs__header__label`
    return classNames(
      `psds-${label}`,
      hideLabels && `psds-${label}--hide-labels`
    )
  },
  tierHeaderLabelIcon: (collapsed: boolean) => {
    const label = `verticaltabs__header__label__icon`

    return classNames(`psds-${label}`, collapsed && `psds-${label}--collapsed`)
  }
}

interface ItemProps extends React.HTMLAttributes<HTMLLIElement> {
  active?: React.ReactNode
  collapsed?: boolean
  collapsible?: boolean
  header?: React.ReactElement
  itemType?: string
}

interface ItemHeaderBaseProps {
  active?: boolean
  collapsed?: boolean
  collapsible?: boolean
  icon?: React.ReactElement
}
interface AnchorHeaderProps
  extends ItemHeaderBaseProps,
    React.HTMLAttributes<HTMLAnchorElement> {
  onclick?: undefined
  href?: string
}
interface ButtonHeaderProps
  extends ItemHeaderBaseProps,
    React.HTMLAttributes<HTMLButtonElement> {
  onclick?: React.MouseEventHandler
  href?: undefined
}
interface SpanHeaderProps
  extends ItemHeaderBaseProps,
    React.HTMLAttributes<HTMLSpanElement> {
  onclick?: undefined
  href?: undefined
}

type ItemHeaderProps = AnchorHeaderProps | ButtonHeaderProps | SpanHeaderProps

const Item = React.forwardRef<HTMLLIElement, ItemProps>((props, ref) => {
  const {
    active,
    collapsed: initialCollapsed = false,
    collapsible = false,
    children,
    header,
    onClick,
    itemType: type,
    ...rest
  } = props

  const [collapsed, setCollapsed] = React.useState<boolean>(initialCollapsed)
  useEffect(() => {
    setCollapsed(initialCollapsed)
  }, [initialCollapsed])

  const themeName = useTheme()

  const handleHeaderClick = combineFns<[React.MouseEvent<HTMLLIElement>]>(
    () => {
      setCollapsed(!collapsed)
    },
    onClick
  )
  const ListComp = collapsible ? CollapsibleList : List

  return (
    <li ref={ref} {...rest}>
      <div
        className={classNames(
          styles.item(themeName),
          styles.itemTier(themeName, { type })
        )}
        {...(active && { 'data-active': true })}
      >
        {header &&
          React.cloneElement(header, {
            active,
            collapsed,
            collapsible,
            ...(collapsible && { onClick: handleHeaderClick })
          })}
      </div>

      {children && <ListComp collapsed={collapsed}>{children}</ListComp>}
    </li>
  )
})

Item.displayName = 'VerticalTabs.Item'

interface Tier1Props extends Omit<React.ComponentProps<typeof Item>, 'header'> {
  header: React.ReactElement<typeof Tier1Header>
}
const Tier1: React.FC<Tier1Props> & { Header: typeof Tier1Header } = props => (
  <Item {...props} itemType="tier1" />
)

const Tier1Header = React.forwardRef<any, ItemHeaderProps>((props, ref) => {
  const { active, collapsed, collapsible, children, icon, className, ...rest } =
    props
  const hideLabels = useHideLabels()
  const Tag: React.FC = wrapperProps =>
    rest.href ? (
      <a
        {...wrapperProps}
        ref={ref as RefFor<'a'>}
        className={classNames(styles.tier1Header(), className)}
      />
    ) : rest.onClick ? (
      <button
        {...wrapperProps}
        ref={ref as RefFor<'button'>}
        className={classNames(styles.tier1Header(), className)}
      />
    ) : (
      <span
        {...wrapperProps}
        ref={ref as RefFor<'span'>}
        className={classNames(styles.tier1Header(), className)}
      />
    )
  return (
    <Tag {...rest} aria-expanded={!collapsed}>
      {icon &&
        React.cloneElement(icon, {
          size: CaretDownIcon.sizes.medium,
          className: classNames(styles.itemIcon(), icon.props.className),
          ...(active ? { 'data-active': true } : {})
        })}

      <span className={styles.tierHeaderLabel(hideLabels)}>{children}</span>

      {collapsible && (
        <CaretDownIcon
          aria-hidden="true"
          size={CaretDownIcon.sizes.small}
          className={styles.tierHeaderLabelIcon(Boolean(collapsed))}
        />
      )}
    </Tag>
  )
})

Tier1.Header = Tier1Header

Tier1.displayName = 'VerticalTabs.Tier1'
Tier1.Header.displayName = 'VerticalTabs.Tier1.Header'

interface Tier2Props extends Omit<React.ComponentProps<typeof Item>, 'header'> {
  header: React.ReactElement<typeof Tier1Header>
}

const Tier2: React.FC<Tier2Props> & {
  Header: typeof Tier2Header
} = props => {
  return <Item {...props} itemType="tier2" />
}

const Tier2Header = React.forwardRef<any, ItemHeaderProps>(
  ({ className, ...props }, ref) => {
    const hideLabels = useHideLabels()

    // NOTE: some props are given during clone that are not used as should not be
    //       passed to the underlying dom node
    const rest = omit(props as any, ['active', 'collapsed', 'collapsible'])
    const Tag: React.FC = wrapperProps =>
      rest.href ? (
        <a
          {...wrapperProps}
          ref={ref as RefFor<'a'>}
          className={classNames(styles.tier2Header(), className)}
        />
      ) : rest.onClick ? (
        <button
          {...wrapperProps}
          ref={ref as RefFor<'button'>}
          className={classNames(styles.tier2Header(), className)}
        />
      ) : (
        <span
          {...wrapperProps}
          ref={ref as RefFor<'span'>}
          className={classNames(styles.tier2Header(), className)}
        />
      )

    const hideItemProps =
      props.collapsed || hideLabels
        ? {
            'aria-hidden': 'true',
            tabIndex: -1
          }
        : {}

    return (
      <Tag {...rest} {...hideItemProps}>
        <span className={styles.tierHeaderLabel(hideLabels)}>
          {props.children}
        </span>
      </Tag>
    )
  }
)

Tier2.Header = Tier2Header

Tier2.displayName = 'VerticalTabs.Tier2'
Tier2.Header.displayName = 'VerticalTabs.Tier2.Header'

export default Item
export { Tier1, Tier2 }
