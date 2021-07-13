import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'

import Avatar from '../index'

const defaultArgs = {
  alt: 'Jake Trent',
  size: Avatar.sizes.medium,
  name: 'Jake Trent'
}

export default {
  title: 'Components/Avatar',
  component: Avatar
} as Meta

const Template: Story<React.ComponentProps<typeof Avatar>> = args => (
  <Avatar {...args} />
)

export const Basic = Template.bind({})
Basic.args = { ...defaultArgs }

export const NameEmpty = Template.bind({})
NameEmpty.args = { ...defaultArgs, name: '' }

export const NameUndefined = Template.bind({})
NameUndefined.args = { ...defaultArgs, name: undefined }

export const NameSingleChar = Template.bind({})
NameSingleChar.args = { ...defaultArgs, name: 'x' }

export const NameSpecialChar = Template.bind({})
NameSpecialChar.args = { ...defaultArgs, name: '% Special Char' }

export const VariousNames: Story = () => {
  const names = [
    'Anakin Skywalker',
    'Budapest Skywalker',
    'Carlos Organa',
    'Dennis Pimenta',
    'Peia Organa',
    'Obi-Wan Kenobi',
    'Uy Marley',
    'Harry Potter',
    'Diz Blau',
    'Single'
  ]

  return (
    <div>
      {names.map((name, index) => (
        <Avatar name={name} key={index} />
      ))}
    </div>
  )
}

export const ImageError = Template.bind({})
ImageError.args = {
  ...defaultArgs,
  name: 'Bill Dill',
  src: 'https://jaketrent.com/fake.jpg'
}

export const GravatarInvalid = Template.bind({})
GravatarInvalid.args = {
  ...defaultArgs,
  src: 'https://secure.gravatar.com/avatar/invalidhash?d=tmp'
}

export const ImageValid = Template.bind({})
ImageValid.args = {
  ...defaultArgs,
  src: 'https://en.gravatar.com/userimage/8399312/b15448d840afacd0eb18102baf788255.jpeg'
}

export const ImageTallAndThin = Template.bind({})
ImageTallAndThin.args = {
  ...defaultArgs,
  src: 'https://akns-images.eonline.com/eol_images/Entire_Site/2010330/293.WillFerrell.tg.043010.jpg'
}

export const ImageFlatAndLong = Template.bind({})
ImageFlatAndLong.args = {
  ...defaultArgs,
  src: 'https://cdn1.thr.com/sites/default/files/2019/03/chrisrocknaacp.jpg'
}

export const ImageSquare = Template.bind({})
ImageSquare.args = {
  ...defaultArgs,
  src: 'https://gravatar.com/avatar/63a1fa126f541c0f0ecf1d74f7a40640?s=320&r=g'
}

export const Sizes: Story = () => (
  <>
    {Object.values(Avatar.sizes).map((size, i) => (
      <Avatar key={i} size={size} />
    ))}
  </>
)

export const StyleOverride = Template.bind({})
StyleOverride.args = { ...defaultArgs, style: { border: '3px solid red' } }
