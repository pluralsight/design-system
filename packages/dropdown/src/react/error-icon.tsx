import { WarningIcon } from '@pluralsight/ps-design-system-icon'
import React from 'react'

import '../css/index.css'

export const ErrorIcon = ({ error }: { error: boolean }) =>
  error ? (
    <div className="psds-dropdown__error">
      <WarningIcon />
    </div>
  ) : null

ErrorIcon.displayName = 'Dropdown.ErrorIcon'
