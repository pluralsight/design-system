import { keyMirror } from '@pluralsight/ps-design-system-util'

export const appearances = keyMirror('basic', 'accent')

export const tailPositions = {
  bottomCenter: 'bottom-center',
  bottomLeft: 'bottom-left',
  bottomRight: 'bottom-right',
  leftCenter: 'left-center',
  rightCenter: 'right-center',
  topCenter: 'top-center',
  topLeft: 'top-left',
  topRight: 'top-right'
} as const
