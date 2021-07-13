import { useTheme, names } from '@pluralsight/ps-design-system-theme'
import { ValueOf, classNames } from '@pluralsight/ps-design-system-util'
import React from 'react'

import ListItem from './list-item'
import '../../css/index.css'
import * as vars from '../../vars/index'

const styles = ({
  themeName,
  size,
  color,
  type
}: {
  themeName: ValueOf<typeof names>
  size: ValueOf<typeof vars.listSizes>
  color: ValueOf<typeof vars.textColors>
  type: ValueOf<typeof vars.listTypes>
}) => {
  const label = 'psds-text__list'
  return classNames(
    label,
    `psds-theme--${themeName}`,
    `${label}--size-${size}`,
    `${label}--color-${color}`,
    `${label}--type-${type}`
  )
}

interface ListStatics {
  types: typeof vars.listTypes
  sizes: typeof vars.listSizes
  colors: typeof vars.textColors
  Item: typeof ListItem
}

interface UnorderedListProps extends React.HTMLAttributes<HTMLUListElement> {
  type?: ValueOf<typeof vars.listTypes>
  size?: ValueOf<typeof vars.listSizes>
  color?: ValueOf<typeof vars.textColors>
}

interface OrderedListProps
  extends Omit<React.HTMLAttributes<HTMLOListElement>, 'type'> {
  type?: ValueOf<typeof vars.listTypes>
  size?: ValueOf<typeof vars.listSizes>
  color?: ValueOf<typeof vars.textColors>
}

type ListProps = UnorderedListProps | OrderedListProps

const List: React.FC<ListProps> & ListStatics = ({
  type = vars.listTypes.default,
  size = vars.listSizes.medium,
  color = vars.textColors.primary,
  className,
  ...rest
}) => {
  const themeName = useTheme()
  const Wrapper: React.FC = wrapperProps =>
    type === 'numbered' ? (
      <ol
        {...wrapperProps}
        className={classNames(
          styles({ themeName, type, size, color }),
          className
        )}
      />
    ) : (
      <ul
        {...wrapperProps}
        className={classNames(
          styles({ themeName, type, size, color }),
          className
        )}
      />
    )

  return <Wrapper {...rest} />
}

List.sizes = vars.listSizes
List.colors = vars.textColors
List.types = vars.listTypes
List.Item = ListItem

export const sizes = vars.listSizes
export const colors = vars.textColors

export default List
