import {
  RefForwardingComponent,
  ValueOf,
  classNames,
  dashify
} from '@pluralsight/ps-design-system-util'
import React from 'react'

import '../css/index.css'
import { sizes, widths } from '../vars/index'
import { getColorByName, getInitials, transformSrc } from '../js/index'

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  alt?: string
  name?: string
  size?: ValueOf<typeof sizes>
  src?: string
}

// TODO: try simple unions
interface AvatarStatics {
  sizes: typeof sizes
  widths: typeof widths
}

type AvatarComponent = RefForwardingComponent<
  AvatarProps,
  HTMLDivElement,
  AvatarStatics
>

type ImageState = 'loading' | 'error' | 'success'

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>((props, ref) => {
  const { alt, className, name, size = sizes.medium, src, ...rest } = props

  const [imageState, setImageState] = React.useState<ImageState>('loading')

  const handleImageLoadSuccess: React.ReactEventHandler<HTMLImageElement> =
    evt => {
      const pixel = evt.target as HTMLImageElement
      const isFallbackPixel = pixel.naturalWidth === 1
      setImageState(isFallbackPixel ? 'error' : 'success')
    }

  const handleImageLoadError: React.ReactEventHandler<HTMLImageElement> =
    () => {
      setImageState('error')
    }

  const shouldShowImg = src && imageState !== 'error'
  const shouldShowInitials = imageState === 'error' || imageState === 'loading'

  const hideFromScreenReaders = shouldShowImg && !alt

  return (
    <div
      className={classNames(
        'psds-avatar',
        `psds-avatar--size-${dashify(size)}`,
        className
      )}
      {...(hideFromScreenReaders && { 'aria-hidden': true })}
      {...rest}
      ref={ref}
    >
      {shouldShowImg && (
        <img
          className="psds-avatar__image"
          alt={alt}
          onError={handleImageLoadError}
          onLoad={handleImageLoadSuccess}
          src={transformSrc(src)}
        />
      )}

      {shouldShowInitials && (
        <div
          className="psds-avatar__initials"
          aria-label={name}
          style={{ backgroundColor: getColorByName(name) }}
        >
          {getInitials(name)}
        </div>
      )}
    </div>
  )
}) as AvatarComponent

Avatar.displayName = 'Avatar'

Avatar.sizes = sizes
Avatar.widths = widths

export default Avatar
