import Icon, { sizes as iconSizes } from '@pluralsight/ps-design-system-icon'
import {
  names as themeNames,
  useTheme
} from '@pluralsight/ps-design-system-theme'
import {
  ValueOf,
  classNames,
  dashify
} from '@pluralsight/ps-design-system-util'
import React from 'react'

import '../css/index.css'
import * as vars from '../vars/index'

interface StyleProps {
  appearance: ValueOf<typeof vars.appearances>
  disabled: boolean
  icon: boolean
  iconOnly: boolean
  iconAlign: ValueOf<typeof vars.iconAligns>
  layout: ValueOf<typeof vars.layouts>
  size: ValueOf<typeof vars.sizes>
  isLoadingWithNoText: boolean
  loading: boolean
  labelOnly: boolean
}

const styles = {
  button: (
    {
      appearance,
      disabled,
      icon,
      iconAlign,
      iconOnly,
      layout,
      size
    }: Omit<StyleProps, 'isLoadingWithNoText' | 'labelOnly' | 'loading'>,
    themeName: ValueOf<typeof themeNames>,
    className: string | undefined
  ) =>
    classNames(
      'psds-button',
      `psds-button--layout-${dashify(layout)}`,
      `psds-button--size-${dashify(size)}`,
      `psds-button--appearance-${appearance}`,
      `psds-theme--${themeName}`,
      disabled && 'psds-button--disabled',
      icon && !iconOnly && 'psds-button--not-icon-only',
      iconAlign === vars.iconAligns.right &&
        `psds-button--icon-align-${iconAlign}`,
      iconOnly && `psds-button--icon-only`,
      className
    ),
  loading: (
    { appearance, size }: Pick<StyleProps, 'appearance' | 'size'>,
    themeName: ValueOf<typeof themeNames>
  ) =>
    classNames(
      'psds-button__loading',
      `psds-button__loading--size-${size}`,
      `psds-button__loading--appearance-${appearance}`,
      `psds-button__loading--theme-${themeName}`
    ),
  icon: ({
    iconAlign,
    iconOnly,
    labelOnly,
    loading,
    size
  }: Pick<
    StyleProps,
    'iconAlign' | 'iconOnly' | 'labelOnly' | 'loading' | 'size'
  >) =>
    classNames(
      'psds-button__icon',
      `psds-button__icon--icon-align-${iconAlign}`,
      `psds-button__icon--size-${size}`,
      (iconOnly || (loading && labelOnly)) && 'psds-button__icon--icon-only',
      loading && labelOnly && 'psds-button__icon--loading-label-only'
    ),
  text: (invisible?: boolean) =>
    classNames('psds-button__text', invisible && 'psds-button__text--invisible')
}

const mapIconSize = (size: ValueOf<typeof vars.sizes>) => {
  const btnToIconSizes = {
    [vars.sizes.xSmall]: iconSizes.xSmall,
    [vars.sizes.small]: iconSizes.small,
    [vars.sizes.medium]: iconSizes.medium,
    [vars.sizes.large]: iconSizes.medium
  }
  return btnToIconSizes[size] ? btnToIconSizes[size] : iconSizes.medium
}

interface IconContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  labelOnly: boolean
  loading: boolean
  icon: React.ReactNode
  appearance: ValueOf<typeof vars.appearances>
  themeName: ValueOf<typeof themeNames>
  size: ValueOf<typeof vars.sizes>
  iconOnly: boolean
  iconAlign: ValueOf<typeof vars.iconAligns>
}

const IconContainer: React.FC<IconContainerProps> = props =>
  props.loading ? (
    <div
      className={styles.icon({
        iconAlign: props.iconAlign,
        iconOnly: props.iconOnly,
        labelOnly: props.labelOnly,
        loading: props.loading,
        size: props.size
      })}
    >
      <Icon size={mapIconSize(props.size)}>
        <span
          className={styles.loading(
            {
              appearance: props.appearance,
              size: props.size
            },
            props.themeName
          )}
        />
      </Icon>
    </div>
  ) : props.icon ? (
    <div
      className={styles.icon({
        iconAlign: props.iconAlign,
        iconOnly: props.iconOnly,
        labelOnly: props.labelOnly,
        loading: props.loading,
        size: props.size
      })}
    >
      {React.cloneElement(props.icon as React.ReactElement, {
        size: mapIconSize(props.size)
      })}
    </div>
  ) : null

export interface ButtonProps
  extends Omit<
    React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >,
    'value'
  > {
  appearance?: ValueOf<typeof vars.appearances>
  disabled?: boolean
  value?: React.ReactText
  layout?: ValueOf<typeof vars.layouts>
  icon?: React.ReactNode
  iconAlign?: ValueOf<typeof vars.iconAligns>
  loading?: boolean
  size?: ValueOf<typeof vars.sizes>
  href?: string
  target?: string
  rel?: string
}
interface ButtonStatics {
  appearances: typeof vars.appearances
  layouts: typeof vars.layouts
  iconAligns: typeof vars.iconAligns
  sizes: typeof vars.sizes
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, forwardedRef) => {
    const {
      appearance = vars.appearances.primary,
      className,
      children,
      disabled = false,
      icon,
      iconAlign = vars.iconAligns.left,
      layout = vars.layouts.inline,
      loading = false,
      size = vars.sizes.medium,
      ...rest
    } = props

    const themeName = useTheme()

    const ref = React.useRef<HTMLButtonElement>()
    React.useImperativeHandle(
      forwardedRef,
      () => ref.current as unknown as HTMLButtonElement
    )

    const hasLabel = React.Children.count(children) > 0
    const iconOnly = !hasLabel

    const buttonClassNames = styles.button(
      {
        appearance,
        disabled,
        icon: Boolean(icon),
        iconAlign,
        iconOnly,
        layout,
        size
      },
      themeName,
      className
    )

    const iconEl = (
      <IconContainer
        appearance={appearance}
        icon={icon}
        iconAlign={iconAlign}
        iconOnly={iconOnly}
        labelOnly={hasLabel && !icon}
        loading={loading}
        size={size}
        themeName={themeName}
      ></IconContainer>
    )

    const isLoadingAndLabelOnly = hasLabel && loading && !icon
    const labelEl = (
      <span
        className={styles.text(isLoadingAndLabelOnly)}
        aria-hidden={isLoadingAndLabelOnly}
      >
        {children}
      </span>
    )
    const isAnchor = Boolean(rest.href)
    const Component = isAnchor ? 'a' : 'button'
    !isAnchor && delete (rest as any).download
    const isDisabled = isAnchor ? undefined : disabled || loading
    const handleClick =
      disabled && isAnchor
        ? undefined
        : (rest.onClick as React.MouseEventHandler<
            HTMLAnchorElement | HTMLButtonElement
          >)
    return (
      <Component
        {...(rest as React.HTMLAttributes<
          HTMLAnchorElement | HTMLButtonElement
        >)}
        className={buttonClassNames}
        disabled={isDisabled}
        onClick={handleClick}
        ref={ref as any}
      >
        {iconEl}
        {labelEl}
      </Component>
    )
  }
) as React.ForwardRefExoticComponent<ButtonProps> & ButtonStatics

Button.appearances = vars.appearances
Button.iconAligns = vars.iconAligns
Button.layouts = vars.layouts
Button.sizes = vars.sizes

export const appearances = vars.appearances
export const iconAligns = vars.iconAligns
export const sizes = vars.sizes

export default Button
