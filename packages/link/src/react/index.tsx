import { useTheme } from '@pluralsight/ps-design-system-theme'
import {
  classNames,
  RefForwardingComponent,
  ValueOf
} from '@pluralsight/ps-design-system-util'
import React from 'react'

import '../css/index.css'
import { appearances } from '../vars/index'

interface LinkStatics {
  appearances: typeof appearances
}

interface Props
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  > {
  appearance?: string
}
interface LinkComponent
  extends RefForwardingComponent<Props, HTMLAnchorElement, LinkStatics> {}

const Link = React.forwardRef<HTMLAnchorElement, Props>(
  (props, forwardedRef) => {
    const {
      appearance = appearances.default,
      children: _children,
      className,
      ...rest
    } = props
    const ref = React.useRef<HTMLAnchorElement>()
    React.useImperativeHandle(
      forwardedRef,
      () => ref.current as unknown as HTMLAnchorElement
    )
    const themeName = useTheme()

    return React.cloneElement(
      React.Children.only(props.children as React.ReactElement),
      {
        ref: ref,
        className: classNames(
          className,
          'psds-link',
          `psds-link--appearance-${appearance}`,
          appearance === appearances.default && `psds-theme--${themeName}`
        ),
        ...rest
      }
    )
  }
) as LinkComponent

Link.appearances = appearances

export { appearances }

export default Link
