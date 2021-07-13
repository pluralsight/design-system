import { ValueOf, classNames } from '@pluralsight/ps-design-system-util'
import React from 'react'

import '../css/aside-layout.css'
import { asideLayout as vars } from '../vars/index'

interface AsideLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  main: React.ReactElement<typeof Main>
  aside: React.ReactElement<typeof Aside>
  asidePosition?: ValueOf<typeof vars.asidePositions>
}
interface AsideLayoutStatics {
  Aside: typeof Aside
  asidePositions: typeof vars.asidePositions
  Main: typeof Main
}
const AsideLayout: React.FC<AsideLayoutProps> & AsideLayoutStatics = props => {
  const {
    asidePosition = vars.asidePositions.first,
    aside,
    className,
    main,
    ...rest
  } = props
  return (
    <div
      {...rest}
      className={classNames(
        'psds-aside-layout',
        `psds-aside-layout--aside-position-${asidePosition}`,
        className
      )}
    >
      {React.cloneElement<AsideProps>(aside as any, {
        _asidePosition: asidePosition
      })}
      {main}
    </div>
  )
}

interface AsideProps extends React.HTMLAttributes<HTMLDivElement> {
  _asidePosition?: AsideLayoutProps['asidePosition']
}
const Aside: React.FC<AsideProps> = props => {
  const {
    _asidePosition: asidePositionFromParent = vars.asidePositions.first,
    children,
    className,
    ...rest
  } = props
  return (
    <div
      {...rest}
      className={classNames(
        'psds-aside-layout__aside',
        `psds-aside-layout__aside--aside-position-${asidePositionFromParent}`,
        className
      )}
    >
      {children}
    </div>
  )
}
Aside.displayName = 'AsideLayout.Aside'

const Main: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...rest
}) => (
  <div {...rest} className={classNames('psds-aside-layout__main', className)}>
    {rest.children}
  </div>
)
Main.displayName = 'AsideLayout.Main'

AsideLayout.displayName = 'AsideLayout'
AsideLayout.asidePositions = vars.asidePositions
AsideLayout.Aside = Aside
AsideLayout.Main = Main
export const asidePositions = vars.asidePositions
export default AsideLayout
