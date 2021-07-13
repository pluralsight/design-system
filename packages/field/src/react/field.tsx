import Halo from '@pluralsight/ps-design-system-halo'
import { WarningIcon } from '@pluralsight/ps-design-system-icon'
import {
  ValueOf,
  classNames,
  combineFns,
  forwardRefWithStatics
} from '@pluralsight/ps-design-system-util'
import Theme, { names as themeNames } from '@pluralsight/ps-design-system-theme'
import React from 'react'

import '../css/field.css'
import { FieldContext } from './context'
import Input from './input'
import Label from './label'
import SubLabel from './sub-label'
import TextArea from './text-area'
import { appearances, sizes } from '../vars/index'

type InputElements = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement

export interface FieldProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'prefix' | 'ref'> {
  disabled?: boolean
  error?: boolean
  label?: React.ReactNode
  onClick?: React.MouseEventHandler<HTMLDivElement>
  prefix?: React.ReactNode
  renderContainer?: React.ForwardRefExoticComponent<React.RefAttributes<any>>
  renderTag?: React.FC<React.HTMLAttributes<HTMLElement>>
  size?: ValueOf<typeof sizes>
  subLabel?: React.ReactNode
  suffix?: React.ReactNode
}

export interface FieldStatics {
  Input: typeof Input
  Label: typeof Label
  SubLabel: typeof SubLabel
  TextArea: typeof TextArea

  appearances: typeof appearances
  sizes: typeof sizes
}

const Field = forwardRefWithStatics<FieldProps, HTMLDivElement, FieldStatics>(
  (props, forwardedRef) => {
    const {
      children,
      className,
      disabled,
      error,
      label,
      onClick,
      prefix,
      renderContainer = defaultRenderContainer,
      renderTag = defaultRenderTag,
      size = sizes.medium,
      subLabel,
      suffix,
      ...rest
    } = props

    const containerRef = React.useRef<HTMLDivElement>(null)
    React.useImperativeHandle(
      forwardedRef,
      () => containerRef.current as unknown as HTMLDivElement
    )
    const Container = React.useMemo(() => renderContainer, [renderContainer])
    const Tag = React.useMemo(() => renderTag, [renderTag])

    const focusOnClick: React.MouseEventHandler = React.useCallback(evt => {
      const focusableTags = ['input', 'select', 'textarea']

      const { current: el } = containerRef
      if (!el || el.contains(document.activeElement)) return
      if (focusableTags.includes(getTargetTag(evt))) return

      const node = el.querySelector<InputElements>(focusableTags.join(','))
      if (node) node.focus()
    }, [])

    const handleClick = combineFns(onClick, focusOnClick)

    return (
      <FieldContext.Provider
        value={{
          size
        }}
      >
        <Container
          className={classNames(
            'psds-field__container',
            disabled && 'psds-field__container--disabled',
            error && 'psds-field__container--error',
            className
          )}
          onClick={handleClick}
          ref={containerRef}
        >
          {label && label}

          <Theme name={themeNames.light}>
            <Halo
              error={error}
              gapSize={Halo.gapSizes.small}
              className="psds-field__halo"
            >
              <Tag
                {...rest}
                className={classNames(
                  'psds-field',
                  `psds-field--${size}`,
                  !!prefix && 'psds-field--prefix',
                  !!suffix && 'psds-field--suffix'
                )}
              >
                {prefix && <div className="psds-field__prefix">{prefix}</div>}

                {children}

                {suffix && <div className="psds-field__suffix">{suffix}</div>}

                {error && (
                  <div className="psds-field__error-icon">
                    <WarningIcon />
                  </div>
                )}
              </Tag>
            </Halo>
          </Theme>

          {subLabel && subLabel}
        </Container>
      </FieldContext.Provider>
    )
  }
)

const defaultRenderContainer = React.forwardRef<
  HTMLDivElement,
  Omit<React.HTMLAttributes<HTMLDivElement>, 'ref'>
>((props, ref) => <div ref={ref} {...props} />)

const defaultRenderTag: React.FC = props => <div {...props} />

const getTargetTag = (evt: React.SyntheticEvent | Event): string => {
  if (!(evt.target instanceof Element)) return 'unknown'
  return evt.target.tagName.toLowerCase()
}

Field.displayName = 'Field'

Field.Input = Input
Field.Label = Label
Field.SubLabel = SubLabel
Field.TextArea = TextArea

Field.appearances = appearances
Field.sizes = sizes

export default Field
