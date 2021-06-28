import ActionMenu from '@pluralsight/ps-design-system-actionmenu'
import Card from '@pluralsight/ps-design-system-card'
import * as Icon from '@pluralsight/ps-design-system-icon'
import { BelowRight } from '@pluralsight/ps-design-system-position'
import { Meta, Story } from '@storybook/react/types-6-0'
import glamorDefault, * as glamorExports from 'glamor'
import React from 'react'

import Carousel, { Item } from '../index'
import * as vars from '../../vars/index'

const glamor = glamorDefault || glamorExports

export default {
  title: 'Components/Carousel',
  component: Carousel
} as Meta

interface MockCardProps
  extends Omit<
    React.ComponentProps<typeof Card>,
    'title' | 'image' | 'metadata1'
  > {
  titleText?: string
  index?: number
}
const MockCard: React.FC<MockCardProps> = props => {
  const { index, titleText, ...rest } = props
  return (
    <Card
      title={
        <Card.TextLink>
          <a href="#">
            <Card.Title>{titleText || 'Title: ' + index}</Card.Title>
          </a>
        </Card.TextLink>
      }
      actionBar={[
        <Card.Action
          key="bookmark"
          icon={<Icon.BookmarkIcon />}
          title="Bookmark"
        />
      ]}
      image={
        <Card.Image
          src={`//picsum.photos/680/320?image=${
            40 + (index || 0)
          }&gravity=north`}
        />
      }
      metadata1={[
        <Card.TextLink key="text">
          <a href="#">meta</a>
        </Card.TextLink>
      ]}
      {...rest}
    />
  )
}

const MockItem: React.FC<React.HTMLAttributes<HTMLDivElement>> = props => (
  <div
    {...glamor.css({
      alignItems: 'center',
      background: 'pink',
      display: 'flex',
      flexDirection: 'column',
      height: '150px',
      justifyContent: 'center',
      position: 'relative'
    })}
    {...props}
  >
    {' '}
    <button {...glamor.css({ flex: 'none' })}>Button</button>
    <p {...glamor.css({ width: '100%', textAlign: 'center', padding: 10 })}>
      non focusable /tabIndex text
    </p>
    <a href="https://duckduckgo.com/" {...glamor.css({ flex: 'none' })}>
      Link
    </a>
    {props.children}
  </div>
)

const Container: React.FC = props => (
  <div style={{ margin: '64px' }}>{props.children}</div>
)
const Header: React.FC = props => (
  <h2 style={{ paddingTop: '16px' }}>{props.children}</h2>
)

export const ItemsCount: Story = () => {
  return (
    <Container>
      <div>
        <Header>Single</Header>
        <Carousel>
          <Carousel.Item>
            <MockItem>just one item</MockItem>
          </Carousel.Item>
        </Carousel>
      </div>
      <div>
        <Header>Multiple</Header>
        <Carousel>
          <Carousel.Item>
            <MockItem>first item</MockItem>
          </Carousel.Item>
          <Carousel.Item>
            <MockItem>second item</MockItem>
          </Carousel.Item>
        </Carousel>
      </div>
      <div>
        <Header>Many</Header>
        <Carousel>
          {new Array(21).fill(null).map((_, index) => (
            <Carousel.Item key={index}>
              <MockItem />
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </Container>
  )
}

export const ItemsDynamic: Story = () => {
  function DynamicItems() {
    const [count, updateCount] = React.useState(4)

    const add = () => updateCount(count + 1)
    const remove = () => updateCount(count - 1)

    return (
      <Container>
        <Carousel>
          {new Array(count).fill(null).map((_, index) => (
            <Carousel.Item key={index}>
              <MockItem>item: {index + 1}</MockItem>
            </Carousel.Item>
          ))}
        </Carousel>

        <div
          {...glamor.css({
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'center',
            margin: '10px auto'
          })}
        >
          <button disabled={count <= 1} onClick={remove}>
            remove
          </button>

          <button onClick={add}>add</button>
        </div>
      </Container>
    )
  }

  return <DynamicItems />
}

export const ControlsOverride: Story = () => (
  <Container>
    <Carousel
      controlPrev={
        <Carousel.Control
          direction={Carousel.Control.directions.prev}
          style={{ top: '33%', outline: '2px solid red' }}
        />
      }
      controlNext={
        <Carousel.Control
          direction={Carousel.Control.directions.next}
          style={{ top: '33%', outline: '2px solid red' }}
        />
      }
    >
      {new Array(9).fill(null).map((_, index) => (
        <Carousel.Item key={index}>
          <MockItem>item: {index + 1}</MockItem>
        </Carousel.Item>
      ))}
    </Carousel>
  </Container>
)

export const ItemStyleOverride: Story = () => (
  <Container>
    <Carousel>
      {new Array(9).fill(null).map((_, index) => (
        <Carousel.Item key={index} style={{ fontSize: '3rem', color: 'red' }}>
          <MockItem>item: {index + 1}</MockItem>
        </Carousel.Item>
      ))}
    </Carousel>
  </Container>
)

export const Sizes: Story = () => (
  <div>
    {Object.values(vars.sizes).map(size => (
      <Container key={size}>
        <Header>{size}</Header>
        <Carousel size={size}>
          {new Array(9).fill(null).map((_, index) => (
            <Carousel.Item key={index}>
              <MockCard index={index} />
            </Carousel.Item>
          ))}
        </Carousel>
      </Container>
    ))}
  </div>
)

export const ActionMenuInPortal: Story = () => {
  function PortalStory() {
    const [isOpen, setOpen] = React.useState(false)
    return (
      <div style={{ border: '1px solid red', maxWidth: 600, padding: 10 }}>
        <Carousel
          size={Carousel.sizes.medium}
          controlPrev={
            <Carousel.Control
              direction={Carousel.Control.directions.prev}
              onClick={() => setOpen(false)}
            />
          }
          controlNext={
            <Carousel.Control
              direction={Carousel.Control.directions.next}
              onClick={() => setOpen(false)}
            />
          }
        >
          <Carousel.Item key="a">
            <MockCard
              actionBarVisible
              actionBar={[
                <BelowRight
                  inNode={document.body}
                  when={isOpen}
                  show={
                    <ActionMenu>
                      {new Array(8).fill(null).map((_, index) => (
                        <ActionMenu.Item key={index}>
                          item: {index}
                        </ActionMenu.Item>
                      ))}
                    </ActionMenu>
                  }
                  key="a"
                >
                  <Card.Action
                    title="asdf"
                    icon={<Icon.MoreIcon />}
                    onClick={() => setOpen(!isOpen)}
                  />
                </BelowRight>
              ]}
              index={0}
            />
          </Carousel.Item>
          {new Array(3).fill(null).map((_, index) => (
            <Carousel.Item key={index}>
              <MockItem />
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    )
  }
  return <PortalStory />
}

export const CardsInPortalsPerf: Story = () => {
  const MOCK_DATA = { courses: genData(40) }

  function genData(count: number) {
    return new Array(count).fill(null).map((_, i) => ({
      author: 'Some Author',
      id: i + 1,
      image: `//picsum.photos/680/320?image=${40 + i}&gravity=north`,
      level: 'Advanced',
      title: 'Some Title'
    }))
  }

  function PerfPortalStory() {
    const [courseIdForOpenMenu, openCourseMenu] = React.useState(-1)

    function handleClickMore(evt: React.MouseEvent, courseId: number) {
      evt.preventDefault()
      console.log('click more', { courseId })
      if (courseId === courseIdForOpenMenu) {
        openCourseMenu(-1)
      } else {
        openCourseMenu(courseId)
      }
    }

    return (
      <Container>
        <Carousel
          size={Carousel.sizes.medium}
          controlPrev={
            <Carousel.Control
              direction={Carousel.Control.directions.prev}
              onClick={() => openCourseMenu(-1)}
            />
          }
          controlNext={
            <Carousel.Control
              direction={Carousel.Control.directions.next}
              onClick={() => openCourseMenu(-1)}
            />
          }
        >
          {MOCK_DATA.courses.map(course => (
            <Carousel.Item key={course.id}>
              <Card
                image={<Card.Image src={course.image} />}
                metadata1={[course.author, course.level]}
                title={<Card.Title>{course.title}</Card.Title>}
                actionBarVisible
                actionBar={[
                  <BelowRight
                    inNode={
                      typeof document !== 'undefined'
                        ? document.body
                        : undefined
                    }
                    when={course.id === courseIdForOpenMenu}
                    show={
                      <ActionMenu>
                        <ActionMenu.Item key={0}>Useless item</ActionMenu.Item>
                        <ActionMenu.Item key={1}>Useless item</ActionMenu.Item>
                        <ActionMenu.Item key={2}>Useless item</ActionMenu.Item>
                        <ActionMenu.Item key={3}>Useless item</ActionMenu.Item>
                        <ActionMenu.Item key={4}>Useless item</ActionMenu.Item>
                        <ActionMenu.Item key={5}>Useless item</ActionMenu.Item>
                        <ActionMenu.Item key={6}>Useless item</ActionMenu.Item>
                        <ActionMenu.Item key={7}>Useless item</ActionMenu.Item>
                      </ActionMenu>
                    }
                    key="a"
                  >
                    <Card.Action
                      title="See more"
                      icon={<Icon.MoreIcon />}
                      onClick={(evt: React.MouseEvent) =>
                        handleClickMore(evt, course.id)
                      }
                    />
                  </BelowRight>
                ]}
              />
            </Carousel.Item>
          ))}
        </Carousel>
      </Container>
    )
  }
  return <PerfPortalStory />
}

export const ClassNameCarousel: Story = () => (
  <Carousel className="compose-class-name">
    <Carousel.Item>
      <div />
    </Carousel.Item>
  </Carousel>
)

export const ClassNameCarouselControl: Story = () => (
  <Carousel.Control
    direction="next"
    className="compose-class-name"
  ></Carousel.Control>
)
export const ClassNameCarouselItem: Story = () => (
  <Carousel.Item className="compose-class-name">
    <div />
  </Carousel.Item>
)
