import React from 'react'
import type { Calendar } from 'dayzed'
interface DateContextInterface extends Calendar {
  'aria-labelledby': string
  dayKeyHandlers: (
    date: Date,
    dateObj: {
      [x: string]: any
    }
  ) => React.KeyboardEventHandler<HTMLButtonElement>
}
const initialValue = {}
export const DateContext = React.createContext<DateContextInterface>(
  // @ts-ignore: really hate this part of context and typescript
  initialValue
)
