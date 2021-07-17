import {
  colorsWhite,
  colorsTextIcon,
  colorsBlue,
  type,
  motion,
  layout
} from '@pluralsight/ps-design-system-core'
export default {
  '@keyframes psds-calendar__keyframes__forward': {
    from: {
      transform: `translateX(calc(-1 * ${layout.spacingXSmall}))`
    },

    to: {
      transform: 'translateX(0)'
    }
  },
  '@keyframes psds-calendar__keyframes__backward': {
    from: {
      transform: `translateX(${layout.spacingXSmall})`
    },

    to: {
      transform: 'translateX(0)'
    }
  },
  '.psds-calendar': {
    padding: '24px',
    maxHeight: 360,
    backgroundColor: colorsWhite,
    color: colorsTextIcon.highOnLight,
    display: 'inline-flex',
    flexDirection: 'column'
  },
  '.psds-calendar__grid-wrapper': {
    transition: `height ${motion.speedNormal}`
  },
  '.psds-calendar__grid-slide': {
    display: 'flex',
    flex: 1,
    alignItems: 'flex-start'
  },
  '.psds-calendar__grid-slide--forward': (forward: string) => ({
    animation: `${forward || 'psds-calendar__keyframes__forward'} ${
      motion.speedNormal
    } forwards`
  }),
  '.psds-calendar__grid-slide--backward': (backward: string) => ({
    animation: `${backward || 'psds-calendar__keyframes__backward'} ${
      motion.speedNormal
    } forwards`
  }),
  '.psds-calendar__month': {
    display: 'flex',
    padding: '8px',
    alignItems: 'center',
    width: '100%'
  },
  '.psds-calendar__header-wrapper': {
    display: 'flex'
  },
  '.psds-calendar__header': {
    width: 280,
    '&:not(:last-child)': {
      marginRight: layout.spacingLarge
    }
  },
  '.psds-calendar__header-button': {},
  '.psds-calendar__header-month': {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    fontSize: '16px',
    lineHeight: '20px',
    textAlign: 'center'
  },
  '.psds-calendar__weekday-header': {
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: '32px',
    color: colorsTextIcon.lowOnLight,
    fontWeight: type.fontWeightBook
  },
  '.psds-calendar__date-grid': {
    display: 'flex',
    flexWrap: 'wrap',
    zIndex: 1,
    position: 'relative',
    width: 280,
    '&:not(:last-child)': {
      marginRight: layout.spacingLarge
    }
  },
  '.psds-calendar__date': {
    width: 40,
    height: '40px',
    padding: 0,
    boxSizing: 'border-box',
    color: colorsTextIcon.highOnLight,
    fontWeight: 600,
    fontSize: type.fontSizeXSmall,
    lineHeight: '16px',
    textAlign: 'center',
    alignItems: 'center',
    justifyItems: 'center',
    backgroundColor: 'transparent',
    border: 'none',
    [`&:focus`]: {
      borderRadius: '50%',
      border: `2px solid ${colorsBlue[6]}`,
      background: colorsBlue[2],
      color: colorsTextIcon.highOnLight
    },
    [`&:hover`]: {
      borderRadius: '50%',
      border: `2px solid ${colorsBlue[6]}`,
      background: colorsBlue[2],
      color: colorsTextIcon.highOnLight
    },
    [`&:disabled`]: {
      color: colorsTextIcon.lowOnLight,
      textDecoration: 'line-through'
    }
  },
  '.psds-calendar__date--in-range': {
    transition: `background-color ${motion.speedNormal}`,
    background: colorsBlue[2],
    [`&:hover`]: {
      borderRadius: '0',
      border: `none`,
      background: colorsBlue[3],
      color: colorsTextIcon.highOnLight
    }
  },
  '.psds-calendar__date--selected': {
    borderRadius: '50%',
    border: `2px solid ${colorsBlue[6]}`,
    background: colorsBlue[6],
    color: colorsTextIcon.highOnDark,
    position: 'relative',
    [`&:hover`]: {
      color: colorsTextIcon.highOnLight,
      background: colorsBlue[2]
    }
  },
  '.psds-calendar__date--selected-start': {
    position: 'relative',
    '&:after': {
      content: ' ',
      display: 'block',
      position: 'absolute',
      zIndex: -1,
      top: '-2px',
      transform: 'translateX(100%)',
      width: 'calc(1px + 50%)',
      height: '40px',
      background: colorsBlue[2]
    }
  },
  '.psds-calendar__date--selected-end': {
    position: 'relative',
    '&:after': {
      content: ' ',
      display: 'block',
      position: 'absolute',
      top: '-2px',
      zIndex: -1,
      transform: 'translateX(-2px)',
      width: 'calc(2px + 50%)',
      height: '40px',
      background: colorsBlue[2]
    }
  },
  '.psds-calendar__date--today': {},
  '.psds-calendar__filler': {
    width: 40,
    height: '40px'
  }
}
