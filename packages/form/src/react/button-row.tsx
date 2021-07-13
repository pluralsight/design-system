import { ValueOf, classNames } from '@pluralsight/ps-design-system-util'
import React from 'react'

import '../css/index.css'
import * as vars from '../vars/index'

export interface ButtonRowStatics {
  aligns: typeof vars.aligns
}
export interface ButtonRowProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: ValueOf<typeof vars.aligns>
}

const ButtonRow: React.FC<ButtonRowProps> & ButtonRowStatics = ({
  align = vars.aligns.left,
  children,
  className,
  ...rest
}) => (
  <div
    {...rest}
    className={classNames(
      'psds-form-button-row',
      `psds-form-button-row--align-${align}`,
      className
    )}
  >
    {React.Children.map(children, button => (
      <div className="psds-form-button-row__button">{button}</div>
    ))}
  </div>
)
ButtonRow.displayName = 'ButtonRow'

ButtonRow.aligns = vars.aligns

export const aligns = vars.aligns

export default ButtonRow
