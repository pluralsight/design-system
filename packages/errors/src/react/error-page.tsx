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
import Context, { ContextValue } from './context'
import { error } from './illustrations/index'
import { sizes } from '../vars/index'

export interface ErrorPageProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: ValueOf<typeof sizes>
  actions?: React.ReactNode
  caption?: React.ReactNode
  errorCode?: React.ReactNode
  heading: React.ReactNode
  illustration?: React.ReactNode
  themeName?: ValueOf<typeof themeNames>
}

interface ErrorPageStatics {
  Actions: typeof Actions
  Caption: typeof Caption
  ErrorCode: typeof ErrorCode
  Heading: typeof Heading
  Illustration: typeof Illustration
  sizes: typeof sizes
}

interface ErrorPageComponent
  extends RefForwardingComponent<
    ErrorPageProps,
    HTMLDivElement,
    ErrorPageStatics
  > {}

const renderSmallIfElementLessThan = 450

const ErrorPage = React.forwardRef<HTMLDivElement, ErrorPageProps>(
  (props, forwardedRef) => {
    const {
      actions,
      caption,
      className,
      heading,
      illustration,
      errorCode,
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
            'psds-errorpage',
            `psds-errorpage--size-${size}`,
            `psds-theme--${themeName}`,
            !hasRenderedOnce && 'psds-errorpage--hidden',
            className
          )}
          ref={ref as RefFor<'div'>}
        >
          {illustration}
          {heading}
          {caption}
          {errorCode}
          {actions}
        </div>
      </Context.Provider>
    )
  }
) as ErrorPageComponent

const Actions: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...rest
}) => (
  <div {...rest} className={classNames('psds-errorpage__actions', className)} />
)

const Caption: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({
  className,
  ...rest
}) => (
  <p {...rest} className={classNames('psds-errorpage__caption', className)} />
)

const ErrorCode: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({
  className,
  ...rest
}) => (
  <p
    {...rest}
    className={classNames('psds-errorpage__error-code', className)}
  />
)

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: keyof Pick<JSX.IntrinsicElements, 'h1' | 'h2' | 'h3' | 'h4' | 'h5'>
}

const Heading: React.FC<HeadingProps> = props => {
  const { as: Tag = 'h1', className, ...rest } = props

  return (
    <Tag
      {...rest}
      className={classNames('psds-errorpage__heading', className)}
    />
  )
}

interface IllustrationProps extends React.HTMLAttributes<SVGElement> {}

const Illustration: React.FC<IllustrationProps> = props => {
  const { children: custom, className, ...rest } = props

  return (
    <Context.Consumer>
      {ctx => {
        // @ts-ignore: necessary conditional
        let Comp: any = error
        const isSmall: boolean = ctx.size === sizes.small && !!Comp.small

        if (isSmall) Comp = Comp.small
        if (custom) Comp = () => custom

        return (
          <div
            className={classNames('psds-errorpage__illustration', className)}
          >
            <Comp {...rest} />
          </div>
        )
      }}
    </Context.Consumer>
  )
}

ErrorPage.Actions = Actions
ErrorPage.Caption = Caption
ErrorPage.ErrorCode = ErrorCode
ErrorPage.Heading = Heading
ErrorPage.Illustration = Illustration

ErrorPage.sizes = sizes

export default ErrorPage
