import { useTheme } from '@pluralsight/ps-design-system-theme'
import {
  RefForwardingComponent,
  combineFns,
  classNames
} from '@pluralsight/ps-design-system-util'
import React from 'react'

import '../css/index.css'
import * as vars from '../vars/index'

interface ViewToggleProps
  extends Omit<React.ComponentProps<typeof List>, 'onSelect'> {
  onSelect?: (evt: React.MouseEvent<HTMLButtonElement>, index: number) => void
}

interface ViewToggleStatics {
  Option: typeof Option
}

interface ViewToggleComponent
  extends RefForwardingComponent<
    ViewToggleProps,
    HTMLDivElement,
    ViewToggleStatics
  > {}

const ViewToggle = React.forwardRef<HTMLDivElement, ViewToggleProps>(
  (props, forwardedRef) => {
    const { children, onSelect, ...rest } = props

    const ref = React.useRef<HTMLDivElement>(null)
    React.useImperativeHandle(
      forwardedRef,
      () => ref.current as unknown as HTMLDivElement
    )

    const hasRenderedOnce = useHasRenderedOnce()

    const initialIndex = React.useMemo(
      () => findActiveIndex(children),
      [children]
    )
    const [activeIndex, setActiveIndex] = React.useState<number>(initialIndex)

    React.useEffect(() => {
      const index = findActiveIndex(children)
      setActiveIndex(index)
    }, [children])

    const handleSelect = combineFns(
      (_evt: React.MouseEvent<HTMLButtonElement>, index: number) => {
        setActiveIndex(index)
      },
      onSelect
    )

    function renderActivePill() {
      const activeEl = React.Children.toArray(children)[activeIndex]
      if (!React.isValidElement(activeEl)) return null

      let activePillStyle = {}
      if (hasRenderedOnce && ref.current) {
        const selector = `button:nth-of-type(${activeIndex + 1})`
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
        const activeNode = ref.current.querySelector(selector) as HTMLElement

        if (activeNode) activePillStyle = { left: activeNode.offsetLeft }
      }

      return (
        <ActivePillBg style={activePillStyle}>
          <PillBgSpacer>{activeEl.props.children}</PillBgSpacer>
        </ActivePillBg>
      )
    }

    function renderChildren() {
      return React.Children.map(children, (child, i) => {
        if (!React.isValidElement(child)) return null
        if (i >= vars.maxOptionsCount) return null

        return React.cloneElement(child, {
          _i: i,
          _onSelect: handleSelect,
          active: activeIndex === i
        })
      })
    }

    return (
      <List ref={ref} role="radiogroup" {...rest}>
        {renderActivePill()}
        {renderChildren()}
      </List>
    )
  }
) as ViewToggleComponent

const ActivePillBg: React.FC<React.HTMLAttributes<HTMLDivElement>> = props => {
  const themeName = useTheme()
  return (
    <div
      className={classNames(
        'psds-viewtoggle__option-bg',
        `psds-theme--${themeName}`
      )}
      aria-hidden
      {...props}
    />
  )
}

const List = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...rest }, ref) => {
  const themeName = useTheme()
  return (
    <div
      ref={ref}
      className={classNames(
        'psds-viewtoggle',
        `psds-theme--${themeName}`,
        className
      )}
      {...rest}
    />
  )
})

const PillBgSpacer: React.FC<React.HTMLAttributes<HTMLDivElement>> = props => {
  return <div {...props} className="psds-viewtoggle__option-bg__spacer" />
}

interface OptionButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  active: boolean
}
const OptionButton = React.forwardRef<HTMLButtonElement, OptionButtonProps>(
  (props, ref) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { active, ...rest } = props
    const themeName = useTheme()

    return (
      <button
        ref={ref}
        className={classNames(
          'psds-viewtoggle__option',
          `psds-theme--${themeName}`,
          active && 'psds-viewtoggle__option--active'
        )}
        {...rest}
      />
    )
  }
)

interface OptionProps
  extends Omit<OptionButtonProps, '_i' | '_onselect' | 'active'> {
  _i?: number
  _onSelect?: (evt: React.MouseEvent<HTMLButtonElement>, index?: number) => void
  active?: boolean
}
const Option = React.forwardRef<HTMLButtonElement, OptionProps>(
  (props, ref) => {
    const { active = false, _onSelect, _i, ...rest } = props

    const handleClick = (evt: React.MouseEvent<HTMLButtonElement>) => {
      _onSelect && _onSelect(evt, _i)
    }

    return (
      <OptionButton
        active={active}
        aria-checked={active}
        onClick={handleClick}
        ref={ref}
        role="radio"
        {...rest}
      />
    )
  }
)

ViewToggle.Option = Option

export default ViewToggle

function findActiveIndex(els: React.ReactNode): number {
  const index = React.Children.toArray(els).findIndex(
    // @ts-ignore: can't find type workaround for this
    (el: React.ReactElement) => el.props.active
  )
  return index >= 0 ? index : 0
}

function useHasRenderedOnce() {
  const [hasRenderedOnce, setHasRenderedOnce] = React.useState(false)

  React.useEffect(() => {
    setHasRenderedOnce(true)
  }, [])

  return hasRenderedOnce
}
