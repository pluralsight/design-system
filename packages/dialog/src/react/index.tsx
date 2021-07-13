import FocusManager from '@pluralsight/ps-design-system-focusmanager'
import Theme from '@pluralsight/ps-design-system-theme'
import {
  RefForwardingComponent,
  ValueOf,
  classNames,
  createUniversalPortal,
  dashify,
  isFunction,
  usePortal
} from '@pluralsight/ps-design-system-util'
import React from 'react'

import '../css/index.css'
import * as vars from '../vars/index'

/* eslint-disable-next-line camelcase */
const MODAL_OVERLAY_ID = 'psds-dialog__overlay'

const CloseButton: React.FC<React.HTMLAttributes<HTMLButtonElement>> =
  props => (
    <button {...props} className="psds-dialog__close" aria-label="Close dialog">
      <svg
        aria-label="close icon"
        role="img"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M18 7.41L16.59 6 12 10.59 7.41 6 6 7.41 10.59 12 6 16.59 7.41 18 12 13.41 16.59 18 18 16.59 13.41 12" />
      </svg>
    </button>
  )

interface OverlayProps extends React.HTMLAttributes<HTMLDivElement> {
  'aria-label'?: string
  disableCloseOnOverlayClick?: boolean
  onClose?: (evt: React.MouseEvent) => void
}

const Overlay: React.FC<OverlayProps> = ({
  disableCloseOnOverlayClick,
  onClose,
  ...props
}) => {
  function handleOverlayClick(evt: React.MouseEvent) {
    if (disableCloseOnOverlayClick) return
    if ((evt.target as HTMLDivElement).id === MODAL_OVERLAY_ID)
      onClose && onClose(evt)
  }

  return (
    <div
      {...props}
      className="psds-dialog__overlay"
      id={MODAL_OVERLAY_ID}
      onClick={handleOverlayClick}
      role="region"
    />
  )
}

export interface DialogStatics {
  tailPositions: typeof vars.tailPositions
}
export interface DialogProps extends React.HTMLAttributes<HTMLDivElement> {
  'aria-label'?: string
  disableCloseButton?: boolean
  disableCloseOnEscape?: boolean
  disableCloseOnOverlayClick?: boolean
  disableFocusOnMount?: boolean
  modal?: boolean
  onClose?: (evt: React.KeyboardEvent | React.MouseEvent) => void
  tailPosition?: ValueOf<typeof vars.tailPositions>
  returnFocus?: boolean
}

export interface DialogComponent
  extends RefForwardingComponent<DialogProps, HTMLDivElement, DialogStatics> {}

const Dialog = React.forwardRef((props, ref) => {
  const {
    children,
    className,
    disableCloseButton = false,
    disableCloseOnEscape = false,
    disableCloseOnOverlayClick = false,
    disableFocusOnMount = false,
    onClose,
    modal = false,
    returnFocus = true,
    tailPosition,
    ...rest
  } = props

  const autofocus = !disableFocusOnMount
  const trapped = !!modal || !!onClose
  const closeOnEscape = isFunction(onClose) && !disableCloseOnEscape

  const portal = usePortal() as React.MutableRefObject<HTMLDivElement>

  // TODO: combine fns
  function handleKeyUp(evt: React.KeyboardEvent) {
    if (!isEscape(evt)) return
    onClose && onClose(evt)
  }

  const content = (
    <FocusManager
      {...rest}
      className={classNames(
        'psds-dialog',
        modal && 'psds-dialog--modal',
        typeof tailPosition !== 'undefined' &&
          `psds-dialog--with-tail psds-dialog--tail-position-${dashify(
            tailPosition
          )}`,
        className
      )}
      {...(closeOnEscape && { onKeyUp: handleKeyUp })}
      {...(modal && { 'aria-label': undefined })}
      autofocus={autofocus}
      trapped={trapped}
      returnFocus={returnFocus}
      ref={ref}
    >
      <Theme name={Theme.names.light}>
        <div className="psds-dialog__content">
          {!disableCloseButton && isFunction(onClose) && (
            // eslint-disable-next-line react/jsx-handler-names
            <CloseButton onClick={onClose} />
          )}

          {children}
        </div>
      </Theme>
    </FocusManager>
  )

  return (
    <>
      {modal
        ? createUniversalPortal(
            <Overlay
              aria-label={rest['aria-label']}
              disableCloseOnOverlayClick={disableCloseOnOverlayClick}
              onClose={onClose}
            >
              {content}
            </Overlay>,
            portal.current
          )
        : content}
    </>
  )
}) as DialogComponent

Dialog.displayName = 'Dialog'

Dialog.tailPositions = vars.tailPositions
export const tailPositions = Dialog.tailPositions

export default Dialog

function isEscape(evt: React.KeyboardEvent) {
  return evt.key === 'Escape'
}
