import { ReactElement } from 'react'
import { twJoin } from 'tailwind-merge'
import { Highlight, themes } from 'prism-react-renderer'

const calculateLinesToHighlight = (lineNumbers?: [number, number]) => {
   if (!lineNumbers) return () => false

   const [start, end] = lineNumbers
   return (index: number) => {
      const lineNumber = index + 1
      const inRange = end
         ? lineNumber >= start && lineNumber <= end
         : lineNumber === start
      return inRange
   }
}

type CodeBlockProps = {
   children: ReactElement
   highlight?: [number, number]
}

const CodeBlock = ({ children, ...props }: CodeBlockProps) => {
   const {
      props: { className, children: code = '' },
   } = children
   const language = className ? className.replace(/language-/, '') : ''

   const shouldHighlightLine = calculateLinesToHighlight(props.highlight)

   return (
      <Highlight theme={themes.nightOwl} code={code.trim()} language={language}>
         {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre
               style={{ ...style }}
               className={twJoin(
                  className,
                  'text-[14px] p-5 max-h-[400px] mb-4 rounded overflow-auto text-left'
               )}
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
                        <span className="opacity-[0.3] table-cell pr-4 text-right select-none">
                           {i + 1}
                        </span>
                     )
                  }

                  const lineProps = getLineProps({
                     line,
                  })
                  if (shouldHighlightLine(i)) {
                     lineProps.className = `${lineProps.className} highlight__line`
                  }

                  return (
                     <div
                        key={i}
                        {...lineProps}
                        className={twJoin(lineProps.className, 'table-row')}
                     >
                        {lineNumberElem}
                        <span className="table-cell">
                           {line.map((token, key) => (
                              <span key={key} {...getTokenProps({ token })} />
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

export default CodeBlock
