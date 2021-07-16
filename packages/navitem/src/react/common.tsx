import Halo from '@pluralsight/ps-design-system-halo'
import { classNames } from '@pluralsight/ps-design-system-util'
import React from 'react'

import Context from './context'
import '../css/index.css'
import { alignments } from '../vars/index'

export const Bar: React.FC<React.HTMLAttributes<HTMLDivElement>> = props => {
  // eslint-disable-next-line camelcase
  const { alignment, selected } = React.useContext(Context)
  const isHorz = alignment === alignments.horizontal
  const isVert = alignment === alignments.vertical
  return (
    <div
      className={classNames(
        'psds-navitem__bar',
        isHorz && 'psds-navitem__horz-bar',
        isVert && 'psds-navitem__vert-bar',
        selected && 'psds-navitem__bar--selected'
      )}
      {...props}
    />
  )
}

export const Button: React.FC<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >
> = props => {
  const { renderContainer, ref, selected, rest } = React.useContext(Context)
  const Container = React.useMemo(() => renderContainer, [renderContainer])

  return (
    <Halo inline gapSize={Halo.gapSizes.small}>
      <Container
        className={classNames(
          props.className,
          'psds-navitem__button',
          selected && 'psds-navitem__button--selected'
        )}
        ref={ref}
        {...rest}
      >
        {props.children}
      </Container>
    </Halo>
  )
}
