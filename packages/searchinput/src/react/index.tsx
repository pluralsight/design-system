import React from 'react'

import Button from '@pluralsight/ps-design-system-button'
import CircularProgress from '@pluralsight/ps-design-system-circularprogress'
import { CloseIcon, SearchIcon } from '@pluralsight/ps-design-system-icon'
import TextInput, {
  TextInputProps
} from '@pluralsight/ps-design-system-textinput'
import { RefFor, classNames } from '@pluralsight/ps-design-system-util'

import '../css/index.css'

export interface SearchInputProps extends TextInputProps {
  loading?: boolean
  onClear?: (evt?: React.MouseEvent) => void
  onChange?: (evt: React.ChangeEvent<HTMLInputElement>) => void
}

const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ loading = false, onClear, className, ...rest }, forwardedRef) => {
    const isClearable = typeof onClear === 'function'
    const hasVisibleValue = !!rest.value && String(rest.value).length > 0
    const isClearBtnVisible = isClearable && hasVisibleValue

    const ref = React.useRef<HTMLInputElement | null>(null)
    React.useImperativeHandle(
      forwardedRef,
      () => ref.current as unknown as HTMLInputElement
    )

    const handleClear = (evt: React.MouseEvent) => {
      ref.current?.focus()
      typeof onClear === 'function' && onClear(evt)
    }

    const clearBtn = isClearable && (
      <Button
        onClick={handleClear}
        className={classNames(
          'psds-searchinput-clear',
          isClearBtnVisible && 'psds-searchinput-clear--visible'
        )}
        appearance={Button.appearances.flat}
        icon={<CloseIcon />}
        size={Button.sizes.small}
      />
    )

    const icon = loading ? (
      <CircularProgress
        size={CircularProgress.sizes.small}
        aria-label="searching"
      />
    ) : (
      <SearchIcon />
    )

    return (
      <TextInput
        className={classNames(className, 'psds-searchinput')}
        appearance={TextInput.appearances.subtle}
        fieldAfter={clearBtn}
        icon={icon}
        ref={ref as RefFor<'input'>}
        {...rest}
        type="search"
      />
    )
  }
) as React.ForwardRefExoticComponent<SearchInputProps>

SearchInput.displayName = 'SearchInput'

export default SearchInput
