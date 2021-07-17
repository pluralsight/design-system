import React from 'react'

import { useDebounceCallback } from '@pluralsight/ps-design-system-util'

export default function useOnWindowResize(handler: (evt: Event) => void) {
  const handleScroll = useDebounceCallback(handler, 10)

  React.useEffect(
    function bindResizeEvent() {
      window.addEventListener('resize', handleScroll)

      return function unbind() {
        window.removeEventListener('resize', handleScroll)
      }
    },
    [handleScroll]
  )
}
