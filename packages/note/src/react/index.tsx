import Avatar, {
  sizes as avatarSizes
} from '@pluralsight/ps-design-system-avatar'
import { useTheme } from '@pluralsight/ps-design-system-theme'
import { classNames } from '@pluralsight/ps-design-system-util'
import React from 'react'

import '../css/index.css'
interface NoteProps extends React.HTMLAttributes<HTMLDivElement> {
  actionBar?: React.ReactElement<typeof Action>[]
  actionBarVisible?: boolean
  avatar?:
    | React.ReactElement<typeof Avatar>
    | React.ReactElement<typeof AvatarLink>
  heading?: string | React.ReactElement
  message: React.ReactNode
  metadata?: React.ReactNode[]
  onMouseOut?: React.MouseEventHandler
  onMouseOver?: React.MouseEventHandler
}
interface NoteStatics {
  Action: typeof Action
  AvatarLink: typeof AvatarLink
  List: typeof NoteList
}

const Note: React.FC<NoteProps> & NoteStatics = props => {
  const {
    actionBar,
    actionBarVisible,
    avatar,
    heading,
    message,
    metadata,
    onMouseOut,
    onMouseOver,
    className,
    ...rest
  } = props
  const themeName = useTheme()
  const [isHovered, setIsHovered] = React.useState(false)

  const handleMouseOver = (evt: React.MouseEvent) => {
    setIsHovered(true)
    if (onMouseOver) onMouseOver(evt)
  }

  const handleMouseOut = (evt: React.MouseEvent) => {
    setIsHovered(false)
    if (onMouseOut) onMouseOut(evt)
  }

  const hasActions = Array.isArray(actionBar) && actionBar.length > 0
  const hasAside = !!avatar
  const hasHeading = !!heading
  const hasMetadata = Array.isArray(metadata) && metadata.length > 0

  const renderActionBar = hasActions ? (
    <div
      className={classNames(
        'psds-note__action-bar',
        `psds-theme--${themeName}`,
        (actionBarVisible || isHovered) &&
          `psds-note__action-bar--action-bar-visible`,
        hasMetadata && !hasHeading && 'psds-note__action-bar--meta-sibling'
      )}
    >
      {(actionBar || []).map((action, key) => {
        return React.cloneElement(action, { key })
      })}
    </div>
  ) : null

  return (
    <div
      className={classNames(className, 'psds-note', `psds-theme--${themeName}`)}
      {...rest}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      {hasAside && (
        <div className={'psds-note__aside'}>
          {React.cloneElement(avatar as React.ReactElement<any>, {
            size: avatarSizes.xSmall
          })}
        </div>
      )}

      <div
        className={classNames(
          'psds-note__contents',
          `psds-theme--${themeName}`
        )}
      >
        {hasHeading && (
          <div className={'psds-note__header'}>
            {heading && <div className={'psds-note__heading'}>{heading}</div>}
            {renderActionBar}
          </div>
        )}

        {message}

        <div className={'psds-note__footer'}>
          {hasMetadata && (
            <div
              className={classNames(
                'psds-note__metadata',
                `psds-theme--${themeName}`
              )}
            >
              {(metadata || []).map((datum: React.ReactNode, i) => {
                const hasNext = i < (metadata || []).length - 1

                return (
                  <React.Fragment key={`datum-${i}`}>
                    <span
                      className={classNames(
                        'psds-note__metadata-datum',
                        `psds-theme--${themeName}`
                      )}
                    >
                      {datum}
                    </span>
                    {hasNext && (
                      <span aria-hidden className={'psds-note__metadata-dot'}>
                        &middot;
                      </span>
                    )}
                  </React.Fragment>
                )
              })}
            </div>
          )}

          {!hasHeading && renderActionBar}
        </div>
      </div>
    </div>
  )
}
export default Note

const NoteList: React.FC<React.HTMLAttributes<HTMLOListElement>> = ({
  children,
  className,
  ...rest
}) => {
  const themeName = useTheme()
  return (
    <ol className={classNames(className, 'psds-note__list')} {...rest}>
      {React.Children.map(children, child => (
        <li
          className={classNames(
            'psds-note__list-item',
            `psds-theme--${themeName}`
          )}
        >
          {child}
        </li>
      ))}
    </ol>
  )
}
NoteList.displayName = 'Note.List'

interface ActionProps extends React.HTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode
  title: string
}
const Action = React.forwardRef<HTMLButtonElement, ActionProps>(
  (props, ref) => {
    const { icon, className, ...rest } = props
    const themeName = useTheme()
    return (
      <button
        ref={ref}
        className={classNames(
          className,
          'psds-note__action',
          `psds-theme--${themeName}`
        )}
        {...rest}
      >
        {icon}
      </button>
    )
  }
)
Action.displayName = 'Note.Action'

const AvatarLink: React.FC = props => {
  const link = props.children as React.ReactElement<any>
  const avatar = link.props.children

  return (
    <>
      {React.cloneElement(link, {
        children: React.cloneElement(avatar as React.ReactElement<any>, {
          size: avatarSizes.xSmall
        })
      })}
    </>
  )
}
AvatarLink.displayName = 'Note.AvatarLink'

Note.Action = Action
Note.AvatarLink = AvatarLink
Note.List = NoteList
