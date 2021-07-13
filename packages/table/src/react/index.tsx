import { useCollapsible } from '@pluralsight/ps-design-system-collapsible'
import {
  SortAscIcon,
  SortDescIcon,
  SortIcon
} from '@pluralsight/ps-design-system-icon'
import { useTheme } from '@pluralsight/ps-design-system-theme'
import { ValueOf, classNames } from '@pluralsight/ps-design-system-util'
import invariant from 'invariant'
import React from 'react'

import '../css/index.css'
import { alignments, sorts } from '../vars/index'
interface TableProps
  extends React.DetailedHTMLProps<
    React.TableHTMLAttributes<HTMLTableElement>,
    HTMLTableElement
  > {
  renderContainer?: typeof defaultRenderContainer
  scrollable?: boolean
}
interface TableStatics {
  Body: typeof TableBody
  Cell: typeof TableCell
  Drawer: typeof TableDrawer
  Head: typeof TableHead
  Header: typeof TableHeader
  Row: typeof TableRow
  alignments: typeof alignments
}
type TableComponent = React.ForwardRefExoticComponent<TableProps> & TableStatics

const Table = React.forwardRef<HTMLTableElement, TableProps>((props, ref) => {
  const {
    renderContainer = defaultRenderContainer,
    scrollable = false,
    className,
    ...rest
  } = props
  const themeName = useTheme()

  const containerRef = React.useRef<HTMLDivElement>(null)
  const Container = React.useMemo(() => renderContainer, [renderContainer])

  return (
    <Container
      ref={containerRef}
      className={classNames(
        className,
        `psds-theme--${themeName}`,
        'psds-table__container',
        scrollable && 'psds-table__container--scrollable'
      )}
      {...(scrollable && { role: 'region', tabIndex: 0 })}
    >
      <table
        role="grid"
        ref={ref}
        className={classNames('psds-table', `psds-theme--${themeName}`)}
        {...rest}
      />
    </Container>
  )
}) as TableComponent

const defaultRenderContainer = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>((props, ref) => <div ref={ref} {...props} />)

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>((props, ref) => {
  return <tbody ref={ref} {...props} />
})
TableBody.displayName = 'Table.Body'

interface TableCellProps extends React.HTMLAttributes<HTMLTableCellElement> {
  align?: ValueOf<typeof alignments>
  colSpan?: number
}
const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(
  (props, ref) => {
    const { align = alignments.left, className, ...rest } = props
    return (
      <td
        role="gridcell"
        ref={ref}
        className={classNames(
          className,
          'psds-table__cell',
          `psds-table__cell--align-${align}`
        )}
        {...rest}
      />
    )
  }
)
TableCell.displayName = 'Table.Cell'

const TableHead = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => {
  const themeName = useTheme()

  return (
    <thead
      ref={ref}
      className={classNames(
        className,
        'psds-table__head',
        `psds-theme--${themeName}`
      )}
      {...props}
    />
  )
})
TableHead.displayName = 'Table.Head'

interface TableHeaderProps
  extends React.HTMLAttributes<HTMLTableHeaderCellElement> {
  align?: ValueOf<typeof alignments>
  role: 'columnheader' | 'rowheader'
  scope: 'col' | 'row'
  sort?: boolean | ValueOf<typeof sorts>
  sticky?: boolean
  title?: string
}
const TableHeader = React.forwardRef<
  HTMLTableHeaderCellElement,
  TableHeaderProps
>((props, ref) => {
  const {
    align = alignments.left,
    className,
    children,
    sort,
    sticky = false,
    title,
    ...rest
  } = props
  const sortable = isDefined(sort)
  const sorted = !isBoolean(sort)
  const themeName = useTheme()

  if (sortable) {
    const msg =
      'Missing title prop in Table.Header. A title is required when the header is sortable.'

    invariant(title, msg)
  }

  const ariaSort = React.useMemo(() => {
    if (!sorted) return 'none'
    return sort === sorts.asc ? 'ascending' : 'descending'
  }, [sort, sorted])

  const ariaLabel = React.useMemo(() => {
    const options = {
      ascending: 'Ascending sort applied',
      descending: 'Descending sort applied',
      none: 'No sort applied'
    }

    return `${title || ''}: ${options[ariaSort]}`
  }, [ariaSort, title])

  const Icon = React.useMemo(() => {
    const options = {
      ascending: SortAscIcon,
      descending: SortDescIcon,
      none: SortIcon
    }

    return options[ariaSort]
  }, [ariaSort])
  return (
    <th
      ref={ref}
      title={title}
      className={classNames(
        className,
        `psds-theme--${themeName}`,
        'psds-table__header',
        `psds-table__header--align-${align}`,
        sortable && 'psds-table__header--sortable',
        sticky && 'psds-table__header--sticky'
      )}
      {...(sortable && {
        'aria-label': ariaLabel,
        'aria-sort': ariaSort,
        tabIndex: 0
      })}
      {...rest}
    >
      <div>
        {children}
        {sortable && (
          <Icon aria-hidden className={'psds-table__header__sort-icon'} />
        )}
      </div>
    </th>
  )
})
TableHeader.displayName = 'Table.Header'

interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  expanded?: boolean
  selected?: boolean
}
const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(
  (props, ref) => {
    const { expanded = true, selected = false, className, ...rest } = props
    const themeName = useTheme()
    const collapsed = !expanded

    return (
      <tr
        role="row"
        ref={ref}
        className={classNames(
          className,
          `psds-theme--${themeName}`,
          `psds-table__row`,
          collapsed && 'psds-table__row--collapsed',
          selected && `psds-table__row--selected`
        )}
        {...rest}
      />
    )
  }
)
TableRow.displayName = 'Table.Row'

interface TableDrawerProps
  extends Omit<React.HTMLAttributes<HTMLTableRowElement>, 'ref'> {
  expanded: boolean
  colSpan: number
  indentWithCell?: boolean
}
const TableDrawer = React.forwardRef<HTMLTableRowElement, TableDrawerProps>(
  (props, ref) => {
    const {
      expanded,
      colSpan,
      children,
      indentWithCell = true,
      className,
      ...rest
    } = props
    const { 'aria-hidden': ariaHidden, ref: inner } = useCollapsible(expanded)

    const cSpan = indentWithCell ? colSpan - 1 : colSpan
    return (
      <TableRow
        aria-hidden={ariaHidden}
        expanded={expanded}
        ref={ref}
        {...rest}
        className={classNames(className, 'psds-table__drawer')}
      >
        {indentWithCell && <TableCell className={'psds-table__drawer__cell'} />}

        <TableCell colSpan={cSpan} className={'psds-table__drawer__cell'}>
          <div ref={inner} className={'psds-table__drawer__inner'}>
            {children}
          </div>
        </TableCell>
      </TableRow>
    )
  }
)
TableDrawer.displayName = 'Table.Drawer'

Table.Body = TableBody
Table.Cell = TableCell
Table.Head = TableHead
Table.Header = TableHeader
Table.Row = TableRow
Table.Drawer = TableDrawer

Table.alignments = alignments

const isBoolean = (val: unknown) => typeof val === 'boolean'
const isDefined = (val: unknown) => typeof val !== 'undefined'

export default Table
