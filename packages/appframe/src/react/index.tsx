import Button from '@pluralsight/ps-design-system-button'
import { breakpoints } from '@pluralsight/ps-design-system-core'
import Scrollable from '@pluralsight/ps-design-system-scrollable'
import Theme, { useTheme } from '@pluralsight/ps-design-system-theme'
import {
  RefForwardingComponent,
  ValueOf,
  canUseDOM,
  classNames,
  isFunction,
  useMatchMedia,
  usePrevious
} from '@pluralsight/ps-design-system-util'
import polyfillFocusWithin from 'focus-within'
import React from 'react'

import '../css/index.css'
import polyfillElementClosest from '../js/polyfill-element-closest'
import useBodyScrollLock from './use-body-scroll-lock'
import useOnClickOutside from './use-on-click-outside'
import useOnEscape from './use-on-escape'
import useOnInnerFocus from './use-on-inner-focus'
import * as vars from '../vars/index'

if (canUseDOM()) {
  polyfillElementClosest()
  polyfillFocusWithin(document)
}

const SKIP_TARGET_ID = 'ps-appframe--skip-target'
const TOP_NAV_ID = 'ps-appframe--topnav'

interface AppFrameContextValue {
  closeSidenav: () => void
  openSidenav: () => void
  sidenavOpen: boolean | undefined
  sidenavVariant: ValueOf<typeof vars.sidenavVariants>
}
const AppFrameContext = React.createContext<AppFrameContextValue>({
  closeSidenav: () => {},
  openSidenav: () => {},
  sidenavOpen: undefined,
  sidenavVariant: vars.sidenavVariants.closed
})

type RenderProp<P extends Record<string, unknown>> = (
  props: P
) => React.ReactNode

interface AppFrameProps extends React.HTMLAttributes<HTMLDivElement> {
  onRequestSideNavClose?: () => void
  onRequestSideNavOpen?: () => void
  sidenav?: React.ReactNode | RenderProp<{ visible: boolean }>
  sidenavOpen?: boolean
  topnav?:
    | React.ReactNode
    | RenderProp<
        Pick<
          AppFrameContextValue,
          'closeSidenav' | 'openSidenav' | 'sidenavOpen'
        >
      >
}
interface AppFrameStatics {
  SideNav: typeof SideNav
  TopNav: typeof TopNav
}

interface AppFrameComponent
  extends RefForwardingComponent<
    AppFrameProps,
    HTMLDivElement,
    AppFrameStatics
  > {}

const AppFrame = React.forwardRef((props, forwardedRef) => {
  const {
    children,
    className,
    onRequestSideNavClose,
    onRequestSideNavOpen,
    sidenav,
    sidenavOpen: initialSidenavOpen,
    topnav,
    ...rest
  } = props

  const ref = React.useRef<HTMLDivElement>(null)
  React.useImperativeHandle(
    forwardedRef,
    () => ref.current as unknown as HTMLDivElement
  )

  const themeName = useTheme()

  const smallMedia = useMatchMedia(`(min-width: ${breakpoints.small})`)
  const largeMedia = useMatchMedia(`(min-width: ${breakpoints.large})`)
  const prevLargeMedia = usePrevious(largeMedia)

  const defaultSidenavOpen = React.useMemo(() => {
    const controlled = typeof initialSidenavOpen !== 'undefined'
    return controlled ? initialSidenavOpen : largeMedia
  }, [initialSidenavOpen, largeMedia])

  const [sidenavOpen, setSidenavOpen] = React.useState(defaultSidenavOpen)

  const closeSidenav = React.useCallback(() => {
    const controlled = typeof props.sidenavOpen !== 'undefined'

    if (controlled && isFunction(onRequestSideNavClose)) onRequestSideNavClose()
    else if (!controlled) setSidenavOpen(false)
  }, [props.sidenavOpen, onRequestSideNavClose])

  const openSidenav = React.useCallback(() => {
    const controlled = typeof props.sidenavOpen !== 'undefined'

    if (controlled && isFunction(onRequestSideNavOpen)) onRequestSideNavOpen()
    else if (!controlled) setSidenavOpen(true)
  }, [props.sidenavOpen, onRequestSideNavOpen])

  React.useEffect(() => {
    const enteringXLarge = prevLargeMedia !== largeMedia && largeMedia
    if (enteringXLarge) openSidenav()
  }, [prevLargeMedia, largeMedia, openSidenav])

  React.useEffect(() => {
    const controlled = typeof props.sidenavOpen !== 'undefined'
    const next = controlled ? props.sidenavOpen : defaultSidenavOpen

    setSidenavOpen(next)
  }, [props.sidenavOpen, defaultSidenavOpen])

  const sidenavVariant = React.useMemo(() => {
    const { sidenavVariants: variants } = vars

    if (!sidenav) return variants.closed

    if (sidenavOpen) {
      return largeMedia ? variants.open : variants.overlay
    } else {
      return smallMedia ? variants.minimized : variants.closed
    }
  }, [sidenav, sidenavOpen, smallMedia, largeMedia])

  const skipTargetRef = React.useRef<HTMLAnchorElement>(null)

  const focusSkipTarget = React.useCallback(() => {
    if (!skipTargetRef.current) return

    skipTargetRef.current.focus()
  }, [])

  const contextValue = {
    closeSidenav,
    openSidenav,
    sidenavOpen,
    sidenavVariant
  }

  // TODO: className specs
  return (
    <AppFrameContext.Provider value={contextValue}>
      <div
        ref={ref}
        {...rest}
        className={classNames(
          'psds-appframe',
          `psds-theme--${themeName}`,
          className
        )}
      >
        <SkipBanner href={'#' + SKIP_TARGET_ID} />

        <TopNav id={TOP_NAV_ID}>{topnav}</TopNav>

        <Container>
          {sidenav && <SideNav>{sidenav}</SideNav>}

          <main className="psds-appframe__content">
            <SkipTarget
              id={SKIP_TARGET_ID}
              onClick={focusSkipTarget}
              ref={skipTargetRef}
            />

            {children}
          </main>
        </Container>
      </div>
    </AppFrameContext.Provider>
  )
}) as AppFrameComponent

AppFrame.displayName = 'AppFrame'

// TODO: why is there a an href here?
interface SkipBannerProps extends React.HTMLAttributes<HTMLDivElement> {
  href: string
}
const SkipBanner: React.FC<SkipBannerProps> = props => {
  return (
    <Theme name={Theme.names.dark}>
      <div {...props} className="psds-appframe__skip-banner">
        <Button
          appearance={Button.appearances.secondary}
          size={Button.sizes.small}
          tabIndex={0}
        >
          skip to main content
        </Button>
      </div>
    </Theme>
  )
}

interface SkipTargetProps extends React.HTMLAttributes<HTMLAnchorElement> {
  id: string
}
const SkipTarget = React.forwardRef<HTMLAnchorElement, SkipTargetProps>(
  (props, ref) => {
    return <a ref={ref} tabIndex={-1} {...props} />
  }
)

SkipTarget.displayName = 'SkipTarget'

const Container: React.FC<React.HTMLAttributes<HTMLDivElement>> = props => {
  const context = React.useContext(AppFrameContext)
  return (
    <div
      {...props}
      className={classNames(
        'psds-appframe__container',
        context.sidenavVariant &&
          `psds-appframe__container--${context.sidenavVariant}`
      )}
    />
  )
}

interface SideNavProps extends React.HTMLAttributes<HTMLDivElement> {
  children: AppFrameProps['sidenav']
}
interface SideNavStatics {
  variants: typeof vars.sidenavVariants
}
const SideNav: React.FC<SideNavProps> & SideNavStatics = ({
  className,
  ...rest
}) => {
  const { sidenavVariants: variants } = vars
  const children = rest.children as SideNavProps['children']

  const { closeSidenav, openSidenav, sidenavVariant } =
    React.useContext(AppFrameContext)

  const hoverable = sidenavVariant === variants.minimized
  const [hovered, setHovered] = React.useState(false)

  const variant = hoverable && hovered ? variants.overlay : sidenavVariant
  const visible = variant === variants.overlay || variant === variants.open

  const ref = React.useRef<HTMLDivElement>(null)

  const overlayed = variant === variants.overlay
  useBodyScrollLock(ref, overlayed)

  const closeIfOverlayed = React.useCallback(() => {
    if (overlayed) closeSidenav()
  }, [overlayed, closeSidenav])

  useOnClickOutside(ref, evt => {
    const target = evt.target as HTMLElement
    const inTopNav = target && !!target.closest(`#${TOP_NAV_ID}`)
    if (!inTopNav) closeIfOverlayed()
  })
  useOnEscape(closeIfOverlayed)
  useOnInnerFocus(ref, { onEnter: openSidenav, onLeave: closeIfOverlayed })

  return (
    <Theme name={Theme.names.dark}>
      <div
        ref={ref}
        {...rest}
        className={classNames(
          'psds-appframe__sidenav',
          variant && `psds-appframe__sidenav--${variant}`,
          className
        )}
        {...(hoverable && {
          onMouseEnter: () => setHovered(true),
          onMouseLeave: () => setHovered(false)
        })}
      >
        <div className="psds-appframe__sidenav__overflow-mask">
          <Scrollable className="psds-appframe__sidenav__inner">
            {typeof children === 'function' ? children({ visible }) : children}
          </Scrollable>
        </div>
      </div>
    </Theme>
  )
}

SideNav.variants = vars.sidenavVariants

interface TopNavProps extends React.HTMLAttributes<HTMLDivElement> {
  children: AppFrameProps['topnav']
}

const TopNav: React.FC<TopNavProps> = ({ className, ...rest }) => {
  const children = rest.children as TopNavProps['children']
  const { closeSidenav, openSidenav, sidenavOpen } =
    React.useContext(AppFrameContext)

  const meta = { closeSidenav, openSidenav, sidenavOpen }

  return (
    <Theme name={Theme.names.dark}>
      <div {...rest} className={classNames('psds-appframe__topnav', className)}>
        {isFunction<[typeof meta], React.ReactNode>(children)
          ? children(meta)
          : children}
      </div>
    </Theme>
  )
}

AppFrame.SideNav = SideNav
AppFrame.SideNav.displayName = 'AppFrame.SideNav'

AppFrame.TopNav = TopNav
AppFrame.TopNav.displayName = 'AppFrame.TopNav'

export default AppFrame
