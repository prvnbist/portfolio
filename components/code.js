import tw from 'twin.macro'
import Highlight, { defaultProps } from 'prism-react-renderer'

import theme from 'prism-react-renderer/themes/nightOwl'

const RE = /{([\d,-]+)}/

const calculateLinesToHighlight = meta => {
   if (!RE.test(meta)) {
      return () => false
   } else {
      const lineNumbers = RE.exec(meta)[1]
         .split(',')
         .map(v => v.split('-').map(v => parseInt(v, 10)))
      return index => {
         const lineNumber = index + 1
         const inRange = lineNumbers.some(([start, end]) =>
            end
               ? lineNumber >= start && lineNumber <= end
               : lineNumber === start
         )
         return inRange
      }
   }
}

export const CodeBlock = ({ children, className = '', metastring }) => {
   const matches = className.match(/language-(?<lang>.*)/)
   const shouldHighlightLine = calculateLinesToHighlight(metastring)

   return (
      <Highlight
         {...defaultProps}
         theme={theme}
         code={children.trim()}
         language={
            matches && matches.groups && matches.groups.lang
               ? matches.groups.lang
               : ''
         }
      >
         {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre
               className={`${className || ''}`}
               tw="mb-4 rounded overflow-auto text-left"
               style={{
                  ...style,
                  fontSize: '18px',
                  maxHeight: '480px',
                  padding: '20px',
               }}
            >
               {tokens.map((line, i) => {
                  let lineNumberElem
                  if (
                     line.length === 1 &&
                     line[0].empty === true &&
                     i === tokens.length - 1
                  ) {
                     lineNumberElem = null
                  } else {
                     lineNumberElem = (
                        <span
                           style={{
                              display: 'table-cell',
                              userSelect: 'none',
                              opacity: '0.3',
                              paddingRight: '16px',
                              textAlign: 'right',
                           }}
                        >
                           {i + 1}
                        </span>
                     )
                  }

                  const lineProps = getLineProps({ line, key: i })
                  if (shouldHighlightLine(i)) {
                     lineProps.className = `${lineProps.className} highlight__line`
                  }

                  return (
                     <div tw="table-row" key={i} {...lineProps}>
                        {lineNumberElem}
                        <span tw="table-cell">
                           {line.map((token, key) => (
                              <span
                                 key={key}
                                 {...getTokenProps({ token, key })}
                              />
                           ))}
                        </span>
                     </div>
                  )
               })}
            </pre>
         )}
      </Highlight>
   )
}
