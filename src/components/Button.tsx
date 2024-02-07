import { ReactNode } from 'react'
import { twJoin } from 'tailwind-merge'

type TextProps = {
   children: ReactNode
   variant: 'outline'
}

const Button = {
   Text: (props: TextProps) => {
      return (
         <button
            className={twJoin(
               'h-10 px-3 text-4 rounded-lg text-white',
               props.variant === 'outline' &&
                  'bg-transparent border border-blue-400 hover:bg-blue-400 hover:border-transparent focus:bg-blue-400 focus:border-transparent'
            )}
         >
            {props.children}
         </button>
      )
   },
}

export default Button
