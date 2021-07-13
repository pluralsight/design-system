import React from 'react'

import { action } from '@storybook/addon-actions'
import { Meta, Story } from '@storybook/react/types-6-0'

import Button from '@pluralsight/ps-design-system-button'
import * as Text from '@pluralsight/ps-design-system-text'

import Dialog from '../index'

const closeAction = action('close')
const openAction = action('open')

const MockDialog: React.FC<React.ComponentProps<typeof Dialog>> = props => {
  const children = props.children || (
    <>
      <Text.Heading>
        <h1>Wowzers, a Dialog</h1>
      </Text.Heading>

      <Text.P>
        <a href="#">Brownie bear claw</a> liquorice dragée candy canes pastry
        topping. Chocolate cake soufflé sweet roll jelly beans oat cake donut.
        Wafer chocolate cake pastry chocolate bar fruitcake. Cupcake jelly-o
        croissant lollipop liquorice. <a href="#">Tart donut</a> lollipop dragée
        tootsie roll wafer lemon drops cupcake chocolate bar.
      </Text.P>

      <Text.P>
        Powder apple pie cookie lemon drops marzipan gummies. Chocolate lemon
        drops tiramisu. Cotton candy powder oat cake toffee{' '}
        <a href="#">cotton candy</a> muffin soufflé marshmallow biscuit.
      </Text.P>

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button appearance={Button.appearances.stroke}>Secondary CTA</Button>
        <span style={{ marginLeft: 10 }} />
        <Button>Primary CTA</Button>
      </div>
    </>
  )

  return <Dialog {...props}>{children}</Dialog>
}

export default {
  title: 'Components/Dialog',
  component: Dialog
} as Meta

export const OnClose: Story = () => <MockDialog onClose={closeAction} />

export const OnCloseDisableClosebutton: Story = () => (
  <MockDialog disableCloseButton>
    <Text.Heading>
      <h1>Wowzers, a Dialog</h1>
    </Text.Heading>
  </MockDialog>
)

export const TailPositions: Story = () => (
  <div style={{ maxWidth: '50%', margin: '0 auto' }}>
    <StoryGrid>
      <div>none</div>
      <MockDialog />
      {Object.values(Dialog.tailPositions).map(position => (
        <React.Fragment key={position}>
          <div>{position}</div>
          <MockDialog tailPosition={position} />
        </React.Fragment>
      ))}
    </StoryGrid>
  </div>
)

interface ModalStoryProps extends React.HTMLAttributes<HTMLDivElement> {
  children: (
    storyProps: Record<string, unknown>,
    callbacks: Record<string, unknown>
  ) => React.ReactNode
}

const ModalStory: React.FC<ModalStoryProps> = ({ children }) => {
  const [isOpen, setIsOpen] = React.useState(true)

  const open = (evt: React.MouseEvent) => {
    setIsOpen(true)
    openAction(evt)
  }

  const close = (evt: React.MouseEvent) => {
    setIsOpen(false)
    closeAction(evt)
  }

  const storyProps = {
    'aria-label': 'Storybook Modal',
    onClose: close,
    modal: true
  }

  return (
    <div>
      <Text.P>
        Macaroon danish I love candy macaroon danish toffee muffin. Cotton candy
        chupa chups cupcake I love. Chocolate I love bonbon carrot cake cupcake
        cookie muffin liquorice. I love I love I love jelly-o fruitcake
        <a href="#">I love chocolate cake</a> wafer chupa chups.
      </Text.P>

      <Text.P>
        Sesame snaps cake pudding I love chupa chups I love. Cotton candy
        biscuit oat cake dessert donut I love lemon drops. Cookie croissant
        dragée tootsie roll marzipan I love. Apple pie cheesecake jelly-o
        cheesecake I love cheesecake.
      </Text.P>

      <Button onClick={isOpen ? close : open}>
        {(isOpen ? 'close' : 'open') + ' modal'}
      </Button>

      <Text.P>
        Sweet soufflé <a href="#">apple pie</a>. Halvah icing pudding pastry ice
        cream gingerbread tart candy canes dragée. Pie gingerbread icing.
      </Text.P>

      {isOpen && children(storyProps, { close, open })}
    </div>
  )
}

export const ModalDefault: Story = () => (
  <ModalStory>{props => <MockDialog {...props} />}</ModalStory>
)

export const ModalNoClosebutton: Story = () => (
  <ModalStory>
    {props => <MockDialog {...props} disableCloseButton />}
  </ModalStory>
)

export const ModalNoFocusOnMount: Story = () => (
  <ModalStory>
    {props => <MockDialog {...props} disableFocusOnMount />}
  </ModalStory>
)

export const ModalNoClickOverlay: Story = () => (
  <ModalStory>
    {props => <MockDialog {...props} disableCloseOnOverlayClick />}
  </ModalStory>
)

export const ModalNoEscapeKey: Story = () => (
  <ModalStory>
    {props => <MockDialog {...props} disableCloseOnEscape />}
  </ModalStory>
)

export const ModalNoFocusableChildElements: Story = () => (
  <ModalStory>
    {props => (
      <MockDialog {...props}>
        <Text.Heading>
          <h1>Wowzers, a Dialog</h1>
        </Text.Heading>
      </MockDialog>
    )}
  </ModalStory>
)

export const ModalOverlowY: Story = () => (
  <ModalStory>
    {props => (
      <MockDialog {...props}>
        {Array.from(Array(20)).map((_, i) => (
          <Text.P key={i}>
            <a href="#">Brownie bear claw</a> liquorice dragée candy canes
            pastry topping. Chocolate cake soufflé sweet roll jelly beans oat
            cake donut. Wafer chocolate cake pastry chocolate bar fruitcake.
            Cupcake jelly-o croissant lollipop liquorice.{' '}
            <a href="#">Tart donut</a> lollipop dragée tootsie roll wafer lemon
            drops cupcake chocolate bar.
          </Text.P>
        ))}
      </MockDialog>
    )}
  </ModalStory>
)

export const ModalOverflowYWithTail: Story = () => (
  <ModalStory>
    {props => (
      <MockDialog {...props} tailPosition={Dialog.tailPositions.topCenter}>
        {Array.from(Array(20)).map((_, i) => (
          <Text.P key={i}>
            <a href="#">Brownie bear claw</a> liquorice dragée candy canes
            pastry topping. Chocolate cake soufflé sweet roll jelly beans oat
            cake donut. Wafer chocolate cake pastry chocolate bar fruitcake.
            Cupcake jelly-o croissant lollipop liquorice.{' '}
            <a href="#">Tart donut</a> lollipop dragée tootsie roll wafer lemon
            drops cupcake chocolate bar.
          </Text.P>
        ))}
      </MockDialog>
    )}
  </ModalStory>
)

const StoryGrid: React.FC<{ cols?: number }> = props => {
  const { cols = 2, ...rest } = props

  return (
    <div
      style={{
        display: 'grid',
        gap: '20px',
        gridTemplateColumns: Array(cols).fill('1fr').join(' '),
        justifyItems: 'left'
      }}
      {...rest}
    />
  )
}
