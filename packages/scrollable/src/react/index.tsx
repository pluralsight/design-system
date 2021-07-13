import {
  canUseDOM,
  classNames,
  combineFns,
  shallowCompare,
  useResizeObserver
} from '@pluralsight/ps-design-system-util'
import React from 'react'

import '../css/index.css'

let BLANK_IMAGE: HTMLImageElement | undefined
if (canUseDOM()) {
  BLANK_IMAGE = new Image(0, 0)
  // prettier-ignore
  BLANK_IMAGE.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
}

function areEqualProps(
  prevProps: Record<string, unknown>,
  nextProps: Record<string, unknown>
) {
  const changed = shallowCompare(prevProps, nextProps)
  return !changed
}

interface ScrollableProps extends React.HTMLAttributes<HTMLDivElement> {
  renderContent?: (
    props: renderContentProps,
    ref: React.Ref<HTMLElement>
  ) => React.ReactNode
}
const Scrollable = React.forwardRef<HTMLElement, ScrollableProps>(
  (props, forwardedRef) => {
    const { renderContent = defaultRenderContent, ...rest } = props

    const ref = React.useRef<HTMLElement>()
    /* eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion */
    React.useImperativeHandle(forwardedRef, () => ref.current as HTMLElement)

    const dragPreview = React.useRef(BLANK_IMAGE)

    const [hidden, setHidden] = React.useState<boolean>(true)
    const [pageY, setPageY] = React.useState<number>(0)
    const [offset, setOffset] = React.useState<string>('0%')
    const [scrollRatio, setScrollRatio] = React.useState<number>(0)

    const updateDimensions = React.useCallback(() => {
      if (!ref.current) return
      const content = ref.current

      const nextTotalHeight = content.scrollHeight
      const nextOffset = (content.scrollTop / nextTotalHeight) * 100 + '%'
      const nextScrollRatio = content.clientHeight / nextTotalHeight
      const shouldHide = nextScrollRatio >= 1

      setHidden(shouldHide)
      setOffset(nextOffset)
      setScrollRatio(nextScrollRatio)
    }, [ref])

    useResizeObserver(ref, updateDimensions)

    // eslint-disable-next-line react-hooks/exhaustive-deps
    React.useEffect(() => updateDimensions(), [])

    function onHandleDrag(evt: React.DragEvent<HTMLDivElement>) {
      const nextPageY = evt.pageY
      if (nextPageY <= 0) return

      const content = ref.current
      if (!content) return
      const delta = evt.pageY - pageY

      setPageY(nextPageY)
      content.scrollTop += delta / scrollRatio
    }

    function onHandleDragEnd(_evt: React.DragEvent<HTMLDivElement>) {
      setPageY(0)
    }

    function onHandleDragStart(evt: React.DragEvent<HTMLDivElement>) {
      if (
        evt &&
        evt.dataTransfer &&
        evt.dataTransfer.setDragImage &&
        dragPreview.current
      ) {
        evt.dataTransfer.setDragImage(dragPreview.current, 0, 0)
      }

      setPageY(evt.pageY)
    }

    const styleOverride = React.useMemo(() => {
      const height = Math.max(scrollRatio * 100, 10) + '%'
      const visibility: 'hidden' | 'initial' = hidden ? 'hidden' : 'initial'

      return { height, top: offset, visibility }
    }, [hidden, offset, scrollRatio])

    const onScroll = combineFns<[React.UIEvent<HTMLDivElement>]>(
      updateDimensions,
      props.onScroll
    )
    return (
      <Outer data-scrollable {...rest}>
        <Inner key="scrollable-wrapper">
          {renderContent(
            {
              children: props.children,
              onScroll,
              className: 'psds-scrollable__content'
            },
            (node: HTMLElement) => (ref.current = node)
          )}
        </Inner>

        <Handle
          draggable
          onDrag={onHandleDrag}
          onDragEnd={onHandleDragEnd}
          onDragStart={onHandleDragStart}
          style={styleOverride}
        />
      </Outer>
    )
  }
)
Scrollable.displayName = 'Scrollable'

export interface renderContentProps {
  children: React.ReactNode
  onScroll: React.UIEventHandler
  className: string
}
const defaultRenderContent = (
  contentProps: renderContentProps,
  contentRef: React.RefCallback<HTMLElement>
) => <div {...contentProps} ref={contentRef} />

const Outer = React.memo<React.HTMLAttributes<HTMLDivElement>>(
  function OuterComp({ className, ...props }) {
    return (
      <div
        className={classNames(
          className,
          'psds-scrollable__outer',
          'psds-scrollable__outer--screen'
        )}
        {...props}
      />
    )
  },
  areEqualProps
)
Outer.displayName = 'Scrollable.Outer'

const Inner = React.memo<React.HTMLAttributes<HTMLDivElement>>(
  function InnerComp(props) {
    return <div className={'psds-scrollable__inner'} {...props} />
  },
  areEqualProps
)
Inner.displayName = 'Scrollable.Inner'

interface HandleProps extends React.HTMLAttributes<HTMLDivElement> {
  draggable: boolean
  onDrag?: React.DragEventHandler
  onDragEnd?: React.DragEventHandler
  onDragStart?: React.DragEventHandler
}
const Handle: React.FC<HandleProps> = props => {
  const [grabbed, setGrabbed] = React.useState<boolean>(false)

  const onDragEnd = combineFns<[React.DragEvent<HTMLDivElement>]>(() => {
    setGrabbed(false)
  }, props.onDragEnd)

  const onDragStart = combineFns<[React.DragEvent<HTMLDivElement>]>(() => {
    setGrabbed(true)
  }, props.onDragStart)

  return (
    <div
      className={classNames(
        'psds-scrollable__handle',
        grabbed && 'psds-scrollable__handle--grabbed'
      )}
      {...props}
      onDragEnd={onDragEnd}
      onDragStart={onDragStart}
    />
  )
}
Handle.displayName = 'Scrollable.Handle'

export default Scrollable
