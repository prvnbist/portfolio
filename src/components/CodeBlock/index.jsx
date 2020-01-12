import React from 'react'
import Highlight, { defaultProps } from 'prism-react-renderer'
import theme from 'prism-react-renderer/themes/dracula'

export default ({ children, className }) => {
   const matches = className.match(/language-(?<lang>.*)/)
   return (
      <Highlight
         {...defaultProps}
         theme={theme}
         code={children.trim()}
         language={
            matches && matches.groups && matches.groups.lang
               ? matches.groups.lang
               : ''
         }>
         {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre
               className={className || ''}
               style={{ ...style, padding: '20px' }}>
               {tokens.map((line, i) => (
                  <div key={i} {...getLineProps({ line, key: i })}>
                     {line.map((token, key) => (
                        <span key={key} {...getTokenProps({ token, key })} />
                     ))}
                  </div>
               ))}
            </pre>
         )}
      </Highlight>
   )
}
