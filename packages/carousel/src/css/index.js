import core from '@pluralsight/ps-design-system-core'
import { names as themeNames } from '@pluralsight/ps-design-system-theme/vars'

export const resetButton = {
  background: 'transparent',
  border: 'none',
  color: 'inherit',
  font: 'inherit',
  lineHeight: 'normal',
  margin: 0,
  overflow: 'visible',
  padding: 0,
  width: 'auto',

  MozOsxFontSmoothing: 'inherit',
  WebkitAppearance: 'none',
  WebkitFontSmoothing: 'inherit',

  '&::-moz-focus-inner': {
    border: 0,
    padding: 0
  }
}

export default {
  '.psds-carousel': {
    position: 'relative',
    opacity: 0
  },
  '.psds-carousel--ready': { opacity: 1 },

  '.psds-carousel__controls__control': {
    ...resetButton,
    alignItems: 'center',
    borderRadius: '100%',
    boxShadow: '0px 4px 14px rgba(0, 0, 0, 0.25)',
    display: 'flex',
    height: '36px',
    justifyContent: 'center',
    position: 'absolute',
    top: '50%',
    width: '36px',

    '&:hover': { cursor: 'pointer' }
  },
  [`.psds-carousel__controls__control.psds-theme--${themeNames.dark}`]: {
    background: core.colors.gray03,
    color: core.colors.white
  },
  [`.psds-carousel__controls__control.psds-theme--${themeNames.light}`]: {
    background: core.colors.white,
    color: core.colors.gray04
  },
  '.psds-carousel__controls__control--prev': {
    left: 0,
    transform: 'translate(-50%, -50%)'
  },
  '.psds-carousel__controls__control--next': {
    right: 0,
    transform: 'translate(50%, -50%)'
  },

  '.psds-carousel__pages': {
    display: 'flex',
    overflow: 'hidden',
    width: '100%'
  },

  '.psds-carousel__page': {
    alignItems: 'flex-start',
    display: 'flex',
    flex: '1 0 100%',
    margin: `0 calc(${core.layout.spacingSmall}/2)`,
    transition: `transform ${core.motion.speedXSlow} ease-in-out`,

    '&:first-child': { marginLeft: 0 },
    '&:last-child': { marginRight: 0 }
  },

  '.psds-carousel__item': {
    margin: `0 calc(${core.layout.spacingSmall}/2)`,
    flex: 1,

    '&:first-child': { marginLeft: 0 },
    '&:last-child': { marginRight: 0 }
  }
}
