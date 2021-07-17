/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'

export type SideEffectFn = (...args: any[]) => void

export function debounce<F extends SideEffectFn>(delay: number, fn: F): F {
  let timerId: ReturnType<typeof setTimeout> | undefined

  return function (this: any, ...args: any[]) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const context = this

    const doLater = function () {
      timerId = undefined

      fn.apply(context, args)
    }

    if (timerId !== undefined) clearTimeout(timerId)

    timerId = setTimeout(doLater, delay)
  } as F
}

export const useDebounceCallback = (
  fn: (...args: any[]) => void,
  delay = 100
) => {
  const timeout = React.useRef<NodeJS.Timeout>()

  const debounced = React.useCallback(
    function callFunctionOnDelay(this: void, ...args: any[]) {
      const later = () => {
        timeout.current = undefined
        fn.apply(this, args)
      }

      if (typeof timeout.current !== 'undefined') clearTimeout(timeout.current)
      timeout.current = setTimeout(later, delay)
    },
    [fn, delay]
  )

  React.useEffect(
    () => () => {
      if (!timeout.current) return
      clearTimeout(timeout.current)
      timeout.current = undefined
    },
    [fn, delay]
  )

  return debounced
}
