import * as PositionComponents from '@pluralsight/ps-design-system-position'
import {
  ValueOf,
  forwardRefWithAs,
  forwardRefWithStatics
} from '@pluralsight/ps-design-system-util'
import Menu from '@pluralsight/ps-design-system-menu'
import React from 'react'

import { Button } from './button'
import { Selected } from './selected'
import { useListbox, UseListboxProps } from './useListbox'
import * as vars from '../vars/index'

import '../css/index.css'

interface DefaultRenderOptionProps {
  value: React.ReactText
  label: React.ReactText
}

const defaultRenderOption = forwardRefWithAs<
  DefaultRenderOptionProps,
  'button'
>((props, ref) => {
  const { value, label } = props
  return (
    <Menu.Item value={{ value, label }} ref={ref}>
      {label}
      <Menu.Check />
    </Menu.Item>
  )
})

interface SelectProps extends UseListboxProps {
  options?: Array<{ value: React.ReactText; label: React.ReactText }>
  position?: ValueOf<typeof vars.positions>
  renderOption?: React.FC
}

const Select = forwardRefWithStatics<
  SelectProps,
  HTMLButtonElement,
  SelectStatics
>((props, ref) => {
  const {
    options = [],
    position = 'belowLeft',
    renderOption = defaultRenderOption,
    children,
    ...rest
  } = props
  const { buttonProps, selectedProps, menuProps, isOpen } = useListbox(
    rest,
    ref
  )

  const RenderOption = React.useMemo(() => renderOption, [renderOption])
  return (
    <PositionComponents.Position
      position={PositionComponents[position]}
      when={isOpen}
      show={
        <Menu
          origin={Menu.origins.topLeft}
          {...menuProps}
          className={'psds-select__menu'}
        >
          {children || options.map(i => <RenderOption key={i.value} {...i} />)}
        </Menu>
      }
    >
      <Button {...buttonProps}>
        <Selected {...selectedProps} />
      </Button>
    </PositionComponents.Position>
  )
})

interface SelectStatics {
  Button: typeof Button
  Selected: typeof Selected
  positions: typeof vars.positions
  sizes: typeof vars.sizes
}

export { useListbox } from './useListbox'
export type { UseListboxProps } from './useListbox'
export { useMenuRef } from './menuKeyEvents'

Select.Button = Button
Select.Selected = Selected
Select.sizes = vars.sizes
Select.positions = vars.positions

export default Select
