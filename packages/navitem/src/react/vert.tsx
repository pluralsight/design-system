import { CaretDownIcon } from '@pluralsight/ps-design-system-icon'
import { classNames } from '@pluralsight/ps-design-system-util'

import React from 'react'

import Context from './context'
import { Bar, Button } from './common'
import '../css/index.css'

export const VertLayout: React.FC<
  React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLSpanElement>,
    HTMLSpanElement
  >
> = props => {
  const { icon, menu } = React.useContext(Context)

  return (
    <VertContainer>
      <Button className={props.className}>
        <span className={'psds-navitem__vert-layout'}>
          {icon && <VertIcon>{icon}</VertIcon>}
          {props.children && <VertLabel>{props.children}</VertLabel>}
          {menu && <VertCaret />}
        </span>
      </Button>

      <Bar />
    </VertContainer>
  )
}
VertLayout.displayName = 'NavItem.VertLayout'

const VertContainer: React.FC<React.HTMLAttributes<HTMLSpanElement>> =
  props => {
    return <span className={'psds-navitem__vert-container'} {...props} />
  }
VertContainer.displayName = 'NavItem.VertContainer'

const VertCaret: React.FC<React.HTMLAttributes<HTMLSpanElement>> = props => {
  return (
    <span className={'psds-navitem__vert-caret'} {...props}>
      <CaretDownIcon size={CaretDownIcon.sizes.small} />
    </span>
  )
}
VertCaret.displayName = 'NavItem.VertCaret'

const VertIcon: React.FC = props => {
  return <span className={'psds-navitem__vert-icon'} {...props} />
}
VertIcon.displayName = 'NavItem.VertIcon'

const VertLabel: React.FC<React.HTMLAttributes<HTMLSpanElement>> = props => {
  return <span className={'psds-navitem__vert-label'} {...props} />
}
VertLabel.displayName = 'NavItem.VertLabel'
