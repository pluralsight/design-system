import { DecoratorFn } from '@storybook/react'
import { Meta, Story } from '@storybook/react/types-6-0'
import glamorDefault, * as glamorExports from 'glamor'
import React from 'react'

import { ADMIN_TOOLS_NAV, DESIGN_SYSTEM_NAV, FLOW_NAV } from './fixtures'

import VerticalTabs from '../index'

const glamor = glamorDefault || glamorExports
const { CollapsibleGroup, Divider, Group, Tier1, Tier2 } = VerticalTabs

const FlexDecorator: DecoratorFn = storyFn => (
  <div
    {...glamor.css({
      display: 'flex',
      height: '100%',
      justifyContent: 'start',
      width: '100%'
    })}
  >
    {storyFn()}
  </div>
)

export default {
  title: 'Components/VerticalTabs/Examples',
  component: VerticalTabs,
  decorators: [FlexDecorator]
} as Meta

export const AdminTools: Story<React.ComponentProps<typeof VerticalTabs>> =
  args => {
    const [open, setOpen] = React.useState(false)
    const [activeId, setActiveId] = React.useState('admins')
    const isActive = (id: string) => activeId === id

    const activate = (evt: React.MouseEvent, id: string) => {
      evt.preventDefault()
      setActiveId(id)
    }

    return (
      <div
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        style={{ width: open ? 240 : 72 }}
      >
        <VerticalTabs {...args} hideLabels={!open}>
          <Group>
            {ADMIN_TOOLS_NAV.map((section, sectionKey) => {
              const sectionHeader = section.header && (
                <Tier1.Header
                  href={section.header.href}
                  icon={section.header.icon}
                >
                  {section.header.title}
                </Tier1.Header>
              )

              return (
                <VerticalTabs.Tier1
                  collapsible={section.collapsible}
                  key={sectionKey}
                  header={sectionHeader}
                >
                  {section.items.map((item, itemKey) => {
                    const active = isActive(item.id)
                    const itemHeader = (
                      <Tier2.Header
                        href={item.href}
                        onClick={(evt: React.MouseEvent) =>
                          activate(evt, item.id)
                        }
                      >
                        {item.title}
                      </Tier2.Header>
                    )

                    return (
                      <Tier2
                        active={active}
                        header={itemHeader}
                        key={itemKey}
                      />
                    )
                  })}
                </VerticalTabs.Tier1>
              )
            })}
          </Group>
        </VerticalTabs>
      </div>
    )
  }
AdminTools.args = {}

export const DesignSystem: Story<React.ComponentProps<typeof VerticalTabs>> =
  args => {
    const [activeId, setActiveId] = React.useState('avatar-prop-types')
    const isActive = (id: string) => activeId === id

    const activate = (evt: React.MouseEvent, id: string) => {
      evt.preventDefault()
      setActiveId(id)
    }
    return (
      <div style={{ width: 240 }}>
        <VerticalTabs {...args}>
          {DESIGN_SYSTEM_NAV.map((group, groupKey) => {
            const GroupComp = group.collapsible ? CollapsibleGroup : Group
            const groupHeader = group.header && (
              <GroupComp.Header>{group.header.title}</GroupComp.Header>
            )

            return (
              <React.Fragment key={groupKey}>
                <GroupComp header={groupHeader} startOpen>
                  {(group.sections || []).map((section, sectionKey) => {
                    const sectionHeader = section.header && (
                      <Tier1.Header
                        href={section.header.href}
                        icon={section.header.icon}
                        onClick={(evt: React.MouseEvent) =>
                          activate(evt, section.id)
                        }
                      >
                        {section.header.title}
                      </Tier1.Header>
                    )

                    return (
                      <Tier1
                        active={isActive(section.id)}
                        collapsible={section.collapsible}
                        key={sectionKey}
                        header={sectionHeader}
                      >
                        {
                          // @ts-ignore: story
                          (section.items || []).map((item, itemKey) => {
                            const itemHeader = (
                              <Tier2.Header
                                href={item.href}
                                onClick={(evt: React.MouseEvent) =>
                                  activate(evt, item.id)
                                }
                              >
                                {item.title}
                              </Tier2.Header>
                            )

                            return (
                              <Tier2
                                active={isActive(item.id)}
                                header={itemHeader}
                                key={itemKey}
                              />
                            )
                          })
                        }
                      </Tier1>
                    )
                  })}
                </GroupComp>
                <Divider />
              </React.Fragment>
            )
          })}
        </VerticalTabs>
      </div>
    )
  }
DesignSystem.args = {}

export const Flow: Story<React.ComponentProps<typeof VerticalTabs>> = args => {
  const [open, setOpen] = React.useState(false)
  const [activeId, setActiveId] = React.useState('pr-resolution')
  const isActive = (id: string) => activeId === id

  const activate = (evt: React.MouseEvent, id: string) => {
    evt.preventDefault()
    setActiveId(id)
  }

  return (
    <div
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      style={{ width: open ? 240 : 72 }}
    >
      <VerticalTabs {...args} forceCollapsed={!open} hideLabels={!open}>
        <Group>
          {FLOW_NAV.map((section, sectionKey) => {
            const sectionHeader = section.header && (
              <Tier1.Header icon={section.header.icon}>
                {section.header.title}
              </Tier1.Header>
            )

            return (
              <Tier1
                collapsible={section.collapsible}
                key={sectionKey}
                header={sectionHeader}
              >
                {section.items.map((item, itemKey) => {
                  const active = isActive(item.id)
                  const itemHeader = (
                    <Tier2.Header
                      href={item.href}
                      onClick={(evt: React.MouseEvent) =>
                        activate(evt, item.id)
                      }
                    >
                      {item.title}
                    </Tier2.Header>
                  )

                  return (
                    <Tier2 active={active} header={itemHeader} key={itemKey} />
                  )
                })}
              </Tier1>
            )
          })}
        </Group>
      </VerticalTabs>
    </div>
  )
}
Flow.args = {}
