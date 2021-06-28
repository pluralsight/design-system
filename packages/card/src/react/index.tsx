// TODO: remove when IE desupported
import polyfillFocusWithin from 'focus-within'

import Icon, { sizes as iconSizes } from '@pluralsight/ps-design-system-icon'
import {
  names as themeNames,
  useTheme
} from '@pluralsight/ps-design-system-theme'
import {
  RefForwardingComponent,
  ValueOf,
  canUseDOM,
  classNames
} from '@pluralsight/ps-design-system-util'
import React from 'react'
import Shiitake from 'shiitake'

import '../css/index.css'
import { toPercentageString } from '../js/index'
import * as vars from '../vars/index'

if (canUseDOM()) polyfillFocusWithin(document)

const styles = {
  actionBar: ({
    actionBarVisible,
    fullOverlay
  }: {
    actionBarVisible?: boolean
    fullOverlay?: boolean
  }) => {
    return classNames(
      'psds-card__action-bar',
      fullOverlay && 'psds-card__action-bar--fullOverlay',
      actionBarVisible
        ? 'psds-card__action-bar--actionBarVisible'
        : 'psds-card__action-bar--no-actionBarVisible'
    )
  },
  actionButton: (disabled?: boolean) => {
    return classNames(
      'psds-card__action-bar__button',
      disabled && 'psds-card__action-bar__button--disabled'
    )
  },

  bonusBar: () => 'psds-card__bonus-bar',

  card: () => 'psds-card',

  fullOverlay: (fullOverlayVisible?: boolean) => {
    return classNames(
      'psds-card__full-overlay',
      fullOverlayVisible && 'psds-card__full-overlay--fullOverlayVisible'
    )
  },
  fullOverlayLink: () => 'psds-card__full-overlay-link',

  image: () => 'psds-card__image',
  imageLink: () => 'psds-card__image-link',

  metadata: (
    size: ValueOf<typeof vars.sizes>,
    themeName: ValueOf<typeof themeNames>
  ) => {
    return classNames(
      'psds-card__metadata',
      `psds-card__metadata--size-${size}`,
      `psds-card__metadata--theme-${themeName}`
    )
  },
  metadataDatum: () => 'psds-card__metadata__datum',
  metadataDot: () => 'psds-card__metadata__dot',

  overlays: (size: ValueOf<typeof vars.sizes>) => {
    return classNames(
      'psds-card__overlays',
      `psds-card__overlays--size-${size}`
    )
  },

  progress: () => 'psds-card__progress',
  progressBar: (progress: number) => {
    return classNames(
      'psds-card__progress__bar',
      progress === 100 && 'psds-card__progress__bar--complete'
    )
  },

  tag: () => 'psds-card__tag',
  tagIcon: () => 'psds-card__tag__icon',
  tagText: () => 'psds-card__tag__text',

  textLink: (themeName: ValueOf<typeof themeNames>) => {
    return classNames(
      'psds-card__text-link',
      `psds-card__text-link--theme-${themeName}`
    )
  },

  title: (themeName: ValueOf<typeof themeNames>) => {
    return classNames(
      'psds-card__title',
      `psds-card__title--theme-${themeName}`
    )
  },

  titleContainer: (size: ValueOf<typeof vars.sizes>) => {
    return classNames(
      'psds-card__title-container',
      `psds-card__title-container--size-${size}`
    )
  }
}

interface ActionBarActionProps extends React.HTMLAttributes<HTMLButtonElement> {
  disabled?: boolean
  icon?: React.ReactElement<typeof Icon>
  title: string
}
interface ActionBarActionStatics {}
interface ActionBarActionComponent
  extends RefForwardingComponent<
    ActionBarActionProps,
    HTMLButtonElement,
    ActionBarActionStatics
  > {}
// TODO: come back and do className override tests for all sub-components
const ActionBarAction = React.forwardRef((props, ref) => {
  const { title, icon, ...rest } = props
  const ariaLabel = props['aria-label'] || title
  return (
    <button
      {...rest}
      aria-label={ariaLabel}
      className={styles.actionButton(props.disabled)}
      ref={ref}
      title={title}
    >
      {icon}
    </button>
  )
}) as ActionBarActionComponent
ActionBarAction.displayName = 'Card.Action'

const FullOverlayLink: React.FC<
  React.HTMLAttributes<HTMLSpanElement>
> = props => <span className={styles.fullOverlayLink()} {...props} />

FullOverlayLink.displayName = 'Card.FullOverlayLink'

interface ImageProps extends React.HTMLAttributes<HTMLDivElement> {
  alt?: string
  src: string
}
const Image: React.FC<ImageProps> = props => {
  const { src, ...rest } = props
  return (
    <div
      {...rest}
      className={styles.image()}
      aria-label={rest['aria-label'] || rest.alt}
      style={{ backgroundImage: `url(${src})` }}
    />
  )
}
Image.displayName = 'Card.Image'

const ImageLink: React.FC<React.HTMLAttributes<HTMLSpanElement>> = props => (
  <span className={styles.imageLink()} {...props} />
)
ImageLink.displayName = 'Card.ImageLink'

interface TagProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactElement<typeof Icon>
}
const Tag: React.FC<TagProps> = ({ children, icon, ...rest }) => (
  <div {...rest} className={styles.tag()}>
    {icon && (
      <div className={styles.tagIcon()}>
        {
          /* eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion */
          React.cloneElement(icon as React.ReactElement<any>, {
            size: iconSizes.small
          })
        }
      </div>
    )}

    <span className={styles.tagText()}>{children}</span>
  </div>
)

Tag.displayName = 'Card.Tag'

const Text: React.FC<React.HTMLAttributes<HTMLSpanElement>> = props => (
  <span {...props} />
)
Text.displayName = 'Card.Text'

const TextLink: React.FC<React.HTMLAttributes<HTMLSpanElement>> = props => {
  const themeName = useTheme()
  return <span className={styles.textLink(themeName)} {...props} />
}
TextLink.displayName = 'Card.TextLink'

const Title: React.FC<React.HTMLAttributes<HTMLDivElement>> = props => {
  const themeName = useTheme()
  const { children, ...rest } = props

  return (
    <div {...rest} className={styles.title(themeName)}>
      <Shiitake lines={2}>{children}</Shiitake>
    </div>
  )
}
Title.displayName = 'Card.Title'

interface MetaDataProps {
  metadata: (string | React.ReactElement<typeof TextLink>)[]
  size: ValueOf<typeof vars.sizes>
}
const MetaData: React.FC<MetaDataProps> = props => {
  const { metadata, size, ...rest } = props
  const themeName = useTheme()
  return (
    <div {...rest} className={styles.metadata(size, themeName)}>
      {metadata.map((m, i) => [
        <span key={`datum${i}`} className={styles.metadataDatum()}>
          {m}
        </span>,
        i < metadata.length - 1 && (
          <span aria-hidden key={`dot${i}`} className={styles.metadataDot()}>
            ·
          </span>
        )
      ])}
    </div>
  )
}

export interface CardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  actionBar?: React.ReactElement<typeof ActionBarAction>[]
  actionBarVisible?: boolean
  bonusBar?: React.ReactNode
  fullOverlay?: React.ReactElement<typeof FullOverlayLink>
  fullOverlayVisible?: boolean
  image: React.ReactElement<typeof ImageLink>
  metadata1?: (string | React.ReactElement<typeof TextLink>)[]
  metadata2?: (string | React.ReactElement<typeof TextLink>)[]
  progress?: number
  size?: ValueOf<typeof vars.sizes>
  tag?: React.ReactElement<typeof Tag>
  title: React.ReactElement<typeof TextLink> | React.ReactElement<typeof Title>
}

interface CardStatics {
  Action: typeof ActionBarAction
  FullOverlayLink: typeof FullOverlayLink
  Image: typeof Image
  ImageLink: typeof ImageLink
  sizes: typeof vars.sizes
  Tag: typeof Tag
  Text: typeof Text
  TextLink: typeof TextLink
  Title: typeof Title
}
const Card: React.FC<CardProps> & CardStatics = props => {
  const {
    actionBar,
    actionBarVisible,
    bonusBar,
    fullOverlay,
    fullOverlayVisible,
    image,
    metadata1,
    metadata2,
    progress,
    size = sizes.medium,
    tag,
    title,
    ...rest
  } = props
  return (
    <div {...rest} className={styles.card()}>
      <div className={styles.overlays(size)}>
        {image || null}

        {fullOverlay ? (
          <div className={styles.fullOverlay(fullOverlayVisible)}>
            {fullOverlay}
          </div>
        ) : null}

        {Array.isArray(actionBar) && actionBar.length > 0 ? (
          <div
            className={styles.actionBar({
              actionBarVisible,
              fullOverlay: Boolean(fullOverlay)
            })}
          >
            {actionBar}
          </div>
        ) : null}

        {bonusBar ? <div className={styles.bonusBar()}>{bonusBar}</div> : null}

        {tag}

        {progress ? (
          <div className={styles.progress()}>
            <div
              className={styles.progressBar(progress)}
              style={{ width: toPercentageString(progress || 0) }}
              aria-label={`${toPercentageString(progress)} complete`}
            />
          </div>
        ) : null}
      </div>

      <div className={styles.titleContainer(size)}>{title}</div>
      {metadata1 && <MetaData size={size} metadata={metadata1} />}
      {metadata2 && <MetaData size={size} metadata={metadata2} />}
    </div>
  )
}

Card.Action = ActionBarAction
Card.FullOverlayLink = FullOverlayLink
Card.Image = Image
Card.ImageLink = ImageLink
Card.Tag = Tag
Card.Text = Text
Card.TextLink = TextLink
Card.Title = Title

Card.sizes = vars.sizes

export const sizes = vars.sizes

export default Card
