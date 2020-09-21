import Theme, { useTheme } from '@pluralsight/ps-design-system-theme'

import cx from 'classnames'
import Highlight, { defaultProps } from 'prism-react-renderer'
import React, { HTMLAttributes, useContext } from 'react'

import { CodeBlockContext } from './index'
import styles from './styles.module.css'
import { darkTheme, lightTheme } from './theme'

interface EditorProps extends HTMLAttributes<HTMLPreElement> {
  children: string
  expanded: boolean
}
export const Editor: React.FC<EditorProps> = props => {
  const context = useContext(CodeBlockContext)
  const themeName = useTheme()
  const isDarkTheme = themeName === Theme.names.dark
  const codeTheme = isDarkTheme ? darkTheme : lightTheme

  return (
    <Highlight
      {...defaultProps}
      code={props.children}
      language={context.language}
      themeName={codeTheme}
    >
      {highlight => {
        const { tokens, getLineProps, getTokenProps } = highlight

        const className = cx({
          [highlight.className]: true,
          [styles.editor]: true,
          [styles.editorExpanded]: props.expanded
        })

        return (
          <pre className={className}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
            {!props.expanded && <div className={styles.editorFade} />}
          </pre>
        )
      }}
    </Highlight>
  )
}
