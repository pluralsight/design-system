import {
  names as themeNames,
  useTheme
} from '@pluralsight/ps-design-system-theme'
import {
  RefForwardingComponent,
  RefFor,
  ValueOf,
  classNames,
  useResizeObserver
} from '@pluralsight/ps-design-system-util'
import React from 'react'

import '../css/index.css'
import Context from './context'
import * as illustrations from './illustrations/index'
import { illustrationNames, sizes } from '../vars/index'

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: ValueOf<typeof sizes>
  actions?: React.ReactNode
  caption?: React.ReactNode
  heading: React.ReactNode
  illustration?: React.ReactNode
  themeName?: ValueOf<typeof themeNames>
}

interface EmptyStateStatics {
  Actions: typeof Actions
  Caption: typeof Caption
  Heading: typeof Heading
  Illustration: typeof Illustration
  sizes: typeof sizes
}

interface EmptyStateComponent
  extends RefForwardingComponent<
    EmptyStateProps,
    HTMLDivElement,
    EmptyStateStatics
  > {}

const renderSmallIfElementLessThan = 450

const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  (props, forwardedRef) => {
    const {
      actions,
      caption,
      className,
      heading,
      illustration,
      size: sizeOverride,
      ...rest
    } = props

    const ref = React.useRef<HTMLDivElement>()
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    React.useImperativeHandle(forwardedRef, () => ref.current as HTMLDivElement)

    const themeName = useTheme()

    const [hasRenderedOnce, setHasRenderedOnce] = React.useState(false)
    const { width } = useResizeObserver(ref)

    React.useEffect(() => {
      setHasRenderedOnce(true)
    }, [])

    const observableSize =
      width <= renderSmallIfElementLessThan ? sizes.small : sizes.large

    const size = sizeOverride ? props.size : observableSize
    const ctx = { size, themeName }

    return (
      <Context.Provider value={ctx}>
        <div
          {...rest}
          className={classNames(
            'psds-emptystate',
            `psds-emptystate--size-${ctx.size}`,
            `psds-theme--${ctx.themeName}`,
            !hasRenderedOnce && 'psds-emptystate--hidden',
            className
          )}
          ref={ref as RefFor<'div'>}
        >
          {illustration}
          {heading}
          {caption}
          {actions}
        </div>
      </Context.Provider>
    )
  }
) as EmptyStateComponent

const Actions: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...rest
}) => (
  <div
    {...rest}
    className={classNames('psds-emptystate__actions', className)}
  />
)

const Caption: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({
  className,
  ...rest
}) => (
  <p {...rest} className={classNames('psds-emptystate__caption', className)} />
)

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: keyof Pick<JSX.IntrinsicElements, 'h1' | 'h2' | 'h3' | 'h4' | 'h5'>
}

const Heading: React.FC<HeadingProps> = props => {
  const { as: Tag = 'h1', className, ...rest } = props

  return (
    <Tag
      {...rest}
      className={classNames('psds-emptystate__heading', className)}
    />
  )
}

interface IllustrationProps extends React.HTMLAttributes<SVGElement> {
  name?: ValueOf<typeof illustrationNames>
}

interface IllustrationStatics {
  names: typeof illustrationNames
}

const IllustrationNotFound = () => null

const Illustration: React.FC<IllustrationProps> & IllustrationStatics =
  props => {
    const { children: custom, className, name, ...rest } = props

    return (
      <Context.Consumer>
        {ctx => {
          // @ts-ignore: necessary conditional
          let Comp: any = illustrations[name] || IllustrationNotFound
          const isSmall: boolean = ctx.size === sizes.small && !!Comp.small

          if (isSmall) Comp = Comp.small
          if (custom) Comp = () => custom

          return (
            <div
              className={classNames('psds-emptystate__illustration', className)}
            >
              <Comp {...rest} />
            </div>
          )
        }}
      </Context.Consumer>
    )
  }

Illustration.names = illustrationNames

EmptyState.Actions = Actions
EmptyState.Caption = Caption
EmptyState.Heading = Heading
EmptyState.Illustration = Illustration

EmptyState.sizes = sizes

export default EmptyState
