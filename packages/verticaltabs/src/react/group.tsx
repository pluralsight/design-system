import {
  useTheme,
  names as themeNames
} from '@pluralsight/ps-design-system-theme'
import Collapsible from '@pluralsight/ps-design-system-collapsible'
import { CaretDownIcon } from '@pluralsight/ps-design-system-icon'
import {
  RefForwardingComponent,
  ValueOf,
  omit,
  classNames
} from '@pluralsight/ps-design-system-util'
import React from 'react'

import { List } from './list'
import '../css/index.css'

const styles = {
  groupHeader: (themeName: ValueOf<typeof themeNames>) =>
    classNames(`psds-verticaltabs__group__header`, `psds-theme--${themeName}`),

  groupButton: () => 'psds-verticaltabs__group__button',

  groupCollapsibleList: () =>
    classNames(
      'psds-verticaltabs__list',
      'psds-verticaltabs__group__collapsible-list'
    ),

  rotatable: (open: boolean) =>
    classNames(
      'psds-verticaltabs__rotatable',
      open && 'psds-verticaltabs__rotatable--is-open'
    ),

  headerLabel: () => 'psds-verticaltabs__header__label'
}

interface GroupProps extends React.HTMLAttributes<HTMLLIElement> {
  header?: React.ReactElement<typeof GroupHeader>
  startOpen?: boolean
}

interface GroupStatics {
  Header: typeof GroupHeader
}

interface GroupComponent
  extends RefForwardingComponent<GroupProps, HTMLLIElement, GroupStatics> {}

const Group = React.forwardRef((props, ref) => {
  const rest = omit(props as Record<string, any>, ['header', 'startOpen'])

  return (
    <li ref={ref} {...rest}>
      {props.header}

      <List>{props.children}</List>
    </li>
  )
}) as GroupComponent

interface GroupHeaderProps extends React.HTMLAttributes<HTMLElement> {
  tagName?: React.ElementType | keyof JSX.IntrinsicElements
}
const GroupHeader = React.forwardRef<any, GroupHeaderProps>((props, ref) => {
  const { children, className, tagName: Tag = 'h2', ...rest } = props
  const themeName = useTheme()

  return (
    <Tag
      {...rest}
      className={classNames(styles.groupHeader(themeName), className)}
      ref={ref}
    >
      <div>
        <span className={styles.headerLabel()}>{children}</span>
      </div>
    </Tag>
  )
})

Group.Header = GroupHeader

Group.displayName = 'VerticalTabs.Group'
Group.Header.displayName = 'VerticalTabs.Group.Header'

interface CollapsibleGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  groupButtonAriaLabel?: string
  header?: React.ReactElement<typeof CollapsibleGroupHeader>
  startOpen?: boolean
}

interface CollapsibleGroupStatics {
  Header: typeof CollapsibleGroupHeader
}

interface CollapsibleGroupComponent
  extends RefForwardingComponent<
    CollapsibleGroupProps,
    HTMLDivElement,
    CollapsibleGroupStatics
  > {}

const CollapsibleGroup = React.forwardRef((props, ref) => {
  const { children, header, startOpen, ...rest } = props
  const [open, setOpenState] = React.useState(startOpen)

  const toggle = () => {
    setOpenState(!open)
  }

  return (
    <div ref={ref} {...rest}>
      {React.isValidElement(header) &&
        React.cloneElement<CollapsibleGroupHeaderProps>(header as any, {
          toggle,
          open
        })}

      <Collapsible
        isOpen={open}
        tagName="ul"
        className={styles.groupCollapsibleList()}
      >
        {children}
      </Collapsible>
    </div>
  )
}) as CollapsibleGroupComponent

interface CollapsibleGroupHeaderProps
  extends React.HTMLAttributes<HTMLElement> {
  open?: boolean
  tagName?: React.ElementType | keyof JSX.IntrinsicElements
  toggle?: () => void
}
const CollapsibleGroupHeader = React.forwardRef<
  any,
  CollapsibleGroupHeaderProps
>((props, ref) => {
  const {
    children,
    className,
    open,
    tagName: Tag = 'h2',
    toggle,
    ...rest
  } = props
  const themeName = useTheme()

  return (
    <Tag
      {...rest}
      className={classNames(styles.groupHeader(themeName), className)}
      ref={ref}
    >
      <button
        className={styles.groupButton()}
        onClick={toggle}
        aria-expanded={open ? 'true' : 'false'}
      >
        <span className={styles.headerLabel()}>{children}</span>

        <CaretDownIcon
          aria-hidden="true"
          size={CaretDownIcon.sizes.small}
          className={styles.rotatable(Boolean(open))}
        />
      </button>
    </Tag>
  )
})

CollapsibleGroup.Header = CollapsibleGroupHeader

CollapsibleGroup.displayName = 'VerticalTabs.CollapsibleGroup'
CollapsibleGroup.Header.displayName = 'VerticalTabs.CollapsibleGroup.Header'

export { Group, CollapsibleGroup }
