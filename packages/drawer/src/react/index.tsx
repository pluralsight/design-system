import { useCollapsible } from '@pluralsight/ps-design-system-collapsible'
import { CaretDownIcon } from '@pluralsight/ps-design-system-icon'
import ScreenReaderOnly from '@pluralsight/ps-design-system-screenreaderonly'
import { useTheme } from '@pluralsight/ps-design-system-theme'
import {
  classNames,
  useToggle,
  RefFor
} from '@pluralsight/ps-design-system-util'
import React from 'react'

import '../css/index.css'

interface DrawerContextValue {
  isOpen: boolean
  onToggle: () => unknown
}
const initialValue = {
  isOpen: false,
  onToggle: () => {}
}

const DrawerContext = React.createContext<DrawerContextValue>(initialValue)

export const useDrawerContext = () => {
  const context = React.useContext(DrawerContext)
  if (!context) {
    throw new Error(
      `Drawer compound components cannot be rendered outside the Drawer component`
    )
  }
  return context
}

interface SummaryProps extends React.HTMLAttributes<HTMLDivElement> {}
const Summary = React.forwardRef<HTMLDivElement, SummaryProps>(
  ({ children, className, ...rest }, ref) => {
    const themeName = useTheme()
    const { isOpen, onToggle } = useDrawerContext()
    return (
      <div
        className={classNames(
          `psds-drawer__summary`,
          isOpen && 'psds-drawer--is-open',
          `psds-theme--${themeName}`,
          className
        )}
        onClick={onToggle}
        ref={ref}
        role="button"
        aria-expanded={isOpen}
        {...rest}
      >
        {children}
        <div className="psds-drawer__icon-slot">
          <CaretDownIcon
            className={classNames(
              'psds-drawer__rotatable',
              `psds-theme--${themeName}`,
              isOpen && 'psds-drawer--is-open'
            )}
          />
          <ScreenReaderOnly>
            {isOpen ? 'Expanded' : 'Collapsed'}
          </ScreenReaderOnly>
        </div>
      </div>
    )
  }
)

interface DetailsProps extends React.HTMLAttributes<HTMLDivElement> {}
const Details = React.forwardRef<HTMLDivElement, DetailsProps>(
  ({ className, ...rest }, forwardedRef) => {
    const themeName = useTheme()
    const { isOpen } = useDrawerContext()
    const { 'aria-hidden': ariaHidden, ref } = useCollapsible(isOpen)
    React.useImperativeHandle(
      forwardedRef,
      () =>
        (ref as unknown as RefFor<'div'>).current as unknown as HTMLDivElement
    )
    return (
      <div
        aria-hidden={ariaHidden}
        ref={ref}
        {...rest}
        className={classNames(
          'psds-drawer__details',
          `psds-theme--${themeName}`,
          className
        )}
      />
    )
  }
)

interface DrawerStatics {
  Summary: typeof Summary
  Details: typeof Details
}

interface DrawerProps {
  isOpen?: boolean
  onToggle?: () => unknown
}

const Drawer: React.FC<DrawerProps> & DrawerStatics = ({
  children,
  isOpen,
  onToggle
}) => {
  const value = useToggle({ isOpen, onToggle })
  return (
    <DrawerContext.Provider value={value}>{children}</DrawerContext.Provider>
  )
}

Summary.displayName = 'Drawer.Summary'

Details.displayName = 'Drawer.Details'

Drawer.displayName = 'Drawer'
Drawer.Summary = Summary
Drawer.Details = Details

export default Drawer
