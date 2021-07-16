import { CaretDownIcon } from '@pluralsight/ps-design-system-icon'
import { classNames } from '@pluralsight/ps-design-system-util'

import React from 'react'

import Context from './context'
import { Bar, Button } from './common'
import '../css/index.css'

export const HorzLayout: React.FC<
  React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLSpanElement>,
    HTMLSpanElement
  >
> = props => {
  const { icon, menu } = React.useContext(Context)
  const hasLabel = !!props.children

  return (
    <HorzContainer>
      <Button className={props.className}>
        <span
          className={classNames(
            'psds-navitem__horz-layout',
            menu && 'psds-navitem__horz-layout--menu'
          )}
        >
          {icon && <HorzIcon hasLabel={hasLabel}>{icon}</HorzIcon>}
          {hasLabel && <HorzLabel>{props.children}</HorzLabel>}
          {menu && <HorzCaret />}
        </span>
      </Button>

      <Bar />
    </HorzContainer>
  )
}
HorzLayout.displayName = 'NavItem.HorzLayout'

const HorzContainer: React.FC<React.HTMLAttributes<HTMLSpanElement>> =
  props => {
    return <span className={'psds-navitem__horz-container'} {...props} />
  }
HorzContainer.displayName = 'NavItem.HorzContainer'

const HorzCaret: React.FC<React.HTMLAttributes<HTMLSpanElement>> = props => {
  return (
    <span className={'psds-navitem__horz-caret'} {...props}>
      <CaretDownIcon size={CaretDownIcon.sizes.small} />
    </span>
  )
}
HorzCaret.displayName = 'NavItem.HorzCaret'

const HorzIcon: React.FC<{ hasLabel: boolean }> = props => {
  const { hasLabel, ...rest } = props
  return (
    <span
      className={classNames(
        'psds-navitem__horz-icon',
        !hasLabel && 'psds-navitem__horz-icon--icon-only'
      )}
      {...rest}
    />
  )
}
HorzIcon.displayName = 'NavItem.HorzIcon'

const HorzLabel: React.FC<React.HTMLAttributes<HTMLSpanElement>> = props => {
  return <span className={'psds-navitem__horz-label'} {...props} />
}
HorzLabel.displayName = 'NavItem.HorzLabel'
