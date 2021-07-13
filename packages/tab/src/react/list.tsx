/* eslint-disable  @typescript-eslint/no-unnecessary-type-assertion */
import { motion } from '@pluralsight/ps-design-system-core'
import {
  CaretRightIcon,
  CaretLeftIcon
} from '@pluralsight/ps-design-system-icon'
import { useTheme } from '@pluralsight/ps-design-system-theme'
import {
  useResizeObserver,
  classNames
} from '@pluralsight/ps-design-system-util'
import React from 'react'

import '../css/index.css'
import ListItem from './list-item'

const slideAnimationLength = parseInt(motion.speedFast) + 10

interface Overflows {
  toLeft: boolean
  toRight: boolean
}
const List: React.FC<React.HTMLAttributes<HTMLDivElement>> = props => {
  const themeName = useTheme()
  const listRef = React.useRef<HTMLDivElement>(null)
  const { width: listWidth } = useResizeObserver(listRef)
  const sliderRef = React.useRef<HTMLDivElement>(null)
  const [isRenderedOnce, setRenderedOnce] = React.useState<boolean>(false)
  const [overflows, setOverflows] = React.useState<Overflows>({
    toLeft: false,
    toRight: false
  })
  const [xOffset, setXOffset] = React.useState<number>(0)
  const [sliderWidth, setSliderWidth] = React.useState<number>(0)
  const activeIndexFromProps = findActiveIndex(props.children)
  const [activeIndex, setActiveIndex] = React.useState(
    activeIndexFromProps > -1 ? activeIndexFromProps : 0
  )
  const itemRefs = React.useMemo(
    () =>
      React.Children.map(props.children, () =>
        React.createRef<HTMLElement>()
      ) || [],
    [props.children]
  )

  React.useEffect(
    function calcSliderWidth() {
      if (itemRefs)
        setSliderWidth(
          itemRefs.reduce((totalWidth, ref) => totalWidth + getWidth(ref), 0)
        )
    },
    [itemRefs]
  )

  React.useEffect(
    function ensureActiveItemOnscreen() {
      if (!isRenderedOnce) {
        const itemRightX = getRightX(itemRefs[activeIndex])
        const listRightX = getRightX(listRef)
        const isItemOffscreen = itemRightX > listRightX
        if (isItemOffscreen) {
          setXOffset(-1 * (itemRightX - listRightX))
        }
        setRenderedOnce(true)
      }
    },
    [activeIndex, isRenderedOnce, itemRefs, listRef]
  )

  React.useEffect(
    function setActiveIndexFromProps() {
      if (activeIndex !== activeIndexFromProps && activeIndexFromProps !== -1)
        setActiveIndex(activeIndexFromProps)
    },
    [activeIndex, activeIndexFromProps]
  )

  React.useEffect(() => {
    function calcOverflow() {
      const toRight = sliderWidth + xOffset > listWidth

      const listLeftX = getLeftX(listRef)
      const sliderLeftX = getLeftX(sliderRef)
      const toLeft = sliderLeftX + xOffset < listLeftX

      setOverflows({
        toLeft,
        toRight
      })
    }

    const timer = setTimeout(calcOverflow, slideAnimationLength)

    return () => {
      clearTimeout(timer)
    }
  }, [listRef, sliderRef, xOffset, listWidth, sliderWidth])

  React.useEffect(() => {
    if (listRef.current !== undefined) {
      /* eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion */
      if (listWidth >= (listRef.current as HTMLDivElement).scrollWidth) {
        setXOffset(0)
      }
    }
  }, [listWidth, listRef])

  function handleListItemClick(
    i: number,
    originalOnClick: ((i: number, event: React.MouseEvent) => void) | undefined,
    evt: React.MouseEvent
  ) {
    setActiveIndex(i)
    if (typeof originalOnClick === 'function') originalOnClick(i, evt)
  }

  function handleKeyDown(evt: React.KeyboardEvent) {
    if (evt.key !== 'ArrowRight' && evt.key !== 'ArrowLeft') return

    evt.stopPropagation()
    evt.preventDefault()
    const delta = evt.key === 'ArrowRight' ? 1 : -1
    const nextRef = itemRefs[activeIndex + delta]

    if (nextRef && nextRef.current) {
      if (delta === 1) {
        const itemRightX = getRightX(nextRef)
        const listRightX = getRightX(listRef)
        const isOffscreenRight = itemRightX > listRightX
        if (isOffscreenRight) {
          setXOffset(xOffset - (itemRightX - listRightX))
        }
      } else {
        const itemLeftX = getLeftX(nextRef)
        const listLeftX = getLeftX(listRef)
        const isOffscreenLeft = itemLeftX < listLeftX
        if (isOffscreenLeft) {
          setXOffset(xOffset - itemLeftX)
        }
      }

      setTimeout(() => {
        if (nextRef && nextRef.current) {
          nextRef.current.focus()
          nextRef.current.click()
        }
      }, slideAnimationLength)
    }
  }

  function handlePageLeft(evt: React.MouseEvent) {
    evt.preventDefault()
    const offscreenLeftWidth = getLeftX(listRef) - getLeftX(sliderRef)
    const smallestNeededWidth = Math.min(listWidth, offscreenLeftWidth)
    const lesserXOffset = Math.min(xOffset + smallestNeededWidth, 0)
    setXOffset(lesserXOffset)
  }

  function handlePageRight(evt: React.MouseEvent) {
    evt.preventDefault()
    const maxXOffset = -1 * sliderWidth + listWidth
    const furtherXOffset = Math.max(xOffset - listWidth, maxXOffset)
    setXOffset(furtherXOffset)
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { children, className, ...rest } = props
  const listProps = {
    ...rest,
    role: 'tablist',
    onKeyDown: handleKeyDown,
    tabIndex: 0
  }
  return (
    <div
      {...listProps}
      className={classNames(
        className,
        'psds-tab__list',
        `psds-theme--${themeName}`
      )}
      ref={listRef}
    >
      {overflows.toLeft && (
        <OverflowButton position="left" onClick={handlePageLeft} />
      )}
      <div
        className={'psds-tab__slider'}
        ref={sliderRef}
        style={styleForXOffset(xOffset)}
      >
        {React.Children.map(props.children, (comp, i) => {
          if (!comp) return

          const childProps = {
            active: activeIndex === i,
            key: (
              comp as React.FunctionComponentElement<
                React.ComponentProps<typeof ListItem>
              >
            ).props.id,
            onClick: (evt: React.MouseEvent) =>
              handleListItemClick(
                i,
                (
                  comp as React.FunctionComponentElement<
                    React.ComponentProps<typeof ListItem>
                  >
                ).props.onClick as
                  | ((i: number, evt: React.MouseEvent) => void)
                  | undefined,
                evt
              ),
            ref: itemRefs[i]
          }
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          return React.cloneElement(comp as any, childProps)
        })}
      </div>
      {overflows.toRight && (
        <OverflowButton position="right" onClick={handlePageRight} />
      )}
    </div>
  )
}
export default List

type OverflowButtonPosition = 'left' | 'right'
interface OverflowButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  position: OverflowButtonPosition
}
const OverflowButton: React.FC<OverflowButtonProps> = props => {
  const themeName = useTheme()
  const { position, ...rest } = props
  return (
    <button
      className={classNames(
        'psds-tab__overflow-button',
        `psds-tab__overflow-button--${String(position)}`,
        `psds-theme--${themeName}`,
        `psds-tab__overflow-button--${position}`
      )}
      tabIndex={-1}
      {...rest}
    >
      <div className={'psds-tab__overflow-button__icon'}>
        {position === 'right' ? <CaretRightIcon /> : <CaretLeftIcon />}
      </div>
    </button>
  )
}

function styleForXOffset(xOffset: number) {
  return { transform: `translateX(${xOffset}px)` }
}

function getWidth(ref: React.RefObject<HTMLElement>) {
  if (!(ref && ref.current)) return 0
  const rect = ref.current.getBoundingClientRect()
  return rect.width
}

function getLeftX(ref: React.RefObject<HTMLElement>) {
  if (!(ref && ref.current)) return 0
  const rect = ref.current.getBoundingClientRect()
  return window.pageXOffset + rect.left
}

function getRightX(ref: React.RefObject<HTMLElement>) {
  if (!(ref && ref.current)) return 0
  const rect = ref.current.getBoundingClientRect()
  return window.pageXOffset + rect.left + rect.width
}

// NOTE: weird because React.Children.toArray strips nulls; React.Children.map strips false booleans
function findActiveIndex(els: React.ReactNode) {
  const activity = React.Children.map<string, React.ReactNode>(
    els,
    (child, i) => {
      return React.isValidElement(child) && child.props.active
        ? 'active'
        : 'inactive'
    }
  )

  return (activity || []).findIndex(b => {
    return b === 'active'
  })
}
